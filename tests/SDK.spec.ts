import { faker } from '@faker-js/faker';
import { SDK } from '../src/SDK';
import { ServiceFactory } from '../src/ServiceFactory';
import { AuthService } from '../src/auth/AuthService';
import { CompanyService } from '../src/company/CompanyService';
import { SdkSettings } from '../src/definitions';
import { ExchangeRatesService } from '../src/exchange-rates/ExchangeRatesService';
import { KycService } from '../src/kyc/KycService';
import { ProcessService } from '../src/process/ProcessService';
import { RemoteBankAccountService } from '../src/remote-bank-account/RemoteBankAccountService';
import { TokenPreferenceService } from '../src/token-preference/TokenPreferenceService';
import { TransactionFeeService } from '../src/transaction-fee/TransactionFeeService';
import { UnblockBankAccountService } from '../src/unblock-bank-account/UnblockBankAccountService';
import { UserService } from '../src/user/UserService';

describe('SDK', () => {
  let props: SdkSettings;
  beforeEach(() => {
    props = {
      prodUrl: 'https://getunblock.com',
      sandBoxUrl: 'https://sandbox.getunblock.com',
      apiKey: `API-Key ${faker.datatype.string(64)}`,
      prod: faker.datatype.boolean(),
      timeoutMs: 10000,
    };
  });

  describe('auth', () => {
    it('Should return a AuthService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.auth).toBeInstanceOf(AuthService);
    });
  });

  describe('kyc', () => {
    it('Should return a KycService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.kyc).toBeInstanceOf(KycService);
    });
  });

  describe('user', () => {
    it('Should return a UserService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.user).toBeInstanceOf(UserService);
    });
  });

  describe('exchangeRates', () => {
    it('Should return a UserService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.exchangeRates).toBeInstanceOf(ExchangeRatesService);
    });
  });

  describe('remoteBankAccount', () => {
    it('Should return a UserService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.remoteBankAccount).toBeInstanceOf(RemoteBankAccountService);
    });
  });

  describe('unblockBankAccount', () => {
    it('Should return a UserService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.unblockBankAccount).toBeInstanceOf(UnblockBankAccountService);
    });
  });

  describe('transactionFee', () => {
    it('Should return a UserService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.transactionFee).toBeInstanceOf(TransactionFeeService);
    });
  });

  describe('process', () => {
    it('Should return a ProcessService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.process).toBeInstanceOf(ProcessService);
    });
  });

  describe('company', () => {
    it('Should return a CompanyService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.company).toBeInstanceOf(CompanyService);
    });
  });

  describe('token-preference', () => {
    it('Should return a TokenPreferenceService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory);

      // Assert
      expect(sdk.tokenPreference).toBeInstanceOf(TokenPreferenceService);
    });
  });
});
