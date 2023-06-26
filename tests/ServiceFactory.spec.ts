import { faker } from '@faker-js/faker';
import { ServiceFactory } from '../src/ServiceFactory';
import { AuthService } from '../src/auth/AuthService';
import { SdkSettings } from '../src/definitions';
import { KycService } from '../src/kyc/KycService';

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
});
