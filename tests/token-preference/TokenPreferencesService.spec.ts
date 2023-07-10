import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { SdkSettings, UserSessionData } from '../../src/definitions';
import { TokenPreferenceService } from '../../src/token-preference/TokenPreferenceService';
import {
  GetUserTokenPreferenceResponse,
  GetUserTokenPreferenceResponseData,
  TokenPreference,
  UpdateUserTokenPreferenceRequestBody,
  UpdateUserTokenPreferencesRequest,
  UpdateUserTokenPreferencesResponse,
  UpdateUserTokenPreferencesResponseData,
} from '../../src/token-preference/definitions';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';
import { tokenPreferencesMock } from './tokenPreferences.mock';

describe('TokenPreferenceService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  let userUuid: string;
  let unblockSessionId: string;

  let userSessionData: UserSessionData;
  let tokenPreferences: TokenPreference[];

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

    tokenPreferences = tokenPreferencesMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUserTokenPreference', () => {
    // Happy
    it('should call axios get method with expected params and return the expected response', async () => {
      // Arrange

      const expectedResult: GetUserTokenPreferenceResponse = tokenPreferences;
      const responseData: GetUserTokenPreferenceResponseData = tokenPreferences;
      const expectedPath = `/user/${userUuid}/token-preferences`;
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

      const service = new TokenPreferenceService(props);

      // Act
      const result = await service.getUserTokenPreference({ ...userSessionData });

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

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new TokenPreferenceService(props);

      // Act
      try {
        await service.getUserTokenPreference({ ...userSessionData });
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new TokenPreferenceService(props);

      // Act
      try {
        await service.getUserTokenPreference({ ...userSessionData });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('updateUserTokenPreference', () => {
    // Happy
    it('should call axios patch method with expected params and return the expected response', async () => {
      // Arrange
      const dto: UpdateUserTokenPreferencesRequest = {
        ...userSessionData,
        preferences: tokenPreferences,
      };

      const expectedResult: UpdateUserTokenPreferencesResponse = { preferences: tokenPreferences };
      const responseData: UpdateUserTokenPreferencesResponseData = {
        preferences: tokenPreferences,
      };
      const expectedPath = `/user/${userUuid}/token-preferences`;
      const expectedBody: UpdateUserTokenPreferenceRequestBody = tokenPreferences;
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new TokenPreferenceService(props);

      // Act
      const result = await service.updateUserTokenPreference(dto);

      // Assert
      expect(axiosClient.patch).toBeCalledTimes(1);
      expect(axiosClient.patch).toHaveBeenLastCalledWith(
        expectedPath,
        expectedBody,
        expectedConfig,
      );
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const dto: UpdateUserTokenPreferencesRequest = {
        ...userSessionData,
        preferences: tokenPreferences,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new TokenPreferenceService(props);

      // Act
      try {
        await service.updateUserTokenPreference(dto);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.patch).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const dto: UpdateUserTokenPreferencesRequest = {
        ...userSessionData,
        preferences: tokenPreferences,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new TokenPreferenceService(props);

      // Act
      try {
        await service.updateUserTokenPreference(dto);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
