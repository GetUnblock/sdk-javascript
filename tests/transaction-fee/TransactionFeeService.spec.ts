import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { SdkSettings } from '../../src/SdkSettings';
import { Currency } from '../../src/enums/Currency';
import { PaymentMethods } from '../../src/enums/PaymentMethods';
import { ProcessDirection } from '../../src/enums/ProcessDirection';
import { TransactionFeeService } from '../../src/transaction-fee/TransactionFeeService';
import {
  ApiTransactionFeeEstReqParams,
  ApiTransactionFeeEstResponse,
  TransactionFeeEstRequest,
  TransactionFeeEstResponse,
} from '../../src/transaction-fee/definitions';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('TrnsactionFeeService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;

  let paymentMethod: PaymentMethods;
  let direction: ProcessDirection;
  let inputCurrency: Currency;
  let outputCurrency: Currency;
  let amount: number;
  let axiosError: AxiosError;
  let randomError: unknown;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();

    paymentMethod = faker.helpers.arrayElement(Object.values(PaymentMethods));
    direction = faker.helpers.arrayElement(Object.values(ProcessDirection));
    inputCurrency = faker.helpers.arrayElement(Object.values(Currency));
    outputCurrency = faker.helpers.arrayElement(Object.values(Currency));
    amount = faker.datatype.number({ min: 0.01, max: 1000000, precision: 0.01 });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllUnblockUserBankAccounts', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange

      const percentageFee: number = faker.datatype.number({ min: 0, max: 100, precision: 0.01 });
      const totalAmount: number = faker.datatype.number({
        min: 0.01,
        max: 1000000,
        precision: 0.01,
      });

      const dto: TransactionFeeEstRequest = {
        paymentMethod: paymentMethod,
        direction: direction,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
        amount: amount,
      };

      const expectedPath = `/transaction-fee`;
      const expectedQueryParams: ApiTransactionFeeEstReqParams = {
        paymentMethod: paymentMethod,
        direction: direction,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
        amount: amount,
      };
      const expectedConfig = {
        params: { ...expectedQueryParams },
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: ApiTransactionFeeEstResponse = {
        percentageFee: percentageFee,
        totalAmount: totalAmount,
      };

      const expectedResult: TransactionFeeEstResponse = {
        percentageFee: percentageFee,
        totalAmount: totalAmount,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new TransactionFeeService(props);

      // Act
      const result = await service.getTransactionFeeEstimation(dto);

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const dto: TransactionFeeEstRequest = {
        paymentMethod: paymentMethod,
        direction: direction,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
        amount: amount,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new TransactionFeeService(props);

      // Act
      try {
        await service.getTransactionFeeEstimation(dto);
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
      const dto: TransactionFeeEstRequest = {
        paymentMethod: paymentMethod,
        direction: direction,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
        amount: amount,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      const service = new TransactionFeeService(props);

      // Act
      try {
        await service.getTransactionFeeEstimation(dto);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
