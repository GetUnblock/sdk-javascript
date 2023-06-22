import { AuthService, IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';
import { IKycService, KycService } from './kyc/KycService';
import {
  IRemoteBankAccount,
  RemoteBankAccountService,
} from './remote-bank-account/RemoteBankAccountService';
export interface IServiceFactory {
  createAuthService(): IAuthService;
  createRemoteBankAccountService(): IRemoteBankAccount;
  createKycService(): IKycService;
}

export class ServiceFactory implements IServiceFactory {
  constructor(private props: SdkSettings) {}
  createRemoteBankAccountService(): IRemoteBankAccount {
    return new RemoteBankAccountService(this.props);
  }
  createKycService(): IKycService {
    return new KycService(this.props);
  }
  createAuthService(): IAuthService {
    return new AuthService(this.props);
  }
}
