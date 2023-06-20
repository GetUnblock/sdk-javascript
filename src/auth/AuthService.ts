import { SdkSettings } from '../definitions';
import {
  AuthenticationMethod,
  EmailLoginRequest,
  LoginRequest,
  LoginResponse,
  SessionRequest,
  SessionResponse,
  SiweLoginRequest,
} from './definitions';

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export interface IAuthService {
  login(data: LoginRequest): Promise<LoginResponse>;
  emailSession(data: SessionRequest): Promise<SessionResponse>;
}

export class AuthService implements IAuthService {
  private readonly axiosClient: AxiosInstance;
  constructor(private props: SdkSettings) {
    this.axiosClient = axios.create({
      baseURL: this.props.prod ? this.props.prodUrl : this.props.sandBoxUrl,
      timeout: this.props.timeoutMs,
    });
  }

  login(credentials: LoginRequest): Promise<LoginResponse> {
    switch (credentials.authenticationMethod) {
      case AuthenticationMethod.SIWE:
        return this.authenticateSiwe(credentials);
      case AuthenticationMethod.EMAIL:
        return this.authenticateEmail(credentials);
        break;
    }
  }

  async emailSession(credentials: SessionRequest): Promise<SessionResponse> {
    const { userUuid, code } = credentials;
    const { apiKey } = this.props;

    const path = '/auth/login/session';
    const params = {
      userUuid: userUuid,
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
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        throw new Error(`Api error': ${axiosError.response?.status} ${axiosError.response?.data}`);
      } else {
        throw new Error(`Unexpected error': ${error}`);
      }
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

    const response: AxiosResponse<{
      user_uuid: string;
      unblock_session_id: string;
    }> = await this.axiosClient.post(path, body, config);

    return {
      authenticationMethod: AuthenticationMethod.SIWE,
      userUuid: response.data.user_uuid,
      unblockSessionId: response.data.unblock_session_id,
    };
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

    const response: AxiosResponse<{
      user_uuid: string;
      message: string;
    }> = await this.axiosClient.post(path, body, config);
    return {
      authenticationMethod: AuthenticationMethod.EMAIL,
      message: response.data.message,
      userUuid: response.data.user_uuid,
    };
  }
}
