import { SdkSettings } from '../definitions';
import {
  AuthenticationMethod,
  EmailLoginRequest,
  EmailLoginResponse,
  LoginRequest,
  LoginResponse,
  SessionRequest,
  SessionResponse,
  SiweLoginRequest,
  SiweLoginResponse,
} from './definitions';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
        this.authenticateSiwe(credentials);
        break;
      case AuthenticationMethod.EMAIL:
        this.authenticateEmail(credentials);
        break;
    }
    throw new Error('Method not implemented.');
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

    const response: AxiosResponse<SessionResponse> = await this.axiosClient.get(path, config);

    return response.data;
  }

  private async authenticateSiwe(credentials: SiweLoginRequest): Promise<SiweLoginResponse> {
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

    const response: AxiosResponse<SiweLoginResponse> = await this.axiosClient.post(
      path,
      body,
      config,
    );

    return response.data;
  }

  private async authenticateEmail(credentials: EmailLoginRequest): Promise<EmailLoginResponse> {
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

    const response: AxiosResponse<EmailLoginResponse> = await this.axiosClient.post(
      path,
      body,
      config,
    );

    return response.data;
  }
}
