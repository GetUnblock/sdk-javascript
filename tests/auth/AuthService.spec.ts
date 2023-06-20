import { faker } from '@faker-js/faker';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthService } from '../../src/auth/AuthService';
import { AuthenticationMethod, LoginRequest } from '../../src/auth/definitions';
import { SdkSettings } from '../../src/definitions';

describe('AuthService', () => {
  describe('login', () => {
    // Happy
    it('Should call axios POST with expected headers and body for SIWE authentication', async () => {
      // Arrange
      const props: SdkSettings = {
        prodUrl: 'https://getunblock.com',
        sandBoxUrl: 'https://sandbox.getunblock.com',
        apiKey: `API-Key ${faker.datatype.string(64)}`,
        prod: faker.datatype.boolean(),
        timeoutMs: 10000,
      };

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
    // it('Should call axios POST with expected headers and body for EMAIL authentication');

    // // Sad
    // it('Should throw expected error when SIWE authentication has an Axios Error');
    // it('Should throw expected error when SIWE authentication has an Unexpected Error');

    // it('Should throw expected error when EMAIL authentication has an Axios Error');
    // it('Should throw expected error when EMAIL authentication has an Unexpected Error');
  });
  // describe('emailSession', () => {
  //   // Happy
  //   it('Should call axios GET with expected headers and parameters');

  //   // Sad
  //   it('Should throw expected error when SIWE authentication has an Axios Error');
  //   it('Should throw expected error when SIWE authentication has an Unexpected Error');
  // });
});
