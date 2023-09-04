import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from '../../../src/SdkSettings';
import Country from '../../../src/enums/Country';
import { ProcessStatus } from '../../../src/enums/ProcessStatus';
import { UserStatus } from '../../../src/enums/UserStatus';
import { UserSessionDataNotSetError } from '../../../src/errors';
import { UserManagementService } from '../../../src/user/management/UserManagementService';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserRampTransactionsResponse,
  GetUserStatusResponse,
  GetUserTokenPreferenceResponse,
  GetUserTokenPreferenceResponseData,
  RampTransactionProcess,
  TokenPreference,
  UpdateUserTokenPreferenceRequestBody,
  UpdateUserTokenPreferencesRequest,
  UpdateUserTokenPreferencesResponse,
  UpdateUserTokenPreferencesResponseData,
} from '../../../src/user/management/definitions';
import { axiosErrorMock, randomErrorMock } from '../../mocks/errors.mock';
import { propsMock } from '../../mocks/props.mock';
import { tokenPreferencesMock } from './tokenPreferences.mock';

describe('UserManagementService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;
  let userSessionDataNotSetError: UserSessionDataNotSetError;
  let userUuid: string;
  let unblockSessionId: string;
  let tokenPreferences: TokenPreference[];

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
    userSessionDataNotSetError = new UserSessionDataNotSetError();
    userUuid = faker.datatype.uuid();
    unblockSessionId = faker.datatype.uuid();
    tokenPreferences = tokenPreferencesMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    // Happy
    it('Should call axios POST with expected headers, params and body and return an expected response', async () => {
      // Arrange
      const params: CreateUserRequest = {
        country: faker.helpers.arrayElement(Object.values(Country)),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        targetAddress: faker.finance.ethereumAddress(),
      };

      const expectedResponse: CreateUserResponse = {
        message: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(Object.values(UserStatus)),
        userUuid: faker.datatype.uuid(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {
          message: expectedResponse.message,
          status: expectedResponse.status,
          user_uuid: expectedResponse.userUuid,
        },
      } as AxiosResponse<{
        message: string;
        user_uuid: string;
        status: UserStatus;
      }>);

      const expectedPath = `/user`;
      const expectedBody: {
        first_name: string;
        last_name: string;
        email: string;
        target_address: string;
        country: Country;
      } = {
        country: params.country,
        email: params.email,
        first_name: params.firstName,
        last_name: params.lastName,
        target_address: params.targetAddress,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const service = new UserManagementService(props);

      // Act
      const response = await service.createUser(params);

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const params: CreateUserRequest = {
        country: faker.helpers.arrayElement(Object.values(Country)),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        targetAddress: faker.finance.ethereumAddress(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.createUser(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const params: CreateUserRequest = {
        country: faker.helpers.arrayElement(Object.values(Country)),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        targetAddress: faker.finance.ethereumAddress(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Bad request: ${randomError}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.createUser(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getUserStatus', () => {
    // Happy
    it('Should call axios GET with expected headers and params and return an expected response', async () => {
      // Arrange
      const expectedResponse: GetUserStatusResponse = {
        status: faker.helpers.arrayElement(Object.values(UserStatus)),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: {
          status: expectedResponse.status,
        },
      } as AxiosResponse<{
        status: UserStatus;
      }>);

      const expectedPath = `/user/${userUuid}/status`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      const response = await service.getUserStatus();

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getUserStatus();
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getUserStatus();
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Bad request: ${randomError}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getUserStatus();
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getUserRampTransactions', () => {
    // Happy
    it('Should call axios GET with expected headers and params and return an expected response', async () => {
      // Arrange
      const offrampProcesses: RampTransactionProcess[] = [];
      const onrampProcesses: RampTransactionProcess[] = [];

      for (let i = 0; i < faker.datatype.number(5); i++) {
        offrampProcesses.push({
          amount: faker.datatype.number(),
          createdAt: faker.datatype.datetime().toString(),
          status: faker.helpers.arrayElement(Object.values(ProcessStatus)),
          updatedAt: faker.datatype.datetime().toString(),
          uuid: faker.datatype.uuid(),
        });
      }

      for (let i = 0; i < faker.datatype.number(5); i++) {
        onrampProcesses.push({
          amount: faker.datatype.number(),
          createdAt: faker.datatype.datetime().toString(),
          status: faker.helpers.arrayElement(Object.values(ProcessStatus)),
          updatedAt: faker.datatype.datetime().toString(),
          uuid: faker.datatype.uuid(),
        });
      }

      const expectedResponse: GetUserRampTransactionsResponse = {
        message: faker.lorem.sentence(),
        processes: {
          offramp: offrampProcesses,
          onramp: onrampProcesses,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      type AuxType = {
        message: string;
        processes: {
          onramp: {
            uuid: string;
            status: ProcessStatus;
            amount: number;
            created_at: string;
            updated_at: string;
          }[];
          offramp: {
            uuid: string;
            status: ProcessStatus;
            amount: number;
            created_at: string;
            updated_at: string;
          }[];
        };
      };

      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: {
          message: expectedResponse.message,
          processes: {
            offramp: expectedResponse.processes.offramp.map((item) => ({
              amount: item.amount,
              created_at: item.createdAt,
              status: item.status,
              updated_at: item.updatedAt,
              uuid: item.uuid,
            })),
            onramp: expectedResponse.processes.onramp.map((item) => ({
              amount: item.amount,
              created_at: item.createdAt,
              status: item.status,
              updated_at: item.updatedAt,
              uuid: item.uuid,
            })),
          },
        },
      } as AxiosResponse<AuxType>);

      const expectedPath = `user/${userUuid}/process`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      const response = await service.getUserRampTransactions();

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getUserRampTransactions();
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getUserRampTransactions();
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Bad request: ${randomError}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getUserRampTransactions();
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getUserTokenPreference', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange

      const expectedResult: GetUserTokenPreferenceResponse = tokenPreferences;
      const responseData: GetUserTokenPreferenceResponseData = tokenPreferences;
      const expectedPath = `/user/${userUuid}/token-preferences`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      const result = await service.getUserTokenPreference();

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new UserManagementService(props);

      // Act
      try {
        await service.getUserTokenPreference();
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      try {
        await service.getUserTokenPreference();
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Bad request: ${randomError}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      try {
        await service.getUserTokenPreference();
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('updateUserTokenPreference', () => {
    // Happy
    it('should call axios patch method with expected params and return the expected response', async () => {
      // Arrange
      const params: UpdateUserTokenPreferencesRequest = {
        preferences: tokenPreferences,
      };

      const expectedResult: UpdateUserTokenPreferencesResponse = { preferences: tokenPreferences };
      const responseData: UpdateUserTokenPreferencesResponseData = {
        preferences: tokenPreferences,
      };
      const expectedPath = `/user/${userUuid}/token-preferences`;
      const expectedBody: UpdateUserTokenPreferenceRequestBody = tokenPreferences;
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      const result = await service.updateUserTokenPreference(params);

      // Assert
      expect(axiosClient.patch).toBeCalledTimes(1);
      expect(axiosClient.patch).toHaveBeenLastCalledWith(
        expectedPath,
        expectedBody,
        expectedConfig,
      );
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      const params: UpdateUserTokenPreferencesRequest = {
        preferences: tokenPreferences,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;
      const service = new UserManagementService(props);

      // Act
      try {
        await service.updateUserTokenPreference(params);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const params: UpdateUserTokenPreferencesRequest = {
        preferences: tokenPreferences,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      try {
        await service.updateUserTokenPreference(params);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.patch).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const params: UpdateUserTokenPreferencesRequest = {
        preferences: tokenPreferences,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Bad request: ${randomError}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      try {
        await service.updateUserTokenPreference(params);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
