import { IServiceFactory } from './ServiceFactory';
import { ICorporateCryptoToFiatService } from './corporate/crypto-to-fiat/CorporateCryptoToFiatService';
import { ICorporateFiatToCryptoService } from './corporate/fiat-to-crypto/CorporateFiatToCryptoService';
import { IKybService } from './corporate/kyb/KybService';
import { ICorporateManagementService } from './corporate/management/CorporateManagementService';
import { IAuthService } from './general/auth/AuthService';
import { IInformativeService } from './general/informative/InformativeService';
import { IProcessService } from './general/process/ProcessService';
import { IUserCryptoToFiatService } from './user/crypto-to-fiat/UserCryptoToFiatService';
import { IUserFiatToCryptoService } from './user/fiat-to-crypto/UserFiatToCryptoService';
import { IKycService } from './user/kyc/KycService';
import { IUserManagementService } from './user/management/UserManagementService';

type GeneralServicesPack = {
  auth: IAuthService;
  informative: IInformativeService;
  process: IProcessService;
};

type UserServicesPack = {
  management: IUserManagementService;
  fiatToCrypto: IUserFiatToCryptoService;
  cryptoToFiat: IUserCryptoToFiatService;
  kyc: IKycService;
};

type CorporateServicesPack = {
  management: ICorporateManagementService;
  fiatToCrypto: ICorporateFiatToCryptoService;
  cryptoToFiat: ICorporateCryptoToFiatService;
  kyb: IKybService;
};

export class SDK {
  private authService: IAuthService;
  private informativeService: IInformativeService;
  private processService: IProcessService;
  private userManagementService: IUserManagementService;
  private userFiatToCryptoService: IUserFiatToCryptoService;
  private userCryptoToFiatService: IUserCryptoToFiatService;
  private kycService: IKycService;
  private corporateManagementService: ICorporateManagementService;
  private corporateCryptoToFiatService: ICorporateCryptoToFiatService;
  private corporateFiatToCryptoService: ICorporateFiatToCryptoService;
  private kybService: IKybService;

  constructor(private ServiceFactory: IServiceFactory) {
    // this.healthCheck();
    this.authService = this.ServiceFactory.createAuthService();
    this.informativeService = this.ServiceFactory.createInformativeService();
    this.processService = this.ServiceFactory.createProcessService();
    this.kycService = this.ServiceFactory.createKycService();
    this.userManagementService = this.ServiceFactory.createUserManagementService();
    this.userFiatToCryptoService = this.ServiceFactory.createUserFiatToCryptoService();
    this.userCryptoToFiatService = this.ServiceFactory.createUserCryptoToFiatService();
    this.corporateManagementService = this.ServiceFactory.createCorporateManagementService();
    this.corporateCryptoToFiatService = this.ServiceFactory.createCorporateCryptoToFiatService();
    this.corporateFiatToCryptoService = this.ServiceFactory.createCorporateFiatToCryptoService();
    this.kybService = this.ServiceFactory.createKybService();
  }

  private async healthCheck(): Promise<boolean> {
    // This is going to be an API call to check that the properties are properly setup
    throw new Error('Method not implemented.');
  }

  get general(): GeneralServicesPack {
    return {
      auth: this.authService,
      informative: this.informativeService,
      process: this.processService,
    };
  }

  get user(): UserServicesPack {
    return {
      management: this.userManagementService,
      fiatToCrypto: this.userFiatToCryptoService,
      kyc: this.kycService,
      cryptoToFiat: this.userCryptoToFiatService,
    };
  }

  get corporate(): CorporateServicesPack {
    return {
      management: this.corporateManagementService,
      cryptoToFiat: this.corporateCryptoToFiatService,
      fiatToCrypto: this.corporateFiatToCryptoService,
      kyb: this.kybService,
    };
  }
}
