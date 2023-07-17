import { AxiosResponse } from 'axios';
import { SiweMessage, generateNonce } from 'siwe';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import { UserSessionData } from '../definitions';
import { SiweSigningError, UserUuidNotSetError } from '../errors';
import {
  AuthenticateWithEmailRequest,
  AuthenticateWithEmailResponse,
  AuthenticateWithSiweRequest,
  CreateSiweMessageRequest,
  GenerateSiweSiginedMessageResponse,
  GenerateSiweSignedMessageRequest,
  SetUnblockSessionByEmailCodeRequest,
  SiweLoginRequest,
} from './definitions';

export interface IAuthService {
  generateSiweSignedMessage(
    params: GenerateSiweSignedMessageRequest,
  ): Promise<GenerateSiweSiginedMessageResponse>;
  siweLogin(params: SiweLoginRequest): Promise<void>;
  createSiweMessage(params: CreateSiweMessageRequest): string;
  authenticateWithSiwe(params: AuthenticateWithSiweRequest): Promise<void>;
  authenticateWithEmail(
    params: AuthenticateWithEmailRequest,
  ): Promise<AuthenticateWithEmailResponse>;
  setUnblockSessionByEmailCode(params: SetUnblockSessionByEmailCodeRequest): Promise<void>;
}

export class AuthService extends BaseService implements IAuthService {
  async generateSiweSignedMessage(
    params: GenerateSiweSignedMessageRequest,
  ): Promise<GenerateSiweSiginedMessageResponse> {
    try {
      const { providerSigner, signingUrl, chainId } = params;

      const walletAddress = await providerSigner.getAddress();
      const message = this.createSiweMessage({
        walletAddress,
        statement: 'Sign in with Ethereum',
        signingUrl,
        chainId: Number(chainId),
      });

      // request signMessage on the given providerSigner
      const signature = await providerSigner.signMessage(message);

      return {
        message,
        signature,
      };
    } catch (e) {
      ErrorHandler.handle(new SiweSigningError(e as Error));
    }
  }

  async siweLogin(params: SiweLoginRequest): Promise<void> {
    const signedMessage = await this.generateSiweSignedMessage(params);
    await this.authenticateWithSiwe({
      ...signedMessage,
    });
  }

  async setUnblockSessionByEmailCode(
    requestParams: SetUnblockSessionByEmailCodeRequest,
  ): Promise<void> {
    try {
      if (!this.props.userSessionData?.userUuid) {
        throw new UserUuidNotSetError('Have you initiated the email authentication first?');
      }
      const { emailCode: code } = requestParams;
      const { apiKey } = this.props;

      const path = '/auth/login/session';
      const params = {
        user_uuid: this.props.userSessionData.userUuid,
        code: code,
      };

      const config = {
        params,
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
        },
      };
      const response: AxiosResponse<{ session_id: string }> = await this.axiosClient.get(
        path,
        config,
      );

      this.props.userSessionData.unblockSessionId = response.data.session_id;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async authenticateWithSiwe(params: AuthenticateWithSiweRequest): Promise<void> {
    const { message, signature } = params;
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

      this.props.setUserSessionData({
        unblockSessionId: response.data.unblock_session_id,
        userUuid: response.data.user_uuid,
      });
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async authenticateWithEmail(
    params: AuthenticateWithEmailRequest,
  ): Promise<AuthenticateWithEmailResponse> {
    const { userUuid } = params;
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

      this.props.setUserSessionData({ userUuid: response.data.user_uuid } as UserSessionData);

      return {
        message: response.data.message,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  createSiweMessage(params: CreateSiweMessageRequest): string {
    const domainUrl = new URL(params.signingUrl);
    const SESSION_DURATION_MS = 1000 * 60 * 60 * 4;
    const expirationDate = new Date(Date.now() + SESSION_DURATION_MS);
    const message = new SiweMessage({
      domain: domainUrl.hostname,
      address: params.walletAddress,
      statement: params.statement,
      uri: `${params.signingUrl}/auth/login`,
      version: '1',
      chainId: params.chainId,
      nonce: generateNonce(),
      expirationTime: expirationDate.toISOString(),
    });
    return message.prepareMessage();
  }
}
