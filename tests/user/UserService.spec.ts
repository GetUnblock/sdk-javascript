import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from '../../src/SdkSettings';
import Country from '../../src/enums/Country';
import { ProcessStatus } from '../../src/enums/ProcessStatus';
import { UserStatus } from '../../src/enums/UserStatus';
import { UserSessionDataNotSetError } from '../../src/errors';
import { UserService } from '../../src/user/UserService';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserRampTransactionsResponse,
  GetUserStatusResponse,
  RampTransactionProcess,
} from '../../src/user/definitions';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('UserService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;
  let userSessionDataNotSetError: UserSessionDataNotSetError;
  let userUuid: string;
  let unblockSessionId: string;

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

      const service = new UserService(props);

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

      const service = new UserService(props);
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

      const service = new UserService(props);
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

      const service = new UserService(props);

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

      const expectedErrorMesage = `Unexpected error: ${userSessionDataNotSetError}`;

      const service = new UserService(props);
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

      const service = new UserService(props);
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

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserService(props);
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

      const service = new UserService(props);

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

      const expectedErrorMesage = `Unexpected error: ${userSessionDataNotSetError}`;

      const service = new UserService(props);
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

      const service = new UserService(props);
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

      const service = new UserService(props);
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
});
