import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Country from 'src/enums/Country';
import { SdkSettings, UserSessionData } from '../../src/definitions';
import { RemoteBankAccountService } from '../../src/remote-bank-account/RemoteBankAccountService';
import {
  CreateRemoteUserBankAccountRequest,
  CreateRemoteUserBankAccountResponse,
  GetAllRemoteBankAccountsResponse,
  GetRemoteBankAccountByUuidResponse,
  UnblockCreateRemoteUserBankAccount,
  UnblockRemoteUserBankAccount,
} from '../../src/remote-bank-account/definitions';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('RemoteBankAccountService', () => {
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

  const userUuid = faker.datatype.uuid();
  const unblockSessionId = faker.datatype.uuid();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const bic = faker.finance.bic();
  const createdAt = faker.date.recent().toDateString();
  const updatedAt = createdAt;
  const bankName = faker.company.name();
  const uuid = faker.datatype.uuid();

  const userSessionData: UserSessionData = {
    unblockSessionId: unblockSessionId,
    userUuid: userUuid,
  };

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
    userUuid: userUuid,
    unblockSessionId: unblockSessionId,
    accountName: faker.finance.accountName(),
    accountCountry: faker.address.countryCode() as Country,
    beneficiaryCountry: faker.address.countryCode(),
    mainBeneficiary: faker.datatype.boolean(),
    accountDetails: accountDetailsGbp,
  };

  const dtoEur: CreateRemoteUserBankAccountRequest = {
    userUuid: userUuid,
    unblockSessionId: unblockSessionId,
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

      const service = new RemoteBankAccountService(props);

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

      const service = new RemoteBankAccountService(props);

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

      const service = new RemoteBankAccountService(props);

      // Act
      const result = await service.createRemoteUserBankAccount(dtoEur);

      // Assert
      expect(result).toStrictEqual(expectedResponse);
    });

    // Sad
    it('should throw expected Axios error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new RemoteBankAccountService(props);

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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new RemoteBankAccountService(props);

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

      const expectedErrorMesage = 'Invalid account details';
      let resultedError;

      const service = new RemoteBankAccountService(props);

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

      const service = new RemoteBankAccountService(props);

      // Act
      await service.getAllRemoteBankAccounts(userSessionData);

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    it('should return an array of remote bank accounts', async () => {
      // Arrange

      const expectedResponse: GetAllRemoteBankAccountsResponse = [
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

      const service = new RemoteBankAccountService(props);

      // Act
      const result = await service.getAllRemoteBankAccounts(userSessionData);

      // Assert
      expect(result).toStrictEqual(expectedResponse);
    });

    // Sad
    it('should throw expected Axios error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new RemoteBankAccountService(props);

      // Act

      try {
        await service.getAllRemoteBankAccounts(userSessionData);
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new RemoteBankAccountService(props);

      // Act

      try {
        await service.getAllRemoteBankAccounts(userSessionData);
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

      const service = new RemoteBankAccountService(props);

      // Act
      await service.changeMainUserRemoteBankAccount({
        ...userSessionData,
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
    it('should throw expected Axios error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new RemoteBankAccountService(props);

      // Act

      try {
        await service.changeMainUserRemoteBankAccount({ ...userSessionData, accountUuid: uuid });
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new RemoteBankAccountService(props);

      // Act

      try {
        await service.changeMainUserRemoteBankAccount({ ...userSessionData, accountUuid: uuid });
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

      const service = new RemoteBankAccountService(props);

      // Act
      await service.getRemoteBankAccountByUuid({ ...userSessionData, accountUuid: uuid });

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

      const service = new RemoteBankAccountService(props);

      // Act
      const result = await service.getRemoteBankAccountByUuid({
        ...userSessionData,
        accountUuid: uuid,
      });

      // Assert
      expect(result).toStrictEqual(expectedResponse);
    });

    // Sad
    it('should throw expected Axios error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new RemoteBankAccountService(props);

      // Act

      try {
        await service.getRemoteBankAccountByUuid({ ...userSessionData, accountUuid: uuid });
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new RemoteBankAccountService(props);

      // Act

      try {
        await service.getRemoteBankAccountByUuid({ ...userSessionData, accountUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
