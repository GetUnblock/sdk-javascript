import { AuthService, IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';

export interface IServiceFactory {
  createAuthService(): IAuthService;
}

export class ServiceFactory implements IServiceFactory {
  constructor(private props: SdkSettings) {}
  createAuthService(): IAuthService {
    return new AuthService(this.props);
  }
}
