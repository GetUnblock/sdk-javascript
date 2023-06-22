import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from '../../src/definitions';
import { RemoteBankAccountService } from '../../src/remote-bank-account/RemoteBankAccountService';
import {
  RemoteUserBankAccountRequest,
  RemoteUserBankAccountResponse,
  UnblockCreateRemoteUserBankAccount,
  UnblockRemoteUserBankAccount,
} from '../../src/remote-bank-account/definitions';

describe('RemoteBankAccountService', () => {
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

  const userUuid = faker.datatype.uuid();
  const unblockSessionID = faker.datatype.uuid();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const bic = faker.finance.bic();
  const createdAt = faker.date.recent().toDateString();
  const updatedAt = createdAt;
  const bankName = faker.company.name();
  const uuid = faker.datatype.uuid();

  const accountDetailsGbp = {
    currency: faker.finance.currencyCode(),
    accountNumber: faker.finance.account(),
    sortCode: faker.finance.account(),
  };

  const accountDetailsEur = {
    currency: faker.finance.currencyCode(),
    iban: faker.finance.iban(),
  };

  const dtoGbp: RemoteUserBankAccountRequest = {
    userUuid: userUuid,
    unblockSessionID: unblockSessionID,
    accountName: faker.finance.accountName(),
    accountCountry: faker.address.countryCode(),
    beneficiaryCountry: faker.address.countryCode(),
    mainBeneficiary: faker.datatype.boolean(),
    accountDetails: accountDetailsGbp,
  };

  const dtoEur: RemoteUserBankAccountRequest = {
    userUuid: userUuid,
    unblockSessionID: unblockSessionID,
    accountName: faker.finance.accountName(),
    accountCountry: faker.address.countryCode(),
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

  const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
    status: 500,
    data: {
      [faker.random.word()]: faker.datatype.string,
    },
  } as AxiosResponse);

  const randomError = {
    [faker.random.word()]: faker.datatype.string,
  };

  describe('createRemoteUserBankAccount', () => {
    // Happy
    it('should call axios with correct path, doby and config', async () => {
      // Arrange
      const expectedPath = `/user/${userUuid}/bank-account/remote`;
      const expectedBody = bodyGbp;
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionID,
        },
      };

      let resultedPath, resultedBody, resultedConfig;

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockImplementationOnce((path, body, config) => {
        resultedBody = body;
        resultedConfig = config;
        resultedPath = path;

        const axiosResponse = {
          data: '',
        } as AxiosResponse<any>;

        return Promise.resolve(axiosResponse);
      });

      // Act
      const service = new RemoteBankAccountService(props);
      await service.createRemoteUserBankAccount(dtoGbp);

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(resultedPath).toBe(expectedPath);
      expect(resultedBody).toStrictEqual(expectedBody);
      expect(resultedConfig).toStrictEqual(expectedConfig);
    });

    it('should return created bank account data for GBP currency', async () => {
      // Arrange
      const expectedResponse: RemoteUserBankAccountResponse = {
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

      // Act
      const service = new RemoteBankAccountService(props);
      const result = await service.createRemoteUserBankAccount(dtoGbp);

      // Assert
      expect(result).toStrictEqual(expectedResponse);
    });

    it('should return created bank account data for EUR currency', async () => {
      // Arrange
      const expectedResponse: RemoteUserBankAccountResponse = {
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

      // Act
      const service = new RemoteBankAccountService(props);
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
      let expectedError;

      // Act
      const service = new RemoteBankAccountService(props);

      try {
        await service.createRemoteUserBankAccount(dtoEur);
      } catch (error) {
        expectedError = error;
      }

      // Assert
      expect(expectedError).toBeInstanceOf(Error);
      expect((expectedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let expectedError;

      // Act
      const service = new RemoteBankAccountService(props);

      try {
        await service.createRemoteUserBankAccount(dtoEur);
      } catch (error) {
        expectedError = error;
      }

      // Assert
      expect(expectedError).toBeInstanceOf(Error);
      expect((expectedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getAllremoteBankAccounts', () => {
    //Happy
    //Sad
  });

  describe('changeMainUserRemoteBankAccount', () => {
    //Happy
    //Sad
  });

  describe('getRemoteBankAccountByUuid', () => {
    //Happy
    //Sad
  });
});
