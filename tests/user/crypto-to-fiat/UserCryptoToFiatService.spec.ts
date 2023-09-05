import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Currency } from '../../../src';
import { SdkSettings } from '../../../src/SdkSettings';
import { Chain } from '../../../src/enums/Chain';
import { CurrencyNotSupportedError, UserSessionDataNotSetError } from '../../../src/errors';
import { UserCryptoToFiatService } from '../../../src/user/crypto-to-fiat/UserCryptoToFiatService';
import {
  CreateRemoteUserBankAccountRequest,
  CreateRemoteUserBankAccountResponse,
  EurAccountDetails,
  GbpAccountDetails,
  GetAllRemoteBankAccountsResponse,
  GetRemoteBankAccountByUuidResponse,
  GetUserUnblockWalletResponse,
  GetUserUnblockWalletResponseData,
  UnblockRemoteUserBankAccount,
} from '../../../src/user/crypto-to-fiat/definitions';
import { axiosErrorMock, randomErrorMock } from '../../mocks/errors.mock';
import { propsMock } from '../../mocks/props.mock';

describe('UserCryptoToFiatService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;
  let userSessionDataNotSetError: UserSessionDataNotSetError;

  let userUuid: string;
  let unblockSessionId: string;
  let bic: string;
  let uuid: string;

  let chain: Chain;

  const addressMock = (): string => {
    return faker.datatype.hexadecimal({ length: 42 });
  };

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
    bic = faker.finance.bic();
    uuid = faker.datatype.uuid();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const dtoGbp: CreateRemoteUserBankAccountRequest = {
    accountName: faker.finance.accountName(),
    mainBeneficiary: faker.datatype.boolean(),
    accountDetails: {
      currency: Currency.GBP,
      accountNumber: faker.finance.account(),
      sortCode: faker.finance.account(),
    },
  };

  const dtoEur: CreateRemoteUserBankAccountRequest = {
    accountName: faker.finance.accountName(),
    mainBeneficiary: faker.datatype.boolean(),
    accountDetails: {
      currency: Currency.EURO,
      iban: faker.finance.iban(),
    },
  };

  describe('getUserOfframpAddress', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange
      const chain = Chain.POLYGON;
      const address = addressMock();
      const expectedResult: GetUserUnblockWalletResponse = [
        {
          chain,
          address,
        },
      ];

      const responseData: GetUserUnblockWalletResponseData = [
        {
          chain,
          address,
        },
      ];
      const expectedPath = `/user/wallet/${chain}`;
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

      const service = new UserCryptoToFiatService(props);

      // Act
      const result = await service.getUserUnblockWallet({ chain: chain });

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

      const service = new UserCryptoToFiatService(props);

      // Act
      try {
        await service.getUserUnblockWallet({ chain: chain });
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

      const service = new UserCryptoToFiatService(props);

      // Act
      try {
        await service.getUserUnblockWallet({ chain: chain });
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

      const service = new UserCryptoToFiatService(props);

      // Act
      try {
        await service.getUserUnblockWallet({ chain: chain });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('createRemoteUserBankAccount', () => {
    // Happy
    it('should call axios with correct method, path, body and config', async () => {
      // Arrange
      const expectedPath = `/user/bank-account/remote`;
      const expectedBody = {
        account_name: dtoGbp.accountName,
        main_beneficiary: dtoGbp.mainBeneficiary,
        account_details: {
          currency: dtoGbp.accountDetails.currency,
          account_number: (dtoGbp.accountDetails as GbpAccountDetails).accountNumber,
          sort_code: (dtoGbp.accountDetails as GbpAccountDetails).sortCode,
        },
      };
      const expectedConfig = {
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        status: 200,
        data: '',
      } as AxiosResponse<any>);

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act
      await service.createRemoteUserBankAccount(dtoGbp);

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
    });

    it('should return created bank account data for GBP currency', async () => {
      // Arrange
      const expectedResponse: CreateRemoteUserBankAccountResponse = {
        uuid,
      };

      const responseData = expectedResponse;

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        data: responseData,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act
      const result = await service.createRemoteUserBankAccount(dtoGbp);

      // Assert
      expect(result).toStrictEqual(expectedResponse);
    });

    it('should return created bank account data for EUR currency', async () => {
      // Arrange
      const expectedResponse: CreateRemoteUserBankAccountResponse = {
        uuid,
      };

      const responseData = expectedResponse;

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        data: responseData,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act
      const result = await service.createRemoteUserBankAccount(dtoEur);

      // Assert
      expect(result).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.createRemoteUserBankAccount(dtoEur);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected Axios error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.createRemoteUserBankAccount(dtoEur);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.createRemoteUserBankAccount(dtoEur);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw invalid account details error if currency is not present or not supported', async () => {
      // Arrange
      const invalidDto = {
        ...dtoEur,
        accountDetails: {
          invalidProperty: '',
          currency: 'XOF',
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce('');

      const expectedErrorMesage = `Bad request: ${new CurrencyNotSupportedError('XOF')}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.createRemoteUserBankAccount(
          invalidDto as unknown as CreateRemoteUserBankAccountRequest,
        );
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.post).not.toHaveBeenCalled();
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getAllRemoteBankAccounts', () => {
    // Happy
    it('should call axios with correct method, path, body and config', async () => {
      // Arrange
      const expectedPath = `/user/bank-account/remote`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        status: 200,
        data: [],
      } as AxiosResponse<any>);

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act
      await service.getAllRemoteBankAccounts();

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    it('should return an array of remote bank accounts', async () => {
      // Arrange

      const expectedResponse: GetAllRemoteBankAccountsResponse = [
        {
          currency: Currency.EURO,
          mainBeneficiary: dtoEur.mainBeneficiary,
          iban: (dtoEur.accountDetails as EurAccountDetails).iban,
          bic: bic,
          accountNumber: '',
          sortCode: '',
          uuid: uuid,
        },
        {
          currency: Currency.GBP,
          mainBeneficiary: dtoGbp.mainBeneficiary,
          accountNumber: (dtoGbp.accountDetails as GbpAccountDetails).accountNumber,
          uuid: uuid,
          iban: '',
          bic: '',
          sortCode: (dtoGbp.accountDetails as GbpAccountDetails).sortCode,
        },
      ];

      const responseData: UnblockRemoteUserBankAccount[] = [
        {
          currency: Currency.EURO,
          main_beneficiary: dtoEur.mainBeneficiary,
          iban: (dtoEur.accountDetails as EurAccountDetails).iban,
          bic: bic,
          account_number: '',
          uuid: uuid,
          sort_code: '',
        },
        {
          currency: Currency.GBP,
          main_beneficiary: dtoGbp.mainBeneficiary,
          iban: '',
          bic: '',
          account_number: (dtoGbp.accountDetails as GbpAccountDetails).accountNumber,
          uuid: uuid,
          sort_code: (dtoGbp.accountDetails as GbpAccountDetails).sortCode,
        },
      ];

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({ data: responseData });

      const service = new UserCryptoToFiatService(props);

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      // Act
      const result = await service.getAllRemoteBankAccounts();

      // Assert
      expect(result).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.getAllRemoteBankAccounts();
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected Axios error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.getAllRemoteBankAccounts();
      } catch (error) {
        resultedError = error;
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
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.getAllRemoteBankAccounts();
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('changeMainUserRemoteBankAccount', () => {
    // Happy
    it('should call axios with correct method, path, body and config', async () => {
      // Arrange
      const expectedPath = `/user/bank-account/remote`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const expectedBody = {
        remote_bank_account_uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockResolvedValue({
        status: 200,
      } as AxiosResponse<any>);

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act
      await service.changeMainUserRemoteBankAccount({
        remoteBankAccountUuid: uuid,
      });

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
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.changeMainUserRemoteBankAccount({ remoteBankAccountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected Axios error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.changeMainUserRemoteBankAccount({ remoteBankAccountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.changeMainUserRemoteBankAccount({ remoteBankAccountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getRemoteBankAccountByUuid', () => {
    // Happy
    it('should call axios with correct method, path, body and config', async () => {
      // Arrange
      const expectedPath = `/user/bank-account/remote/${uuid}`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        status: 200,
        data: '',
      } as AxiosResponse<any>);

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act
      await service.getRemoteBankAccountByUuid({ remoteBankAccountUuid: uuid });

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenCalledWith(expectedPath, expectedConfig);
    });

    it('should return a remote bank account', async () => {
      // Arrange

      const expectedResponse: GetRemoteBankAccountByUuidResponse = {
        currency: Currency.GBP,
        mainBeneficiary: dtoGbp.mainBeneficiary,
        iban: '',
        bic: bic,
        accountNumber: (dtoGbp.accountDetails as GbpAccountDetails).accountNumber,
        uuid: uuid,
        sortCode: (dtoGbp.accountDetails as GbpAccountDetails).sortCode,
      };

      const responseData: UnblockRemoteUserBankAccount = {
        currency: Currency.GBP,
        main_beneficiary: dtoGbp.mainBeneficiary,
        iban: '',
        bic: bic,
        account_number: (dtoGbp.accountDetails as GbpAccountDetails).accountNumber,
        uuid: uuid,
        sort_code: (dtoGbp.accountDetails as GbpAccountDetails).sortCode,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({ data: responseData });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act
      const result = await service.getRemoteBankAccountByUuid({
        remoteBankAccountUuid: uuid,
      });

      // Assert
      expect(result).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.getRemoteBankAccountByUuid({ remoteBankAccountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected Axios error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.getRemoteBankAccountByUuid({ remoteBankAccountUuid: uuid });
      } catch (error) {
        resultedError = error;
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
      let resultedError;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new UserCryptoToFiatService(props);

      // Act

      try {
        await service.getRemoteBankAccountByUuid({ remoteBankAccountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
