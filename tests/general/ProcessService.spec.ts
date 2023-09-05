import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Currency, ProcessDirection, Token } from '../../src';
import { SdkSettings } from '../../src/SdkSettings';
import { ProcessStatus } from '../../src/enums/ProcessStatus';
import { ProcessService } from '../../src/general/process/ProcessService';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('ProcessService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  let processUuid: string;
  let status: ProcessStatus;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
    processUuid = faker.datatype.uuid();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getOfframpProcessStatus', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange
      status = faker.helpers.arrayElement(Object.values(ProcessStatus));
      const axiosResponse = {
        status,
        user_uuid: faker.datatype.uuid(),
        direction: ProcessDirection.fiatToCrypto,
        input: {
          amount: 100,
          currency: Currency.EURO,
          transaction_id: faker.datatype.uuid(),
        },
        output: {
          amount: 110,
          currency: Token.USDC,
          transaction_id: faker.datatype.uuid(),
        },
      };
      const expectedResult = {
        status: axiosResponse.status,
        userUuid: axiosResponse.user_uuid,
        direction: axiosResponse.direction,
        input: {
          amount: axiosResponse.input.amount,
          currency: axiosResponse.input.currency,
          transactionId: axiosResponse.input.transaction_id,
        },
        output: {
          amount: axiosResponse.output.amount,
          currency: axiosResponse.output.currency,
          transactionId: axiosResponse.output.transaction_id,
        },
      };
      const expectedPath = `/process`;
      const expectedConfig = {
        params: { process_uuid: processUuid },
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({
        status: 200,
        data: axiosResponse,
      });

      const service = new ProcessService(props);

      // Act
      const result = await service.getTransactionDetails({ processUuid: processUuid });

      // Assert
      expect(axiosClient.get).toBeCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new ProcessService(props);

      // Act
      try {
        await service.getTransactionDetails({ processUuid: processUuid });
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

      const service = new ProcessService(props);

      // Act
      try {
        await service.getTransactionDetails({ processUuid: processUuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
