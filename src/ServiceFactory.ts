import { SdkSettings } from './SdkSettings';
import {
  CorporateCryptoToFiatService,
  ICorporateCryptoToFiatService,
} from './corporate/crypto-to-fiat/CorporateCryptoToFiatService';
import {
  CorporateFiatToCryptoService,
  ICorporateFiatToCryptoService,
} from './corporate/fiat-to-crypto/CorporateFiatToCryptoService';
import { IKybService, KybService } from './corporate/kyb/KybService';
import {
  CorporateManagementService,
  ICorporateManagementService,
} from './corporate/management/CorporateManagementService';
import { AuthService, IAuthService } from './general/auth/AuthService';
import { IInformativeService, InformativeService } from './general/informative/InformativeService';
import { IProcessService, ProcessService } from './general/process/ProcessService';
import {
  IUserCryptoToFiatService,
  UserCryptoToFiatService,
} from './user/crypto-to-fiat/UserCryptoToFiatService';
import {
  IUserFiatToCryptoService,
  UserFiatToCryptoService,
} from './user/fiat-to-crypto/UserFiatToCryptoService';
import { IKycService, KycService } from './user/kyc/KycService';
import {
  IUserManagementService,
  UserManagementService,
} from './user/management/UserManagementService';

export interface IServiceFactory {
  createKybService(): IKybService;
  createAuthService(): IAuthService;
  createInformativeService(): IInformativeService;
  createProcessService(): IProcessService;
  createUserManagementService(): IUserManagementService;
  createUserFiatToCryptoService(): IUserFiatToCryptoService;
  createUserCryptoToFiatService(): IUserCryptoToFiatService;
  createKycService(): IKycService;
  createCorporateManagementService(): ICorporateManagementService;
  createCorporateCryptoToFiatService(): ICorporateCryptoToFiatService;
  createCorporateFiatToCryptoService(): ICorporateFiatToCryptoService;
}

export class ServiceFactory implements IServiceFactory {
  constructor(private props: SdkSettings) {}

  createUserCryptoToFiatService(): IUserCryptoToFiatService {
    return new UserCryptoToFiatService(this.props);
  }

  createCorporateManagementService(): ICorporateManagementService {
    return new CorporateManagementService(this.props);
  }

  createProcessService(): IProcessService {
    return new ProcessService(this.props);
  }

  createUserFiatToCryptoService(): IUserFiatToCryptoService {
    return new UserFiatToCryptoService(this.props);
  }

  createKycService(): IKycService {
    return new KycService(this.props);
  }

  createUserManagementService(): IUserManagementService {
    return new UserManagementService(this.props);
  }

  createAuthService(): IAuthService {
    return new AuthService(this.props);
  }

  createInformativeService(): IInformativeService {
    return new InformativeService(this.props);
  }

  createCorporateCryptoToFiatService(): ICorporateCryptoToFiatService {
    return new CorporateCryptoToFiatService(this.props);
  }

  createCorporateFiatToCryptoService(): ICorporateFiatToCryptoService {
    return new CorporateFiatToCryptoService(this.props);
  }

  createKybService(): IKybService {
    return new KybService(this.props);
  }
}
