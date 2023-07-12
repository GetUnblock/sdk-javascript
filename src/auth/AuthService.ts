import { AxiosResponse } from 'axios';
import { SiweMessage, generateNonce } from 'siwe';
import { BaseService } from '../BaseService';
import { ErrorHandler, SiweSigningError } from '../ErrorHandler';
import { AuthenticationMethod } from '../enums/AuthenticationMethod';
import {
  EmailLoginRequest,
  GenerateSiweLoginMessageRequest,
  GenerateSiweLoginMessageResponse,
  LoginRequest,
  LoginResponse,
  SessionRequest,
  SessionResponse,
  SiweLoginRequest,
  SiweLoginResponse,
  WalletSiweLoginRequest,
  WalletSiweLoginResponse,
} from './definitions';

export interface IAuthService {
  generateSiweLoginMessage(
    params: GenerateSiweLoginMessageRequest,
  ): Promise<GenerateSiweLoginMessageResponse>;
  walletSiweLogin(params: WalletSiweLoginRequest): Promise<WalletSiweLoginResponse>;
  createSiweMessage(address: string, statement: string, domain: string, chainId: number): string;
  login(data: LoginRequest): Promise<LoginResponse>;
  emailSession(data: SessionRequest): Promise<SessionResponse>;
}

export class AuthService extends BaseService implements IAuthService {
  async generateSiweLoginMessage(
    params: GenerateSiweLoginMessageRequest,
  ): Promise<GenerateSiweLoginMessageResponse> {
    try {
      const { providerSigner, signingUrl, chainId } = params;

      const walletAddress = await providerSigner.getAddress();
      const message = this.createSiweMessage(
        walletAddress,
        'Sign in with Ethereum',
        signingUrl,
        Number(chainId),
      );

      // request signMessage on Metamask
      const signature = await providerSigner.signMessage(message);

      return {
        message,
        signature,
      };
    } catch (e) {
      ErrorHandler.handle(new SiweSigningError(e as Error));
    }
  }

  async walletSiweLogin(params: WalletSiweLoginRequest): Promise<WalletSiweLoginResponse> {
    const signedMessage = await this.generateSiweLoginMessage(params);
    const loginResult = await this.authenticateSiwe({
      ...signedMessage,
      authenticationMethod: AuthenticationMethod.SIWE,
    });

    return {
      userUuid: loginResult.userUuid,
      unblockSessionId: (loginResult as SiweLoginResponse).unblockSessionId,
    };
  }

  login(credentials: LoginRequest): Promise<LoginResponse> {
    switch (credentials.authenticationMethod) {
      case AuthenticationMethod.SIWE:
        return this.authenticateSiwe(credentials);
      case AuthenticationMethod.EMAIL:
        return this.authenticateEmail(credentials);
    }
  }

  async emailSession(credentials: SessionRequest): Promise<SessionResponse> {
    const { userUuid, code } = credentials;
    const { apiKey } = this.props;

    const path = '/auth/login/session';
    const params = {
      user_uuid: userUuid,
      code: code,
    };

    const config = {
      params: params,
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };
    try {
      const response: AxiosResponse<{ session_id: string }> = await this.axiosClient.get(
        path,
        config,
      );

      return {
        sessionId: response.data.session_id,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  private async authenticateSiwe(credentials: SiweLoginRequest): Promise<LoginResponse> {
    const { message, signature } = credentials;
    const { apiKey } = this.props;

    const path = '/auth/login';
    const body = {
      message: message,
      signature: signature,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<{
        user_uuid: string;
        unblock_session_id: string;
      }> = await this.axiosClient.post(path, body, config);

      return {
        authenticationMethod: AuthenticationMethod.SIWE,
        userUuid: response.data.user_uuid,
        unblockSessionId: response.data.unblock_session_id,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  private async authenticateEmail(credentials: EmailLoginRequest): Promise<LoginResponse> {
    const { userUuid } = credentials;
    const { apiKey } = this.props;

    const path = '/auth/login';
    const body = {
      user_uuid: userUuid,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<{
        user_uuid: string;
        message: string;
      }> = await this.axiosClient.post(path, body, config);

      return {
        authenticationMethod: AuthenticationMethod.EMAIL,
        message: response.data.message,
        userUuid: response.data.user_uuid,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  createSiweMessage(address: string, statement: string, domain: string, chainId: number): string {
    const domainUrl = new URL(domain);
    const SESSION_DURATION_MS = 1000 * 60 * 60 * 4;
    const expirationDate = new Date(Date.now() + SESSION_DURATION_MS);
    const message = new SiweMessage({
      domain: domainUrl.hostname,
      address: address,
      statement: statement,
      uri: `${domain}/auth/login`,
      version: '1',
      chainId: chainId,
      nonce: generateNonce(),
      expirationTime: expirationDate.toISOString(),
    });
    return message.prepareMessage();
  }
}
