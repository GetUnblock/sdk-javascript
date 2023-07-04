import { IServiceFactory } from './ServiceFactory';
import { IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';
import { IExchangeRatesService } from './exchange-rates/ExchangeRatesService';
import { IKycService } from './kyc/KycService';
import { IProcessService } from './process/ProcessService';
import { IRemoteBankAccountService } from './remote-bank-account/RemoteBankAccountService';
import { ITransactionFeeService } from './transaction-fee/TransactionFeeService';
import { IUnblockBankAccountService } from './unblock-bank-account/UnblockBankAccountService';
import { IUserService } from './user/UserService';

export class SDK {
  private authService: IAuthService;
  private remoteBankAccountService: IRemoteBankAccountService;
  private kycService: IKycService;
  private userService: IUserService;
  private exchangeRatesService: IExchangeRatesService;
  private unblockBankAccountService: IUnblockBankAccountService;
  private transactionFeeService: ITransactionFeeService;
  private processService: IProcessService;

  constructor(private ServiceFactory: IServiceFactory, private props: SdkSettings) {
    // this.healthCheck();
    this.authService = this.ServiceFactory.createAuthService();
    this.remoteBankAccountService = this.ServiceFactory.createRemoteBankAccountService();
    this.kycService = this.ServiceFactory.createKycService();
    this.userService = this.ServiceFactory.createUserService();
    this.exchangeRatesService = this.ServiceFactory.createExchangeRatesService();
    this.unblockBankAccountService = this.ServiceFactory.createUnblockBankAccountService();
    this.transactionFeeService = this.ServiceFactory.createTransactionFeeService();
    this.processService = this.ServiceFactory.createProcessService();
  }

  private async healthCheck(): Promise<boolean> {
    // This is going to be an API call to check that the properties are properly setup
    throw new Error('Method not implemented.');
  }

  get auth(): IAuthService {
    return this.authService;
  }

  get remoteBankAccount(): IRemoteBankAccountService {
    return this.remoteBankAccountService;
  }

  get kyc(): IKycService {
    return this.kycService;
  }

  get user(): IUserService {
    return this.userService;
  }

  get exchangeRates(): IExchangeRatesService {
    return this.exchangeRatesService;
  }

  get unblockBankAccount(): IUnblockBankAccountService {
    return this.unblockBankAccountService;
  }

  get transactionFee(): ITransactionFeeService {
    return this.transactionFeeService;
  }

  get process(): IProcessService {
    return this.processService;
  }
}
