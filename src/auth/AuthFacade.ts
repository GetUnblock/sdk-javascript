import { SdkSettings } from '../definitions';
import { EmailLoginRequest, LoginRequest, LoginResponse, SiweLoginRequest } from './definitions';

export interface IAuthFacade {
  login(data: LoginRequest): Promise<LoginResponse>;
}

export class AuthFacade implements IAuthFacade {
  constructor(private props: SdkSettings) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(credentials: LoginRequest): Promise<LoginResponse> {
    // switch (credentials.authenticationMethod) {
    //   case AuthenticationMethod.SIWE:
    //     this.authenticateSiwe(credentials);
    //   case AuthenticationMethod.EMAIL:
    //     this.authenticateEmail(credentials);
    // }
    throw new Error('Method not implemented.');
  }
  // session(credentials: SessionRequest): Promise<LoginResponse> {
  //   throw credentials;
  // }

  private authenticateSiwe(credentials: SiweLoginRequest) {
    return credentials;
  }

  private authenticateEmail(credentials: EmailLoginRequest) {
    return credentials;
  }
}
