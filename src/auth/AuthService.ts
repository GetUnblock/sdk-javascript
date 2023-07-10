import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import {
  AuthenticationMethod,
  EmailLoginRequest,
  LoginRequest,
  LoginResponse,
  SessionRequest,
  SessionResponse,
  SiweLoginRequest,
} from './definitions';

import { AxiosResponse } from 'axios';

export interface IAuthService {
  login(data: LoginRequest): Promise<LoginResponse>;
  emailSession(data: SessionRequest): Promise<SessionResponse>;
}

export class AuthService extends BaseService implements IAuthService {
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
}
