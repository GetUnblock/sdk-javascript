import { IServiceFactory } from './ServiceFactory';
import { IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';
import { IRemoteBankAccount } from './remote-bank-account/RemoteBankAccountService';

export class SDK {
  private authService: IAuthService;
  private remoteBankAccountService: IRemoteBankAccount;

  constructor(private ServiceFactory: IServiceFactory, private props: SdkSettings) {
    // this.healthCheck();
    this.authService = this.ServiceFactory.createAuthService();
    this.remoteBankAccountService = this.ServiceFactory.createRemoteBankAccountService();
  }

  private async healthCheck(): Promise<boolean> {
    // This is going to be an API call to check that the properties are properly setup
    throw new Error('Method not implemented.');
  }

  get auth(): IAuthService {
    return this.authService;
  }

  get remoteBankAccount(): IRemoteBankAccount {
    return this.remoteBankAccountService;
  }
}
