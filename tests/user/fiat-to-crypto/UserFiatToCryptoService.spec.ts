import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Currency } from '../../../src';
import { SdkSettings } from '../../../src/SdkSettings';
import { UserSessionDataNotSetError } from '../../../src/errors';
import { UserFiatToCryptoService } from '../../../src/user/fiat-to-crypto/UserFiatToCryptoService';
import {
  CreateUnblockUserBankAccountResponse,
  GetAllunblockUserBankAccountsResponse,
  GetUnblockBankAccountByUuidResponse,
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
      const expectedPath = `/user/bank-account/unblock`;
      const expectedBody = { currency: Currency.EURO };
      const expectedConfig = {
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      const uuid = faker.datatype.uuid();
      const iban = faker.finance.iban();
      const bic = faker.finance.bic();
      const expectedResult: CreateUnblockUserBankAccountResponse = {
        uuid,
        currency: Currency.EURO,
        iban,
        bic,
        accountNumber: '',
        sortCode: '',
      };

      const responseData = {
        uuid,
        currency: Currency.EURO,
        iban,
        bic,
        account_number: '',
        sort_code: '',
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
        currency: Currency.EURO,
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
          currency: Currency.EURO,
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
          currency: Currency.EURO,
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
          currency: Currency.EURO,
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
      const expectedPath = `/user/bank-account/unblock`;
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
          currency: Currency.EURO,
          uuid: faker.datatype.uuid(),
          iban: faker.finance.iban(),
          bic: faker.finance.bic(),
          accountNumber: faker.finance.account(),
          sortCode: faker.finance.account(),
        });
      }

      const expectedResult: GetAllunblockUserBankAccountsResponse = accounts;

      const responseData = accounts.map((item) => {
        return {
          currency: item.currency,
          iban: item.iban,
          bic: item.bic,
          sort_code: item.sortCode,
          account_number: item.accountNumber,
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
      const accountUuid = faker.datatype.uuid();
      const expectedPath = `/user/bank-account/unblock/${accountUuid}/simulate`;
      const expectedBody = { account_uuid: accountUuid, value: amount };
      const expectedConfig = {
        headers: {
          'Content-type': 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 200,
        data: null,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserFiatToCryptoService(props);

      // Act
      await service.simulateOnRamp({
        accountUuid,
        value: amount,
      });

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
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
          accountUuid: faker.datatype.uuid(),
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
          accountUuid: faker.datatype.uuid(),
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
          accountUuid: faker.datatype.uuid(),
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

  describe('getUnblockBankAccountByUuid', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange
      const uuid = faker.datatype.uuid();
      const expectedPath = `/user/bank-account/unblock/${uuid}`;
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
      const sortCode = faker.finance.account(6);

      const expectedResult: GetUnblockBankAccountByUuidResponse = {
        currency: Currency.EURO,
        uuid,
        bic,
        accountNumber,
        iban,
        sortCode,
      };
      const responseData = {
        currency: Currency.EURO,
        uuid,
        bic,
        account_number: accountNumber,
        iban,
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
      const result = await service.getUnblockBankAccountByUuid({
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
        await service.getUnblockBankAccountByUuid({ accountUuid: uuid });
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
        await service.getUnblockBankAccountByUuid({ accountUuid: uuid });
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
        await service.getUnblockBankAccountByUuid({ accountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
