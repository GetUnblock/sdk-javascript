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
  ExternalProcessDirection,
  GetUserResponse,
  GetUserTokenPreferenceResponse,
  GetUserTokenPreferenceResponseData,
  ProcessDetails,
  TokenPreference,
} from '../../../src/user/management/definitions';
import { axiosErrorMock, randomErrorMock } from '../../mocks/errors.mock';
import { propsMock } from '../../mocks/props.mock';
import { tokenPreferencesMock } from './tokenPreferences.mock';
import { Currency } from '../../../dist';

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
        status: faker.helpers.arrayElement(Object.values(UserStatus)),
        userUuid: faker.datatype.uuid(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {
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

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

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

  describe('getUserDetails', () => {
    // Happy
    it('Should call axios GET with expected headers and params and return an expected response', async () => {
      // Arrange
      const expectedResponse: GetUserResponse = {
        uuid: faker.datatype.uuid(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        date_of_birth: faker.date.recent(),
        email: faker.internet.email(),
        address: {},
        status: faker.helpers.arrayElement(Object.values(UserStatus)),
        linked_corporates_uuid: [],
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: expectedResponse,
      } as AxiosResponse<GetUserResponse>);

      const expectedPath = `/user`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'user-uuid': userUuid,
        },
      };

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      const response = await service.getUserDetails();

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
        await service.getUserDetails();
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
        await service.getUserDetails();
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

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getUserDetails();
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
      const expectedResponse: ProcessDetails[] = [
        {
          status: ProcessStatus.CRYPTO_TRANSFER_NOT_STARTED,
          user_uuid: userUuid,
          direction: ExternalProcessDirection.CRYPTO_TO_FIAT,
          input: {
            amount: 0,
            currency: Currency.USD,
            transaction_id: faker.datatype.uuid(),
          },
        },
      ];

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: expectedResponse,
      } as AxiosResponse<ProcessDetails[]>);

      const expectedPath = `/user/transactions`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'user-uuid': userUuid,
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

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

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
      const expectedPath = `/user/token-preferences`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'user-uuid': userUuid,
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

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
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
      const params: TokenPreference = tokenPreferences[0];
      const expectedPath = `/user/token-preferences`;
      const expectedBody: TokenPreference = tokenPreferences[0];
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
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserManagementService(props);

      // Act
      await service.updateUserTokenPreference(params);

      // Assert
      expect(axiosClient.patch).toBeCalledTimes(1);
      expect(axiosClient.patch).toHaveBeenLastCalledWith(
        expectedPath,
        expectedBody,
        expectedConfig,
      );
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      const params: TokenPreference = tokenPreferences[0];

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
      const params: TokenPreference = tokenPreferences[0];

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
      const params: TokenPreference = tokenPreferences[0];

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
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
