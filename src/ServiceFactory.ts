import { AuthService, IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';
import {
  IRemoteBankAccount,
  RemoteBankAccountService,
} from './remote-bank-account/RemoteBankAccountService';

export interface IServiceFactory {
  createAuthService(): IAuthService;
  createRemoteBankAccountService(): IRemoteBankAccount;
}

export class ServiceFactory implements IServiceFactory {
  constructor(private props: SdkSettings) {}
  createRemoteBankAccountService(): IRemoteBankAccount {
    return new RemoteBankAccountService(this.props);
  }
  createAuthService(): IAuthService {
    return new AuthService(this.props);
  }
}
