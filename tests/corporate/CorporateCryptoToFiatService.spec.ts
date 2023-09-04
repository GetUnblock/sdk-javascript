import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Chain } from '../../src';
import { SdkSettings } from '../../src/SdkSettings';
import { CorporateCryptoToFiatService } from '../../src/corporate/crypto-to-fiat/CorporateCryptoToFiatService';
import {
  CreateCorporateRemoteBankAccountRequest,
  CreateCorporateRemoteBankAccountResponse,
  GetCorporateRemoteBankAccountDetailsResponse,
  GetCorporateUnblockWalletResponse,
} from '../../src/corporate/crypto-to-fiat/definitions';
import { Currency } from '../../src/enums/Currency';
import { UserSessionDataNotSetError } from '../../src/errors';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('CorporateCryptoToFiatService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let axiosClient: AxiosInstance;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let props: SdkSettings;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let axiosError: AxiosError;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const corporateUuid = faker.datatype.uuid();

  describe('getCorporateUnblockWallet', () => {
    // Happy
    it('Should call axios get method with expected params and return the expected response', async () => {
      const address = faker.finance.ethereumAddress();
      const chain = Chain.POLYGON;

      const expectedResult: GetCorporateUnblockWalletResponse = {
        chain,
        address,
      };
      const responseData = expectedResult;
      const expectedPath = `/corporate/${corporateUuid}/wallet/${chain}`;
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

      const service = new CorporateCryptoToFiatService(props);

      // Act
      const result = await service.getCorporateUnblockWallet({ corporateUuid, chain });

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('Should throw an erorr if session data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMessage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateCryptoToFiatService(props);

      // Act
      try {
        await service.getCorporateUnblockWallet({ corporateUuid, chain: Chain.POLYGON });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMessage);
    });
  });

  describe('createCorporateRemoteBankAccount', () => {
    // Happy
    it('Should call axios with correct method, path, body and config', async () => {
      // Arrange
      const expectedPath = `/corporate/${corporateUuid}/bank-account/remote`;

      const accountNumber = faker.finance.account();
      const sortCode = faker.finance.account();
      const gbpRequest: CreateCorporateRemoteBankAccountRequest = {
        accountName: faker.finance.accountName(),
        corporateUuid,
        mainRemoteBankAccount: true,
        accountDetails: {
          currency: Currency.GBP,
          accountNumber,
          sortCode,
        },
      };

      const expectedBody = {
        account_name: gbpRequest.accountName,
        main_beneficiary: gbpRequest.mainRemoteBankAccount,
        account_details: {
          currency: Currency.GBP,
          account_number: accountNumber,
          sort_code: sortCode,
        },
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const expectedResponse: CreateCorporateRemoteBankAccountResponse = {
        uuid: faker.datatype.uuid(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 201,
        data: expectedResponse,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new CorporateCryptoToFiatService(props);

      // Act
      const response = await service.createCorporateRemoteBankAccount(gbpRequest);

      //Assert
      expect(response.uuid).toBe(expectedResponse.uuid);
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
    });

    // Sad
    it('Should throw expected error if user session is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const gbpRequest: CreateCorporateRemoteBankAccountRequest = {
        accountName: faker.finance.accountName(),
        corporateUuid,
        mainRemoteBankAccount: true,
        accountDetails: {
          currency: Currency.GBP,
          accountNumber: faker.finance.account(),
          sortCode: faker.finance.account(),
        },
      };
      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateCryptoToFiatService(props);

      // Act

      try {
        await service.createCorporateRemoteBankAccount(gbpRequest);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getCorporateRemoteBankAccounts', () => {
    // Happy
    it('Should call axios with correct method, path and config', async () => {
      // Arrange
      const expectedPath = `/corporate/${corporateUuid}/bank-account/remote`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({
        status: 200,
        data: [],
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new CorporateCryptoToFiatService(props);

      // Act
      await service.getCorporateRemoteBankAccounts({ corporateUuid });

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    // Sad
    it('Should throw expected error if session is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateCryptoToFiatService(props);

      // Act

      try {
        await service.getCorporateRemoteBankAccounts({ corporateUuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('updateCorporateRemoteBankAccount', () => {
    // Happy
    it('Shoud call axios with correct method, path and config', async () => {
      const expectedPath = `/corporate/${corporateUuid}/bank-account/remote`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const randomUuid = faker.datatype.uuid();
      const expectedBody = {
        remote_bank_account_uuid: randomUuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockResolvedValueOnce({
        status: 200,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new CorporateCryptoToFiatService(props);

      //Act
      await service.updateCorporateMainRemoteBankAccount({
        corporateUuid,
        remoteBankAccountUuid: randomUuid,
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
    it('Should throw expected error if user session is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateCryptoToFiatService(props);

      // Act

      try {
        await service.updateCorporateMainRemoteBankAccount({
          corporateUuid,
          remoteBankAccountUuid: faker.datatype.uuid(),
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getCorporateRemoteBankAccountDetails', () => {
    // Happy
    it('Should call axios with the correct method path and config', async () => {
      const randomUuid = faker.datatype.uuid();
      const expectedPath = `/corporate/${corporateUuid}/bank-account/remote/${randomUuid}`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const expectedResponse: GetCorporateRemoteBankAccountDetailsResponse = {
        uuid: randomUuid,
        iban: faker.finance.iban(),
        bic: faker.finance.bic(),
        accountNumber: faker.finance.account(),
        sortCode: faker.finance.account(),
        mainBeneficiary: true,
        currency: Currency.EURO,
      };
      const axiosResponse = {
        uuid: randomUuid,
        iban: expectedResponse.iban,
        bic: expectedResponse.bic,
        account_number: expectedResponse.accountNumber,
        sort_code: expectedResponse.sortCode,
        main_beneficiary: true,
        currency: Currency.EURO,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({
        status: 200,
        data: axiosResponse,
      });

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new CorporateCryptoToFiatService(props);

      // Act
      const response = await service.getCorporateRemoteBankAccountDetails({
        corporateUuid,
        remoteBankAccountUuid: randomUuid,
      });

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    // Sad
    it('Should throw expected error if user session is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateCryptoToFiatService(props);

      // Act
      try {
        await service.getCorporateRemoteBankAccountDetails({
          corporateUuid,
          remoteBankAccountUuid: faker.datatype.uuid(),
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
