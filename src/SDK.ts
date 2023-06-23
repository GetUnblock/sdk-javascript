import { IServiceFactory } from './ServiceFactory';
import { IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';
import { IKycService } from './kyc/KycService';
import { IRemoteBankAccount } from './remote-bank-account/RemoteBankAccountService';
import { IUserService } from './user/UserService';

export class SDK {
  private authService: IAuthService;
  private remoteBankAccountService: IRemoteBankAccount;
  private kycService: IKycService;
  private userService: IUserService;

  constructor(private ServiceFactory: IServiceFactory, private props: SdkSettings) {
    // this.healthCheck();
    this.authService = this.ServiceFactory.createAuthService();
    this.remoteBankAccountService = this.ServiceFactory.createRemoteBankAccountService();
    this.kycService = this.ServiceFactory.createKycService();
    this.userService = this.ServiceFactory.createUserService();
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

  get kyc(): IKycService {
    return this.kycService;
  }

  get user(): IUserService {
    return this.userService;
  }
}
