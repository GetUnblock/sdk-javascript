import { AuthService, IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';
import { ExchangeRatesService, IExchangeRatesService } from './exchange-rates/ExchangeRatesService';
import { IKycService, KycService } from './kyc/KycService';

import {
  IRemoteBankAccount,
  RemoteBankAccountService,
} from './remote-bank-account/RemoteBankAccountService';
import { IUserService, UserService } from './user/UserService';
export interface IServiceFactory {
  createAuthService(): IAuthService;
  createRemoteBankAccountService(): IRemoteBankAccount;
  createKycService(): IKycService;
  createUserService(): IUserService;
  createExchangeRatesService(): IExchangeRatesService;
}

export class ServiceFactory implements IServiceFactory {
  constructor(private props: SdkSettings) {}

  createExchangeRatesService(): IExchangeRatesService {
    return new ExchangeRatesService(this.props);
  }

  createRemoteBankAccountService(): IRemoteBankAccount {
    return new RemoteBankAccountService(this.props);
  }

  createKycService(): IKycService {
    return new KycService(this.props);
  }

  createUserService(): IUserService {
    return new UserService(this.props);
  }

  createAuthService(): IAuthService {
    return new AuthService(this.props);
  }
}
