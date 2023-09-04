import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from '../../../src/SdkSettings';
import { Chain } from '../../../src/enums/Chain';
import Country from '../../../src/enums/Country';
import { InvalidAccountDetailsError, UserSessionDataNotSetError } from '../../../src/errors';
import { UserCryptoToFiatService } from '../../../src/user/crypto-to-fiat/UserCryptoToFiatService';
import {
  CreateRemoteUserBankAccountRequest,
  CreateRemoteUserBankAccountResponse,
  GetAllRemoteBankAccountsResponse,
  GetRemoteBankAccountByUuidResponse,
  GetUserOfframpAddressResponse,
  GetUserOfframpAddressResponseData,
  UnblockCreateRemoteUserBankAccount,
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
  let firstName: string;
  let lastName: string;
  let bic: string;
  let createdAt: string;
  let updatedAt: string;
  let bankName: string;
  let uuid: string;

  let chain: Chain;

  const message = 'User offramp address pulled';
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
    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    bic = faker.finance.bic();
    createdAt = faker.date.recent().toDateString();
    updatedAt = createdAt;
    bankName = faker.company.name();
    uuid = faker.datatype.uuid();

    chain = faker.helpers.arrayElement(Object.values(Chain));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const accountDetailsGbp = {
    currency: faker.finance.currencyCode(),
    accountNumber: faker.finance.account(),
    sortCode: faker.finance.account(),
  };

  const accountDetailsEur = {
    currency: faker.finance.currencyCode(),
    iban: faker.finance.iban(),
  };

  const dtoGbp: CreateRemoteUserBankAccountRequest = {
    accountName: faker.finance.accountName(),
    accountCountry: faker.address.countryCode() as Country,
    beneficiaryCountry: faker.address.countryCode(),
    mainBeneficiary: faker.datatype.boolean(),
    accountDetails: accountDetailsGbp,
  };

  const dtoEur: CreateRemoteUserBankAccountRequest = {
    accountName: faker.finance.accountName(),
    accountCountry: faker.address.countryCode() as Country,
    beneficiaryCountry: faker.address.countryCode(),
    mainBeneficiary: faker.datatype.boolean(),
    accountDetails: accountDetailsGbp,
  };

  const bodyAccountDetailsGbp = {
    currency: accountDetailsGbp.currency,
    account_number: accountDetailsGbp.accountNumber,
    sort_code: accountDetailsGbp.sortCode,
  };

  const bodyAccountDetailsEur = {
    currency: accountDetailsEur.currency,
    iban: accountDetailsEur.iban,
  };

  const bodyGbp: UnblockCreateRemoteUserBankAccount = {
    account_name: dtoGbp.accountName,
    account_country: dtoGbp.accountCountry,
    beneficiary_country: dtoGbp.beneficiaryCountry,
    main_beneficiary: dtoGbp.mainBeneficiary,
    account_details: bodyAccountDetailsGbp,
  };

  const bodyEur: UnblockCreateRemoteUserBankAccount = {
    account_name: dtoEur.accountName,
    account_country: dtoEur.accountCountry,
    beneficiary_country: dtoEur.beneficiaryCountry,
    main_beneficiary: dtoEur.mainBeneficiary,
    account_details: bodyAccountDetailsEur,
  };

  describe('getUserOfframpAddress', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange
      const addresses = Array.from(
        { length: faker.datatype.number({ min: 1, max: 5 }) },
        addressMock,
      );

      const expectedResult: GetUserOfframpAddressResponse = {
        message: message,
        addresses: addresses,
      };

      const responseData: GetUserOfframpAddressResponseData = {
        message: message,
        addresses: addresses,
      };
      const expectedPath = `/user/${userUuid}/wallet/${chain}`;
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
      const result = await service.getUserOfframpAddress({ chain: chain });

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
        await service.getUserOfframpAddress({ chain: chain });
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
        await service.getUserOfframpAddress({ chain: chain });
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
        await service.getUserOfframpAddress({ chain: chain });
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
      const expectedPath = `/user/${userUuid}/bank-account/remote`;
      const expectedBody = bodyGbp;
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
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
        firstName: firstName,
        lastName: lastName,
        currency: accountDetailsGbp.currency,
        mainBeneficiary: dtoGbp.mainBeneficiary,
        iban: '',
        bic: bic,
        accountNumber: accountDetailsGbp.accountNumber,
        createdAt: createdAt,
        updatedAt: updatedAt,
        accountName: dtoGbp.accountName,
        bankName: bankName,
        uuid: uuid,
        sortCode: accountDetailsGbp.sortCode,
      };

      const responseData: UnblockRemoteUserBankAccount = {
        first_name: firstName,
        last_name: lastName,
        currency: bodyAccountDetailsGbp.currency,
        main_beneficiary: bodyGbp.main_beneficiary,
        iban: '',
        bic: bic,
        account_number: bodyAccountDetailsGbp.account_number,
        created_at: createdAt,
        updated_at: updatedAt,
        account_name: bodyGbp.account_name,
        bank_name: bankName,
        uuid: uuid,
        sort_code: bodyAccountDetailsGbp.sort_code,
      };

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
        firstName: firstName,
        lastName: lastName,
        currency: accountDetailsEur.currency,
        mainBeneficiary: dtoEur.mainBeneficiary,
        iban: accountDetailsEur.iban,
        bic: bic,
        accountNumber: '',
        createdAt: createdAt,
        updatedAt: updatedAt,
        accountName: dtoEur.accountName,
        bankName: bankName,
        uuid: uuid,
        sortCode: '',
      };

      const responseData: UnblockRemoteUserBankAccount = {
        first_name: firstName,
        last_name: lastName,
        currency: bodyAccountDetailsEur.currency,
        main_beneficiary: bodyEur.main_beneficiary,
        iban: bodyAccountDetailsEur.iban,
        bic: bic,
        account_number: '',
        created_at: createdAt,
        updated_at: updatedAt,
        account_name: bodyEur.account_name,
        bank_name: bankName,
        uuid: uuid,
        sort_code: '',
      };

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

    it('should throw invalid account details error', async () => {
      // Arrange
      const invalidDto = {
        ...dtoEur,
        accountDetails: {
          invalidProperty: '',
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce('');

      const expectedErrorMesage = `Bad request: ${new InvalidAccountDetailsError()}`;
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
      const expectedPath = `/user/${userUuid}/bank-account/remote`;
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

      const expectedResponse: GetAllRemoteBankAccountsResponse[] = [
        {
          firstName: firstName,
          lastName: lastName,
          currency: accountDetailsEur.currency,
          mainBeneficiary: dtoEur.mainBeneficiary,
          iban: accountDetailsEur.iban,
          bic: bic,
          accountNumber: '',
          createdAt: createdAt,
          updatedAt: updatedAt,
          accountName: dtoEur.accountName,
          bankName: bankName,
          uuid: uuid,
          sortCode: '',
        },
        {
          firstName: firstName,
          lastName: lastName,
          currency: accountDetailsGbp.currency,
          mainBeneficiary: dtoGbp.mainBeneficiary,
          iban: '',
          bic: bic,
          accountNumber: accountDetailsGbp.accountNumber,
          createdAt: createdAt,
          updatedAt: updatedAt,
          accountName: dtoGbp.accountName,
          bankName: bankName,
          uuid: uuid,
          sortCode: accountDetailsGbp.sortCode,
        },
      ];

      const responseData: UnblockRemoteUserBankAccount[] = [
        {
          first_name: firstName,
          last_name: lastName,
          currency: bodyAccountDetailsEur.currency,
          main_beneficiary: bodyEur.main_beneficiary,
          iban: bodyAccountDetailsEur.iban,
          bic: bic,
          account_number: '',
          created_at: createdAt,
          updated_at: updatedAt,
          account_name: bodyEur.account_name,
          bank_name: bankName,
          uuid: uuid,
          sort_code: '',
        },
        {
          first_name: firstName,
          last_name: lastName,
          currency: bodyAccountDetailsGbp.currency,
          main_beneficiary: bodyGbp.main_beneficiary,
          iban: '',
          bic: bic,
          account_number: bodyAccountDetailsGbp.account_number,
          created_at: createdAt,
          updated_at: updatedAt,
          account_name: bodyGbp.account_name,
          bank_name: bankName,
          uuid: uuid,
          sort_code: bodyAccountDetailsGbp.sort_code,
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
      const expectedPath = `/user/${userUuid}/bank-account/remote`;
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const expectedBody = {
        account_uuid: uuid,
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
        accountUuid: uuid,
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
        await service.changeMainUserRemoteBankAccount({ accountUuid: uuid });
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
        await service.changeMainUserRemoteBankAccount({ accountUuid: uuid });
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
        await service.changeMainUserRemoteBankAccount({ accountUuid: uuid });
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
      const expectedPath = `/user/${userUuid}/bank-account/remote/${uuid}`;
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
      await service.getRemoteBankAccountByUuid({ accountUuid: uuid });

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenCalledWith(expectedPath, expectedConfig);
    });

    it('should return a remote bank account', async () => {
      // Arrange

      const expectedResponse: GetRemoteBankAccountByUuidResponse = {
        firstName: firstName,
        lastName: lastName,
        currency: accountDetailsGbp.currency,
        mainBeneficiary: dtoGbp.mainBeneficiary,
        iban: '',
        bic: bic,
        accountNumber: accountDetailsGbp.accountNumber,
        createdAt: createdAt,
        updatedAt: updatedAt,
        accountName: dtoGbp.accountName,
        bankName: bankName,
        uuid: uuid,
        sortCode: accountDetailsGbp.sortCode,
      };

      const responseData: UnblockRemoteUserBankAccount = {
        first_name: firstName,
        last_name: lastName,
        currency: bodyAccountDetailsGbp.currency,
        main_beneficiary: bodyGbp.main_beneficiary,
        iban: '',
        bic: bic,
        account_number: bodyAccountDetailsGbp.account_number,
        created_at: createdAt,
        updated_at: updatedAt,
        account_name: bodyGbp.account_name,
        bank_name: bankName,
        uuid: uuid,
        sort_code: bodyAccountDetailsGbp.sort_code,
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
        accountUuid: uuid,
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
        await service.getRemoteBankAccountByUuid({ accountUuid: uuid });
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
        await service.getRemoteBankAccountByUuid({ accountUuid: uuid });
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
        await service.getRemoteBankAccountByUuid({ accountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
