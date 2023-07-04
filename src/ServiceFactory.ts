import { AuthService, IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';
import { ExchangeRatesService, IExchangeRatesService } from './exchange-rates/ExchangeRatesService';
import { IKycService, KycService } from './kyc/KycService';
import { IProcessService, ProcessService } from './process/ProcessService';
import {
  IRemoteBankAccountService,
  RemoteBankAccountService,
} from './remote-bank-account/RemoteBankAccountService';
import {
  ITransactionFeeService,
  TransactionFeeService,
} from './transaction-fee/TransactionFeeService';
import {
  IUnblockBankAccountService,
  UnblockBankAccountService,
} from './unblock-bank-account/UnblockBankAccountService';
import { IUserService, UserService } from './user/UserService';

export interface IServiceFactory {
  createAuthService(): IAuthService;
  createRemoteBankAccountService(): IRemoteBankAccountService;
  createKycService(): IKycService;
  createUserService(): IUserService;
  createExchangeRatesService(): IExchangeRatesService;
  createUnblockBankAccountService(): IUnblockBankAccountService;
  createTransactionFeeService(): ITransactionFeeService;
  createProcessService(): IProcessService;
}

export class ServiceFactory implements IServiceFactory {
  constructor(private props: SdkSettings) {}
  createProcessService(): IProcessService {
    return new ProcessService(this.props);
  }

  createTransactionFeeService(): ITransactionFeeService {
    return new TransactionFeeService(this.props);
  }

  createUnblockBankAccountService(): IUnblockBankAccountService {
    return new UnblockBankAccountService(this.props);
  }

  createExchangeRatesService(): IExchangeRatesService {
    return new ExchangeRatesService(this.props);
  }

  createRemoteBankAccountService(): IRemoteBankAccountService {
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
