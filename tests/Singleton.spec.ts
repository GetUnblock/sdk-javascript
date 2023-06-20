import { faker } from '@faker-js/faker';
import * as SingletonModule from '../src/Singleton';
import { AuthFacade } from '../src/auth/AuthFacade';
import { SdkSettings } from '../src/definitions';

describe('Singleton', () => {
  const Singleton = SingletonModule.Singleton;
  describe('getInstance', () => {
    // Happy
    it('Should return a Singleton Type', () => {
      expect(Singleton.getInstance()).toBeInstanceOf(Singleton);
    });
  });

  describe('auth', () => {
    it('Should return a AuthService type', () => {
      const SDK = Singleton.getInstance();
      expect(SDK.auth).toBeInstanceOf(AuthFacade);
    });
  });

  describe('setup', () => {
    // Happy
    it('Should set the SDK settings and pass the healthcheck', async () => {
      // Arrange
      const SDK = Singleton.getInstance();
      jest.spyOn(SDK as any, 'healthCheck').mockResolvedValueOnce(true);
      const expectedProps: SdkSettings = {
        prodUrl: 'https://getunblock.com',
        sandBoxUrl: 'https://sandbox.getunblock.com',
        apiKey: `API-Key ${faker.datatype.string(128)}`,
        prod: false,
      };

      // Act

      await SDK.setup({ apiKey: expectedProps.apiKey, prod: expectedProps.prod });
      // Assert
      expect((SDK as any)['props']).toStrictEqual(expectedProps);
    });

    // Sad
    it('Should throw error if the healthcheck fails', async () => {
      // Arrange
      const SDK = Singleton.getInstance();
      jest.spyOn(SDK as any, 'healthCheck').mockResolvedValueOnce(false);
      const expectedProps: SdkSettings = {
        prodUrl: 'https://getunblock.com',
        sandBoxUrl: 'https://sandbox.getunblock.com',
        apiKey: `API-Key ${faker.datatype.string(128)}`,
        prod: false,
      };

      let resultedError;
      // Act
      try {
        await SDK.setup({ apiKey: expectedProps.apiKey, prod: expectedProps.prod });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe('Error to be defined');
    });
  });
});
