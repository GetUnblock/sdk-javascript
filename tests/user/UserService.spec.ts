import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from '../../src/definitions';
import Country from '../../src/enums/Country';
import { UserService } from '../../src/user/UserService';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserRampTransactionsRequest,
  GetUserRampTransactionsResponse,
  GetUserStatusRequest,
  GetUserStatusResponse,
  ProcessStatus,
  RampTransactionProcess,
  UserStatus,
} from '../../src/user/definitions';
import { getRandomFromEnum } from '../utils';

describe('UserService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = {
      prodUrl: 'https://getunblock.com',
      sandBoxUrl: 'https://sandbox.getunblock.com',
      apiKey: `API-Key ${faker.datatype.string(64)}`,
      prod: faker.datatype.boolean(),
      timeoutMs: 10000,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    it('Should call axios POST with expected headers, params and body and return an expected response', async () => {
      // Arrange
      const params: CreateUserRequest = {
        country: getRandomFromEnum(Country),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        targetAddress: faker.finance.ethereumAddress(),
      };

      const expectedResponse: CreateUserResponse = {
        message: faker.lorem.sentence(),
        status: getRandomFromEnum(UserStatus),
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

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const params: CreateUserRequest = {
        country: getRandomFromEnum(Country),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        targetAddress: faker.finance.ethereumAddress(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
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
        country: getRandomFromEnum(Country),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        targetAddress: faker.finance.ethereumAddress(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

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
    it('Should call axios GET with expected headers and params and return an expected response', async () => {
      // Arrange
      const params: GetUserStatusRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const expectedResponse: GetUserStatusResponse = {
        status: getRandomFromEnum(UserStatus),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: {
          status: expectedResponse.status,
        },
      } as AxiosResponse<{
        status: UserStatus;
      }>);

      const expectedPath = `/user/${params.userUuid}/status`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const service = new UserService(props);

      // Act
      const response = await service.getUserStatus(params);

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const params: GetUserStatusRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new UserService(props);
      let resultedError;

      // Act
      try {
        await service.getUserStatus(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const params: GetUserStatusRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

      const service = new UserService(props);
      let resultedError;

      // Act
      try {
        await service.getUserStatus(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getUserRampTransactions', () => {
    it('Should call axios GET with expected headers and params and return an expected response', async () => {
      // Arrange
      const params: GetUserRampTransactionsRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const offrampProcesses: RampTransactionProcess[] = [];
      const onrampProcesses: RampTransactionProcess[] = [];

      for (let i = 0; i < faker.datatype.number(5); i++) {
        offrampProcesses.push({
          amount: faker.datatype.number(),
          createdAt: faker.datatype.datetime().toString(),
          status: getRandomFromEnum(ProcessStatus),
          updatedAt: faker.datatype.datetime().toString(),
          uuid: faker.datatype.uuid(),
        });
      }

      for (let i = 0; i < faker.datatype.number(5); i++) {
        onrampProcesses.push({
          amount: faker.datatype.number(),
          createdAt: faker.datatype.datetime().toString(),
          status: getRandomFromEnum(ProcessStatus),
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

      const expectedPath = `user/${params.userUuid}/process`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const service = new UserService(props);

      // Act
      const response = await service.getUserRampTransactions(params);

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const params: GetUserRampTransactionsRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new UserService(props);
      let resultedError;

      // Act
      try {
        await service.getUserRampTransactions(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const params: GetUserRampTransactionsRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

      const service = new UserService(props);
      let resultedError;

      // Act
      try {
        await service.getUserRampTransactions(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
