import { faker } from '@faker-js/faker';
import { SDK } from '../src/SDK';
import { ServiceFactory } from '../src/ServiceFactory';
import { AuthService } from '../src/auth/AuthService';
import { SdkSettings } from '../src/definitions';
import { KycService } from '../src/kyc/KycService';

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

      const sdk = new SDK(serviceFactory, props);

      // Assert
      expect(sdk.auth).toBeInstanceOf(AuthService);
    });
  });

  describe('kyc', () => {
    it('Should return a KycService type', () => {
      // Arrange
      const serviceFactory = new ServiceFactory(props);

      const sdk = new SDK(serviceFactory, props);

      // Assert
      expect(sdk.kyc).toBeInstanceOf(KycService);
    });
  });
});
