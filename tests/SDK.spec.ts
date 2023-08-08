import { SDK } from '../src/SDK';
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

describe('SDK', () => {
  let props: SdkSettings;
  beforeEach(() => {
    props = propsMock();
  });

  describe('general', () => {
    describe('auth', () => {
      it('Should return a AuthService type', () => {
        // Arrange
        const serviceFactory = new ServiceFactory(props);

        const sdk = new SDK(serviceFactory);

        // Assert
        expect(sdk.general.auth).toBeInstanceOf(AuthService);
      });
    });

    describe('informative', () => {
      it('Should return a InformativeService type', () => {
        // Arrange
        const serviceFactory = new ServiceFactory(props);

        const sdk = new SDK(serviceFactory);

        // Assert
        expect(sdk.general.informative).toBeInstanceOf(InformativeService);
      });
    });

    describe('process', () => {
      it('Should return a ProcessService type', () => {
        // Arrange
        const serviceFactory = new ServiceFactory(props);

        const sdk = new SDK(serviceFactory);

        // Assert
        expect(sdk.general.process).toBeInstanceOf(ProcessService);
      });
    });
  });

  describe('user', () => {
    it('Should return a KycService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.user.kyc).toBeInstanceOf(KycService);
    });

    it('Should return a UserManagementService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.user.management).toBeInstanceOf(UserManagementService);
    });

    it('Should return an UserCryptoToFiatService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.user.cryptoToFiat).toBeInstanceOf(UserCryptoToFiatService);
    });

    it('Should return a UserFiatToCryptoService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.user.fiatToCrypto).toBeInstanceOf(UserFiatToCryptoService);
    });
  });

  describe('corporate', () => {
    it('Should return a CorporateManagementService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.corporate.management).toBeInstanceOf(CorporateManagementService);
    });

    it('Should return a CorporateCryptoToFiatService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.corporate.cryptoToFiat).toBeInstanceOf(CorporateCryptoToFiatService);
    });

    it('Should return a CorporateFiatToCryptoService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.corporate.fiatToCrypto).toBeInstanceOf(CorporateFiatToCryptoService);
    });

    it('Should return a KybService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.corporate.kyb).toBeInstanceOf(KybService);
    });
  });
});
