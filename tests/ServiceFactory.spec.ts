import { SdkSettings } from '../src/SdkSettings';
import { ServiceFactory } from '../src/ServiceFactory';
import { CorporateCryptoToFiatService } from '../src/corporate/crypto-to-fiat/CorporateCryptoToFiatService';
import { CorporateFiatToCryptoService } from '../src/corporate/fiat-to-crypto/CorporateFiatToCryptoService';
import { KybService } from '../src/corporate/kyb/KybService';
import { CorporateManagementService } from '../src/corporate/management/CorporateManagementService';
import { AuthService } from '../src/general/auth/AuthService';
import { InformativeService } from '../src/general/informative/InformativeService';
import { ProcessService } from '../src/general/process/ProcessService';
import { UserCryptoToFiatService } from '../src/user/crypto-to-fiat/UserCryptoToFiatService';
import { UserFiatToCryptoService } from '../src/user/fiat-to-crypto/UserFiatToCryptoService';
import { KycService } from '../src/user/kyc/KycService';
import { UserManagementService } from '../src/user/management/UserManagementService';
import { propsMock } from './mocks/props.mock';

describe('ServiceFactory', () => {
  let props: SdkSettings;
  beforeEach(() => {
    props = propsMock();
  });

  it('Should create an AuthService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);
    // Act

    const service = factory.createAuthService();

    // Assert
    expect(service).toBeInstanceOf(AuthService);
  });

  it('Should create a KycService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createKycService();

    // Assert
    expect(service).toBeInstanceOf(KycService);
  });

  it('Should create an UserManagementService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createUserManagementService();

    // Assert
    expect(service).toBeInstanceOf(UserManagementService);
  });

  it('Should create an UserFiatToCryptoService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createUserFiatToCryptoService();

    // Assert
    expect(service).toBeInstanceOf(UserFiatToCryptoService);
  });

  it('Should create an ProcessService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createProcessService();

    // Assert
    expect(service).toBeInstanceOf(ProcessService);
  });

  it('Should create a CorporateManagementService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createCorporateManagementService();

    // Assert
    expect(service).toBeInstanceOf(CorporateManagementService);
  });

  it('Should create an UserCryptoToFiatService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createUserCryptoToFiatService();

    // Assert
    expect(service).toBeInstanceOf(UserCryptoToFiatService);
  });

  it('Should create an InformativeService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createInformativeService();

    // Assert
    expect(service).toBeInstanceOf(InformativeService);
  });

  it('Should create a CorporateCryptoToFiatService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createCorporateCryptoToFiatService();

    // Assert
    expect(service).toBeInstanceOf(CorporateCryptoToFiatService);
  });

  it('Should create a CorporateFiatToCryptoService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createCorporateFiatToCryptoService();

    // Assert
    expect(service).toBeInstanceOf(CorporateFiatToCryptoService);
  });

  it('Should create a KybService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createKybService();

    // Assert
    expect(service).toBeInstanceOf(KybService);
  });
});
