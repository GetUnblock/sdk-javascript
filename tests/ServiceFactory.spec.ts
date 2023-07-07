import { faker } from '@faker-js/faker';
import { ServiceFactory } from '../src/ServiceFactory';
import { AuthService } from '../src/auth/AuthService';
import { CompanyService } from '../src/company/CompanyService';
import { SdkSettings } from '../src/definitions';
import { ExchangeRatesService } from '../src/exchange-rates/ExchangeRatesService';
import { KycService } from '../src/kyc/KycService';
import { ProcessService } from '../src/process/ProcessService';
import { RemoteBankAccountService } from '../src/remote-bank-account/RemoteBankAccountService';
import { TransactionFeeService } from '../src/transaction-fee/TransactionFeeService';
import { UnblockBankAccountService } from '../src/unblock-bank-account/UnblockBankAccountService';

describe('ServiceFactory', () => {
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

  it('Should create an UserService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createAuthService();

    // Assert
    expect(service).toBeInstanceOf(AuthService);
  });

  it('Should create an ExchangeRatesService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createExchangeRatesService();

    // Assert
    expect(service).toBeInstanceOf(ExchangeRatesService);
  });

  it('Should create an RemoteBankAccountService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createRemoteBankAccountService();

    // Assert
    expect(service).toBeInstanceOf(RemoteBankAccountService);
  });

  it('Should create an UnblockBankAccountService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createUnblockBankAccountService();

    // Assert
    expect(service).toBeInstanceOf(UnblockBankAccountService);
  });

  it('Should create an TransactionFeeService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createTransactionFeeService();

    // Assert
    expect(service).toBeInstanceOf(TransactionFeeService);
  });

  it('Should create an ProcessService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createProcessService();

    // Assert
    expect(service).toBeInstanceOf(ProcessService);
  });

  it('Should create an CompanyService instance', () => {
    // Arrange
    const factory = new ServiceFactory(props);

    // Act
    const service = factory.createCompanyService();

    // Assert
    expect(service).toBeInstanceOf(CompanyService);
  });
});
