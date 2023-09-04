import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { SdkSettings } from '../../../src/SdkSettings';
import { UserSessionDataNotSetError } from '../../../src/errors';
import { UserFiatToCryptoService } from '../../../src/user/fiat-to-crypto/UserFiatToCryptoService';
import {
  CreateUnblockUserBankAccountResponse,
  GetAllunblockUserBankAccountsResponse,
  GetUnblockBankAccountByIdResponse,
  SimulateOnRampResponse,
  UnblockUserBankAccount,
  UnblockUserBankAccountFull,
} from '../../../src/user/fiat-to-crypto/definitions';
import { axiosErrorMock, randomErrorMock } from '../../mocks/errors.mock';
import { propsMock } from '../../mocks/props.mock';

describe('UserFiatToCryptoService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;

  let userUuid: string;
  let unblockSessionId: string;
  let currency: string;

  let createdAt: string;
  let updatedAt: string;
  let uuid: string;

  let amount: number;

  let axiosError: AxiosError;
  let randomError: unknown;
  let userSessionDataNotSetError: UserSessionDataNotSetError;

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
    currency = faker.finance.currencyCode();

    createdAt = faker.date.recent().toDateString();
    updatedAt = createdAt;
    uuid = faker.datatype.uuid();

    amount = faker.datatype.number({ min: 0.01, max: 100000000, precision: 0.01 });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUnblockUserBankAccount', () => {
    // Happy
    it('should call axios post method with expected params and return the expected response', async () => {
      // Arrange
      const expectedPath = `/user/${userUuid}/bank-account/unblock`;
      const expectedBody = { currency: currency };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      const expectedResult: CreateUnblockUserBankAccountResponse = {
        currency: currency,
        createdAt: createdAt,
        updatedAt: updatedAt,
        uuid: uuid,
      };

      const responseData = {
        currency: currency,
        created_at: createdAt,
        updated_at: updatedAt,
        uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 201,
        data: responseData,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserFiatToCryptoService(props);

      // Act
      const result = await service.createUnblockUserBankAccount({
        currency: currency,
      });

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.createUnblockUserBankAccount({
          currency: currency,
        });
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
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.createUnblockUserBankAccount({
          currency: currency,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.createUnblockUserBankAccount({
          currency: currency,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getAllUnblockUserBankAccounts', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange
      const expectedPath = `/user/${userUuid}/bank-account/unblock`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      const accounts = [];
      const accountsLength = faker.datatype.number(5);

      for (let i = 0; i < accountsLength; i++) {
        accounts.push({
          currency: faker.finance.currencyCode(),
          createdAt: faker.date.recent().toDateString(),
          updatedAt: createdAt,
          uuid: faker.datatype.uuid(),
        });
      }

      const expectedResult: GetAllunblockUserBankAccountsResponse = accounts;

      const responseData: UnblockUserBankAccount[] = accounts.map((item) => {
        return {
          currency: item.currency,
          created_at: item.createdAt,
          updated_at: item.updatedAt,
          uuid: item.uuid,
        };
      });

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserFiatToCryptoService(props);

      // Act
      const result = await service.getAllUnblockUserBankAccounts();

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

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.getAllUnblockUserBankAccounts();
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

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.getAllUnblockUserBankAccounts();
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

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.getAllUnblockUserBankAccounts();
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('simulateOnRamp', () => {
    // Happy
    it('should call axios post method with expected params and return the expected response', async () => {
      // Arrange
      const expectedPath = `/user/${userUuid}/bank-account/unblock/test`;
      const expectedBody = { currency: currency, value: amount };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      const message = faker.lorem.sentence();

      const expectedResult: SimulateOnRampResponse = {
        message: message,
      };

      const responseData = {
        message: message,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserFiatToCryptoService(props);

      // Act
      const result = await service.simulateOnRamp({
        currency: currency,
        value: amount,
      });

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.simulateOnRamp({
          currency: currency,
          value: amount,
        });
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
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.simulateOnRamp({
          currency: currency,
          value: amount,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.simulateOnRamp({
          currency: currency,
          value: amount,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getUnblockBankAccountById', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange
      const expectedPath = `/user/${userUuid}/bank-account/unblock/${uuid}`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      const bic = faker.finance.bic();
      const accountNumber = faker.finance.account();
      const iban = faker.finance.iban();
      const holderName = faker.lorem.word();
      const currentBalance = faker.datatype.number({ min: 0.01, max: 100000000, precision: 0.01 });
      const availableBalance = faker.datatype.number({
        min: 0.01,
        max: 100000000,
        precision: 0.01,
      });
      const sortCode = faker.finance.account(6);

      const expectedResult: GetUnblockBankAccountByIdResponse = {
        currency: currency,
        createdAt: createdAt,
        updatedAt: updatedAt,
        uuid: uuid,
        bic: bic,
        accountNumber: accountNumber,
        iban: iban,
        holderName: holderName,
        currentBalance: currentBalance,
        availableBalance: availableBalance,
        sortCode: sortCode,
      };
      const responseData: UnblockUserBankAccountFull = {
        currency: currency,
        created_at: createdAt,
        updated_at: updatedAt,
        uuid: uuid,
        bic: bic,
        account_number: accountNumber,
        iban: iban,
        holder_name: holderName,
        current_balance: currentBalance,
        available_balance: availableBalance,
        sort_code: sortCode,
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

      const service = new UserFiatToCryptoService(props);

      // Act
      const result = await service.getUnblockBankAccountById({
        accountUuid: uuid,
      });

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

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.getUnblockBankAccountById({ accountUuid: uuid });
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

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.getUnblockBankAccountById({ accountUuid: uuid });
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

      const service = new UserFiatToCryptoService(props);

      // Act
      try {
        await service.getUnblockBankAccountById({ accountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
