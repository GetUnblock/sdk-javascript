import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { SdkSettings, UserSessionData } from '../../src/definitions';
import { Chain } from '../../src/enums/Chain';
import { OfframpService } from '../../src/offramp/OfframpService';
import {
  GetUserOfframpAddressResponse,
  GetUserOfframpAddressResponseData,
} from '../../src/offramp/definitions';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('OfframpService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  let userUuid: string;
  let unblockSessionId: string;

  let userSessionData: UserSessionData;
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

    userUuid = faker.datatype.uuid();
    unblockSessionId = faker.datatype.uuid();

    userSessionData = {
      userUuid: userUuid,
      unblockSessionId: unblockSessionId,
    };

    chain = faker.helpers.arrayElement(Object.values(Chain));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUserOfframpAddress', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange
      const addresses = Array.from(
        { length: faker.datatype.number({ min: 1, max: 5 }) },
        addressMock,
      );
      console.log(addresses);
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

      const service = new OfframpService(props);

      // Act
      const result = await service.getUserOfframpAddress({ ...userSessionData, chain: chain });

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

      const service = new OfframpService(props);

      // Act
      try {
        await service.getUserOfframpAddress({ ...userSessionData, chain: chain });
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

      const service = new OfframpService(props);

      // Act
      try {
        await service.getUserOfframpAddress({ ...userSessionData, chain: chain });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
