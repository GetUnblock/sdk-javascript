import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Currency } from '../../../src';
import { SdkSettings } from '../../../src/SdkSettings';
import { CorporateFiatToCryptoService } from '../../../src/corporate/fiat-to-crypto/CorporateFiatToCryptoService';
import { CreateCorporateUnblockBankAccountResponse } from '../../../src/corporate/fiat-to-crypto/definitions';
import { UnsupportedEnvironmentError, UserSessionDataNotSetError } from '../../../src/errors';
import { axiosErrorMock, randomErrorMock } from '../../mocks/errors.mock';
import { propsMock } from '../../mocks/props.mock';
import { apiUnblockBankAccountToCamelCase } from '../../utils';
import { unblockBankAccountApiMock } from '../corporateDetails.mock';

describe('CorporateFiatToCryptoService', () => {
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
  let unsupportedEnvironmentError: UnsupportedEnvironmentError;

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
    unsupportedEnvironmentError = new UnsupportedEnvironmentError('production');

    userUuid = faker.datatype.uuid();
    unblockSessionId = faker.datatype.uuid();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const corporateUuid = faker.datatype.uuid();

  describe('createCorporateUnblockBankAccount', () => {
    // Happy
    it('Should call axios post method with expected params and return expected response', async () => {
      //  Arrange
      const expectedResult: CreateCorporateUnblockBankAccountResponse = {
        uuid: faker.datatype.uuid(),
        iban: faker.finance.iban(),
        bic: faker.finance.bic(),
        accountNumber: faker.finance.account(),
        sortCode: faker.finance.account(),
        currency: Currency.EURO,
      };
      const axiosResponse = {
        uuid: expectedResult.uuid,
        iban: expectedResult.iban,
        bic: expectedResult.bic,
        account_number: expectedResult.accountNumber,
        sort_code: expectedResult.sortCode,
        currency: expectedResult.currency,
      };
      const expectedPath = `/corporate/${corporateUuid}/bank-account/unblock`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const expectedBody = {
        currency: Currency.EURO,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 201,
        data: axiosResponse,
      });

      props.setUserSessionData({
        userUuid,
        unblockSessionId,
      });

      const service = new CorporateFiatToCryptoService(props);

      // Act
      const response = await service.createCorporateUnblockBankAccount({
        corporateUuid,
        currency: Currency.EURO,
      });

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(response).toStrictEqual(expectedResult);
    });

    // Sad
    it('Should throw an erorr if session data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMessage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateFiatToCryptoService(props);

      // Act
      try {
        await service.createCorporateUnblockBankAccount({ corporateUuid, currency: Currency.EURO });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMessage);
    });
  });

  describe('getCorporateUnblockBankAccounts', () => {
    // Happy
    it('Should call the method with expected params and return expected response', async () => {
      // Arrange
      const apiUnblockBankAccounts = [unblockBankAccountApiMock(), unblockBankAccountApiMock()];
      const expectedResponse = apiUnblockBankAccounts.map((elem) => {
        return apiUnblockBankAccountToCamelCase(elem);
      });
      const expectedPath = `/corporate/${corporateUuid}/bank-account/unblock`;
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
        data: apiUnblockBankAccounts,
      });

      props.setUserSessionData({
        userUuid,
        unblockSessionId,
      });

      const service = new CorporateFiatToCryptoService(props);

      // Act
      const response = await service.getCorporateUnblockBankAccounts({ corporateUuid });

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(response).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw an erorr if session data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMessage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateFiatToCryptoService(props);

      // Act
      try {
        await service.getCorporateUnblockBankAccounts({ corporateUuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMessage);
    });
  });

  describe('getCorporateUnblockBankAccount', () => {
    // Happy
    it('Should call the method with expected params and return expected response', async () => {
      // Arrange
      const randomUuid = faker.datatype.uuid();
      const apiUnblockBankAccount = unblockBankAccountApiMock();
      apiUnblockBankAccount.uuid = randomUuid;
      const expectedResponse = apiUnblockBankAccountToCamelCase(apiUnblockBankAccount);
      const expectedPath = `/corporate/${corporateUuid}/bank-account/unblock/${randomUuid}`;
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
        data: apiUnblockBankAccount,
      });

      props.setUserSessionData({
        userUuid,
        unblockSessionId,
      });

      const service = new CorporateFiatToCryptoService(props);

      // Act
      const response = await service.getCorporateUnblockBankAccount({
        corporateUuid,
        accountUuid: randomUuid,
      });

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(response).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw an erorr if session data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMessage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateFiatToCryptoService(props);

      // Act
      try {
        await service.getCorporateUnblockBankAccount({
          corporateUuid,
          accountUuid: faker.datatype.uuid(),
        });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMessage);
    });
  });

  describe('simulate', () => {
    // Happy
    it('Should call axios with expected params', async () => {
      // Arrange
      const accountUuid = faker.datatype.uuid();
      const value = 100;
      const expectedPath = `/corporate/${corporateUuid}/bank-account/unblock/${accountUuid}/simulate`;
      const expectedBody = {
        value,
      };
      const expectedConfig = {
        headers: {
          'Content-type': 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      props.setUserSessionData({
        userUuid,
        unblockSessionId,
      });
      props.prod = false;

      const service = new CorporateFiatToCryptoService(props);

      // Act
      await service.simulate({ corporateUuid, accountUuid, value });

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
    });

    // Sad
    it('Should throw an error if session data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMessage = `Bad request: ${userSessionDataNotSetError}`;
      let resultedError;

      const service = new CorporateFiatToCryptoService(props);

      // Act
      try {
        await service.simulate({
          corporateUuid,
          accountUuid: faker.datatype.uuid(),
          value: 100,
        });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMessage);
    });

    // Sad
    it('Should throw an error if environment is prod', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMessage = `Bad request: ${unsupportedEnvironmentError}`;
      let resultedError;

      const service = new CorporateFiatToCryptoService(props);

      props.prod = true;
      props.setUserSessionData({
        userUuid,
        unblockSessionId,
      });

      // Act
      try {
        await service.simulate({
          corporateUuid,
          accountUuid: faker.datatype.uuid(),
          value: 100,
        });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMessage);
    });
  });
});
