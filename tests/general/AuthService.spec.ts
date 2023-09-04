import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from '../../src/SdkSettings';
import { AuthService } from '../../src/general/auth/AuthService';
import {
  AuthenticateWithEmailRequest,
  AuthenticateWithSiweRequest,
  GenerateSiweSignedMessageRequest,
  SetUnblockSessionByEmailCodeRequest,
} from '../../src/general/auth/definitions';
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
    props.setUserSessionData({
      userUuid: faker.datatype.uuid(),
      unblockSessionId: faker.datatype.uuid(),
    });
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('authenticateWithSiwe', () => {
    // Happy
    it('Should call axios POST with expected headers and body for SIWE authentication', async () => {
      // Arrange
      const params: AuthenticateWithSiweRequest = {
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
      } as AxiosResponse);

      const expectedPath = '/auth/login';
      const expectedBody = {
        message: params.message,
        signature: params.signature,
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
      await service.authenticateWithSiwe(params);

      // Assert
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(props.userSessionData?.userUuid).toBe(expectedUserUuid);
      expect(props.userSessionData?.unblockSessionId).toBe(expectedUnblockSessionId);
    });

    // Sad
    it('Should throw expected error when SIWE authentication has an Axios Error', async () => {
      // Arrange
      const params: AuthenticateWithSiweRequest = {
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
        await service.authenticateWithSiwe(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when SIWE authentication has an Unexpected Error', async () => {
      // Arrange
      const params: AuthenticateWithSiweRequest = {
        message: faker.lorem.sentence(),
        signature: faker.datatype.hexadecimal({ length: 128 }),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Bad request: ${randomError}`;

      const service = new AuthService(props);
      let expectedError;

      // Act
      try {
        await service.authenticateWithSiwe(params);
      } catch (error) {
        expectedError = error;
      }

      // Assert
      expect(expectedError).toBeInstanceOf(Error);
      expect((expectedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('authenticateWithEmail', () => {
    // Happy

    it('Should call axios POST with expected headers and body for EMAIL authentication', async () => {
      // Arrange
      const params: AuthenticateWithEmailRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const expectedMessage = faker.lorem.sentence();

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {
          message: expectedMessage,
          user_uuid: params.userUuid,
        },
      } as AxiosResponse<{
        user_uuid: string;
        message: string;
      }>);
      const expectedPath = '/auth/login';
      const expectedBody = {
        user_uuid: params.userUuid,
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
      await service.authenticateWithEmail(params);

      // Assert
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
    });

    // Sad

    it('Should throw expected error when EMAIL authentication has an Axios Error', async () => {
      // Arrange
      const params: AuthenticateWithEmailRequest = {
        userUuid: faker.datatype.uuid(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.authenticateWithEmail(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when EMAIL authentication has an Unexpected Error', async () => {
      // Arrange
      const params: AuthenticateWithEmailRequest = {
        userUuid: faker.datatype.uuid(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Bad request: ${randomError}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.authenticateWithEmail(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('setUnblockSessionByEmailCode', () => {
    // Happy
    it('Should call axios POST with expected headers and body', async () => {
      // Arrange

      const emailSessionParams: SetUnblockSessionByEmailCodeRequest = {
        emailCode: faker.datatype.hexadecimal({ length: 256 }),
      };

      const expectedUnblockSessionId = faker.datatype.uuid();

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {
          unblock_session_id: expectedUnblockSessionId,
        },
      } as AxiosResponse<{
        unblock_session_id: string;
      }>);

      const expectedPath = '/auth/otp';
      const expectedBody = {
        user_uuid: props.userSessionData?.userUuid,
        one_time_password: emailSessionParams.emailCode,
      };

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const service = new AuthService(props);

      // Act
      await service.setUnblockSessionByEmailCode(emailSessionParams);

      // Assert
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(props.userSessionData?.unblockSessionId).toBe(expectedUnblockSessionId);
    });

    // Sad
    it('Should throw expected error when POST call in emailSession has an Axios Error', async () => {
      // Arrange
      const emailSessionParams: SetUnblockSessionByEmailCodeRequest = {
        emailCode: faker.datatype.hexadecimal({ length: 256 }),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.setUnblockSessionByEmailCode(emailSessionParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when POST call in emailSession has an Unexpected Error', async () => {
      // Arrange

      const emailSessionParams: SetUnblockSessionByEmailCodeRequest = {
        emailCode: faker.datatype.hexadecimal({ length: 256 }),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Bad request: ${randomError}`;
      const service = new AuthService(props);
      let resultedError;

      // Act
      try {
        await service.setUnblockSessionByEmailCode(emailSessionParams);
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

      const params: GenerateSiweSignedMessageRequest = {
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
      const result = await service.generateSiweSignedMessage(params);

      // Assert
      expect(result.message.indexOf(expectedMessage)).toBe(0);
      expect(result.signature).toBe(fakeSignature);
    });

    it('Should throw an expected error when the provider signer throws an unexpected error when getting the wallet address', async () => {
      const mockSigner = mockEthereumProviderSigner();

      const params: GenerateSiweSignedMessageRequest = {
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
        await service.generateSiweSignedMessage(params);
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

      const params: GenerateSiweSignedMessageRequest = {
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
        await service.generateSiweSignedMessage(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
