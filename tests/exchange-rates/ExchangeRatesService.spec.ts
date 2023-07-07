import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from '../../src/definitions';
import { Currency } from '../../src/enums/Currency';
import { ExchangeRatesService } from '../../src/exchange-rates/ExchangeRatesService';
import {
  ExchangeRatesServiceRequest,
  ExchangeRatesServiceResponse,
} from '../../src/exchange-rates/definitions';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('ExchangeRatesService', () => {
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

      const service = new ExchangeRatesService(props);

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

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new ExchangeRatesService(props);
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      const service = new ExchangeRatesService(props);
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
});
