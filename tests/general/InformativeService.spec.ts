import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  Currency,
  ExchangeRatesServiceRequest,
  ExchangeRatesServiceResponse,
  PaymentMethods,
  ProcessDirection,
  Token,
  TransactionFeeEstRequest,
  TransactionFeeEstResponse,
} from '../../src';
import { SdkSettings } from '../../src/SdkSettings';
import { InputAndOutputCurrencyMustBeOfDifferentTypeError } from '../../src/errors';
import { InformativeService } from '../../src/general/informative/InformativeService';
import {
  ApiTransactionFeeEstRequest,
  ApiTransactionFeeEstResponse,
} from '../../src/general/informative/definitions';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('InformativeService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  const paymentMethod: PaymentMethods = PaymentMethods.BANK_TRANSFER;
  const direction: ProcessDirection = ProcessDirection.fiatToCrypto;
  const inputCurrency: Currency | Token = Currency.EURO;
  const outputCurrency: Currency | Token = Token.USDC;
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

  describe('getExchangeRate', () => {
    // Happy
    it('Should call axios GET with expected headers and parameters', async () => {
      // Arrange

      const params: ExchangeRatesServiceRequest = {
        baseCurrency: faker.helpers.arrayElement(Object.values(Currency)),
        targetCurrency: faker.helpers.arrayElement(Object.values(Currency)),
      };

      const expectedResponse: ExchangeRatesServiceResponse = {
        exchangeRate: faker.datatype.number({ min: 0.5, max: 1.5, precision: 0.00001 }),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: {
          exchange_rate: expectedResponse.exchangeRate,
        },
      } as AxiosResponse<{
        exchange_rate: number;
      }>);

      const expectedPath = '/exchange-rates';

      const expectedConfig = {
        headers: {
          accept: 'application/json',
        },
        params: {
          base_currency: params.baseCurrency,
          target_currency: params.targetCurrency,
        },
      };

      const service = new InformativeService(props);

      // Act
      const response = await service.getExchangeRate(params);

      // Assert
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(response).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw expected error when GET call in emailSession has an Axios Error', async () => {
      // Arrange

      const params: ExchangeRatesServiceRequest = {
        baseCurrency: faker.helpers.arrayElement(Object.values(Currency)),
        targetCurrency: faker.helpers.arrayElement(Object.values(Currency)),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new InformativeService(props);
      let resultedError;

      // Act
      try {
        await service.getExchangeRate(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when GET call in emailSession has an Unexpected Error', async () => {
      // Arrange

      const params: ExchangeRatesServiceRequest = {
        baseCurrency: faker.helpers.arrayElement(Object.values(Currency)),
        targetCurrency: faker.helpers.arrayElement(Object.values(Currency)),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      const service = new InformativeService(props);
      let resultedError;

      // Act
      try {
        await service.getExchangeRate(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getTransactionFeeEstimation', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange

      const unblockFee: number = faker.datatype.number({ min: 0, max: 100, precision: 0.01 });
      const merchantFee: number = faker.datatype.number({ min: 0, max: 100, precision: 0.01 });
      const totalFee = unblockFee + merchantFee;

      const params: TransactionFeeEstRequest = {
        paymentMethod: paymentMethod,
        direction: direction,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
      };

      const expectedPath = `/fees`;
      const expectedQueryParams: ApiTransactionFeeEstRequest = {
        payment_method: paymentMethod,
        direction: direction,
        input_currency: inputCurrency,
        output_currency: outputCurrency,
      };
      const expectedConfig = {
        params: { ...expectedQueryParams },
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: ApiTransactionFeeEstResponse = {
        unblock_fee: unblockFee,
        merchant_fee: {
          type: 'add',
          amount: merchantFee,
        },
        total_fee_percentage: totalFee,
      };

      const expectedResult: TransactionFeeEstResponse = {
        unblockFee: unblockFee,
        merchantFee: {
          type: 'add',
          amount: merchantFee,
        },
        totalFeePercentage: totalFee,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new InformativeService(props);

      // Act
      const result = await service.getTransactionFeeEstimation(params);

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('Should throw expected error when input and output currencies are of the same type', async () => {
      // Arrange
      const params: TransactionFeeEstRequest = {
        paymentMethod,
        direction,
        inputCurrency: Currency.EURO,
        outputCurrency: Currency.GBP,
      };

      const expectedError = new InputAndOutputCurrencyMustBeOfDifferentTypeError(
        Currency.EURO,
        Currency.GBP,
      );
      const expectedErrorMessage = `Bad request: ${expectedError}`;
      let resultedError;

      const service = new InformativeService(props);

      // Act
      try {
        await service.getTransactionFeeEstimation(params);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMessage);
    });

    // Sad
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const params: TransactionFeeEstRequest = {
        paymentMethod: paymentMethod,
        direction: direction,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new InformativeService(props);

      // Act
      try {
        await service.getTransactionFeeEstimation(params);
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
      const params: TransactionFeeEstRequest = {
        paymentMethod: paymentMethod,
        direction: direction,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      const service = new InformativeService(props);

      // Act
      try {
        await service.getTransactionFeeEstimation(params);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
