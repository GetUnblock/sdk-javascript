import { IServiceFactory } from './ServiceFactory';
import { IAuthService } from './auth/AuthService';
import { ICompanyService } from './company/CompanyService';
import { IExchangeRatesService } from './exchange-rates/ExchangeRatesService';
import { IKycService } from './kyc/KycService';
import { IOfframpService } from './offramp/OfframpService';
import { IProcessService } from './process/ProcessService';
import { IRemoteBankAccountService } from './remote-bank-account/RemoteBankAccountService';
import { ITokenPreferenceService } from './token-preference/TokenPreferenceService';
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
  private companyService: ICompanyService;
  private tokenPreferenceService: ITokenPreferenceService;
  private offrampService: IOfframpService;

  constructor(private ServiceFactory: IServiceFactory) {
    // this.healthCheck();
    this.authService = this.ServiceFactory.createAuthService();
    this.remoteBankAccountService = this.ServiceFactory.createRemoteBankAccountService();
    this.kycService = this.ServiceFactory.createKycService();
    this.userService = this.ServiceFactory.createUserService();
    this.exchangeRatesService = this.ServiceFactory.createExchangeRatesService();
    this.unblockBankAccountService = this.ServiceFactory.createUnblockBankAccountService();
    this.transactionFeeService = this.ServiceFactory.createTransactionFeeService();
    this.processService = this.ServiceFactory.createProcessService();
    this.companyService = this.ServiceFactory.createCompanyService();
    this.tokenPreferenceService = this.ServiceFactory.createTokenPreferenceService();
    this.offrampService = this.ServiceFactory.createOfframpService();
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

  get company(): ICompanyService {
    return this.companyService;
  }

  get tokenPreference(): ITokenPreferenceService {
    return this.tokenPreferenceService;
  }

  get offramp(): IOfframpService {
    return this.offrampService;
  }
}
