import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { AuthService } from '../../src/auth/AuthService';
import {
  GenerateSiweLoginMessageRequest,
  LoginRequest,
  SessionRequest,
} from '../../src/auth/definitions';
import { SdkSettings } from '../../src/definitions';
import { AuthenticationMethod } from '../../src/enums/AuthenticationMethod';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';
import { mockEthereumProviderSigner } from './AuthService.mock';

describe('AuthService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
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

      const expectedUnblockSessionId = faker.datatype.uuid();
      const expectedUserUuid = faker.datatype.uuid();

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {
          unblock_session_id: expectedUnblockSessionId,
          user_uuid: expectedUserUuid,
        },
      } as AxiosResponse<{
        user_uuid: string;
        unblock_session_id: string;
      }>);

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
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
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

      const expectedMessage = faker.lorem.sentence();

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {
          message: expectedMessage,
          user_uuid: credentials.userUuid,
        },
      } as AxiosResponse<{
        user_uuid: string;
        message: string;
      }>);
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
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
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

      const expectedUnblockSessionId = faker.datatype.uuid();

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: {
          session_id: expectedUnblockSessionId,
        },
      } as AxiosResponse<{
        session_id: string;
      }>);

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
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
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

  describe('generateSiweLoginMessage', () => {
    it('Should return a signed message', async () => {
      // Arrange
      const walletAddress = '0xbEFcCcFC70d97884f70b41927f6D20C511F4A36C';
      const fakeSignature = faker.datatype.hexadecimal({ length: 512 }).toUpperCase();
      const mockSigner = mockEthereumProviderSigner();

      const params: GenerateSiweLoginMessageRequest = {
        chainId: '80001',
        signingUrl: 'https://sandbox.getunblock.com',
        providerSigner: mockSigner,
      };

      mockSigner.getAddress.mockResolvedValue(walletAddress);
      mockSigner.signMessage.mockResolvedValue(fakeSignature);
      const service = new AuthService(props);

      const expectedMessage = `${params.signingUrl.replace(
        'https://',
        '',
      )} wants you to sign in with your Ethereum account:\n${walletAddress}\n\nSign in with Ethereum\n\nURI: ${
        params.signingUrl
      }/auth/login\nVersion: 1\nChain ID: ${params.chainId}`;

      // Act
      const result = await service.generateSiweLoginMessage(params);

      // Assert
      expect(result.message.indexOf(expectedMessage)).toBe(0);
      expect(result.signature).toBe(fakeSignature);
    });

    it('Should throw an expected error when the provider signer throws an unexpected error when getting the wallet address', async () => {
      const mockSigner = mockEthereumProviderSigner();

      const params: GenerateSiweLoginMessageRequest = {
        chainId: '80001',
        signingUrl: 'https://sandbox.getunblock.com',
        providerSigner: mockSigner,
      };

      const fakeErrorMessage = faker.lorem.sentence();
      const expectedErrorMesage = `Siwe Signing Error: ${{
        ...(randomError as any),
        message: fakeErrorMessage,
      }}`;

      mockSigner.getAddress.mockRejectedValue({
        ...(randomError as any),
        message: fakeErrorMessage,
      });

      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.generateSiweLoginMessage(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw an expected error when the provider signer throws an unexpected error when signing the message', async () => {
      const walletAddress = '0xbEFcCcFC70d97884f70b41927f6D20C511F4A36C';
      const mockSigner = mockEthereumProviderSigner();

      const params: GenerateSiweLoginMessageRequest = {
        chainId: '80001',
        signingUrl: 'https://sandbox.getunblock.com',
        providerSigner: mockSigner,
      };

      const fakeErrorMessage = faker.lorem.sentence();
      const expectedErrorMesage = `Siwe Signing Error: ${{
        ...(randomError as any),
        message: fakeErrorMessage,
      }}`;

      mockSigner.getAddress.mockResolvedValue(walletAddress);
      mockSigner.signMessage.mockRejectedValue({
        ...(randomError as any),
        message: fakeErrorMessage,
      });
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.generateSiweLoginMessage(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
