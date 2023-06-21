import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { AuthService } from '../../src/auth/AuthService';
import { AuthenticationMethod, LoginRequest, SessionRequest } from '../../src/auth/definitions';
import { SdkSettings } from '../../src/definitions';

describe('AuthService', () => {
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
  describe('login', () => {
    // Happy
    it('Should call axios POST with expected headers and body for SIWE authentication', async () => {
      // Arrange

      const credentials: LoginRequest = {
        authenticationMethod: AuthenticationMethod.SIWE,
        message: faker.lorem.sentence(),
        signature: faker.datatype.hexadecimal({ length: 128 }),
      };

      let resultedPath, resultedBody, resultedConfig;
      const expectedUnblockSessionId = faker.datatype.uuid();
      const expectedUserUuid = faker.datatype.uuid();

      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockImplementationOnce((path, body, config) => {
        resultedBody = body;
        resultedConfig = config;
        resultedPath = path;

        const axiosResponse = {
          data: {
            unblock_session_id: expectedUnblockSessionId,
            user_uuid: expectedUserUuid,
          },
        } as AxiosResponse<{
          user_uuid: string;
          unblock_session_id: string;
        }>;
        return Promise.resolve(axiosResponse);
      });

      const expectedPath = '/auth/login';
      const expectedBody = {
        message: credentials.message,
        signature: credentials.signature,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const service = new AuthService(props);

      // Act
      const response = await service.login(credentials);

      // Assert
      expect(resultedBody).toStrictEqual(expectedBody);
      expect(resultedConfig).toStrictEqual(expectedConfig);
      expect(resultedPath).toBe(expectedPath);
      expect(response).toStrictEqual({
        authenticationMethod: AuthenticationMethod.SIWE,
        userUuid: expectedUserUuid,
        unblockSessionId: expectedUnblockSessionId,
      });
    });

    it('Should call axios POST with expected headers and body for EMAIL authentication', async () => {
      // Arrange

      const credentials: LoginRequest = {
        authenticationMethod: AuthenticationMethod.EMAIL,
        userUuid: faker.datatype.uuid(),
      };

      let resultedPath, resultedBody, resultedConfig;
      const expectedMessage = faker.lorem.sentence();

      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockImplementationOnce((path, body, config) => {
        resultedBody = body;
        resultedConfig = config;
        resultedPath = path;

        const axiosResponse = {
          data: {
            message: expectedMessage,
            user_uuid: credentials.userUuid,
          },
        } as AxiosResponse<{
          user_uuid: string;
          message: string;
        }>;
        return Promise.resolve(axiosResponse);
      });

      const expectedPath = '/auth/login';
      const expectedBody = {
        user_uuid: credentials.userUuid,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const service = new AuthService(props);

      // Act
      const response = await service.login(credentials);

      // Assert
      expect(resultedBody).toStrictEqual(expectedBody);
      expect(resultedConfig).toStrictEqual(expectedConfig);
      expect(resultedPath).toBe(expectedPath);
      expect(response).toStrictEqual({
        authenticationMethod: AuthenticationMethod.EMAIL,
        message: expectedMessage,
        userUuid: credentials.userUuid,
      });
    });

    // Sad
    it('Should throw expected error when SIWE authentication has an Axios Error', async () => {
      // Arrange

      const credentials: LoginRequest = {
        authenticationMethod: AuthenticationMethod.SIWE,
        message: faker.lorem.sentence(),
        signature: faker.datatype.hexadecimal({ length: 128 }),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.login(credentials);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when SIWE authentication has an Unexpected Error', async () => {
      // Arrange

      const credentials: LoginRequest = {
        authenticationMethod: AuthenticationMethod.SIWE,
        message: faker.lorem.sentence(),
        signature: faker.datatype.hexadecimal({ length: 128 }),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

      const service = new AuthService(props);
      let expectedError;

      // Act
      try {
        await service.login(credentials);
      } catch (error) {
        expectedError = error;
      }

      // Assert
      expect(expectedError).toBeInstanceOf(Error);
      expect((expectedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when EMAIL authentication has an Axios Error', async () => {
      // Arrange

      const credentials: LoginRequest = {
        authenticationMethod: AuthenticationMethod.EMAIL,
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.login(credentials);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when EMAIL authentication has an Unexpected Error', async () => {
      // Arrange

      const credentials: LoginRequest = {
        authenticationMethod: AuthenticationMethod.EMAIL,
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };
      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.login(credentials);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('emailSession', () => {
    // Happy
    it('Should call axios GET with expected headers and parameters', async () => {
      // Arrange

      const emailSessionParams: SessionRequest = {
        code: faker.datatype.hexadecimal({ length: 256 }),
        userUuid: faker.datatype.uuid(),
      };

      let resultedPath, resultedConfig;
      const expectedUnblockSessionId = faker.datatype.uuid();

      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockImplementationOnce((path, config) => {
        resultedConfig = config;
        resultedPath = path;

        const axiosResponse = {
          data: {
            session_id: expectedUnblockSessionId,
          },
        } as AxiosResponse<{
          session_id: string;
        }>;
        return Promise.resolve(axiosResponse);
      });

      const expectedPath = '/auth/login/session';

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
        params: {
          user_uuid: emailSessionParams.userUuid,
          code: emailSessionParams.code,
        },
      };

      const service = new AuthService(props);

      // Act
      const response = await service.emailSession(emailSessionParams);

      // Assert
      expect(resultedConfig).toStrictEqual(expectedConfig);
      expect(resultedPath).toBe(expectedPath);
      expect(response).toStrictEqual({
        sessionId: expectedUnblockSessionId,
      });
    });

    // Sad
    it('Should throw expected error when GET call in emailSession has an Axios Error', async () => {
      // Arrange

      const emailSessionParams: SessionRequest = {
        code: faker.datatype.hexadecimal({ length: 256 }),
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.emailSession(emailSessionParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when GET call in emailSession has an Unexpected Error', async () => {
      // Arrange

      const emailSessionParams: SessionRequest = {
        code: faker.datatype.hexadecimal({ length: 256 }),
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };
      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.emailSession(emailSessionParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});