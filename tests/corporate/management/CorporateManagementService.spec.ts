import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from '../../../src/SdkSettings';
import { CorporateManagementService } from '../../../src/corporate/management/CorporateManagementService';
import {
  CorporationStatus,
  CreateCorporateRequest,
  CreateCorporateResponse,
  GetCorporateDetailsResponse,
  GetCorporateTokenPreferencesResponse,
  GetCorporateTransactionsResponse,
  LinkUserToCorporateResponse,
  NewProcessDirection,
  UnlinkUserFromCorporateResponse,
} from '../../../src/corporate/management/definitions';
import { UserCorporateRole } from '../../../src/enums/UserCorporateRole';
import { axiosErrorMock, randomErrorMock } from '../../mocks/errors.mock';
import { propsMock } from '../../mocks/props.mock';
import { corporateDetailsMock } from '../corporateDetails.mock';
import {
  CeloToken,
  Chain,
  CorporateType,
  Currency,
  ProcessStatus,
  StableToken,
} from '../../../src';
import { UserSessionDataNotSetError } from '../../../src/errors';

describe('CorporateManagementService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  let corporateDetails: CreateCorporateRequest;
  let message: string;
  let uuid: string;
  let userUuid: string;
  let role: UserCorporateRole;
  let unblockSessionId: string;
  let userSessionDataNotSetError: UserSessionDataNotSetError;
  let tokenPrefs: GetCorporateTokenPreferencesResponse;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
    corporateDetails = corporateDetailsMock();
    message = faker.lorem.sentence();
    uuid = faker.datatype.uuid();
    userUuid = faker.datatype.uuid();
    unblockSessionId = faker.datatype.uuid();
    role = faker.helpers.arrayElement(Object.values(UserCorporateRole));
    userSessionDataNotSetError = new UserSessionDataNotSetError();
    tokenPrefs = {
      currency: Currency.EURO,
      chain: Chain.CELO,
      token: CeloToken.CEUR as StableToken,
    };

    props.setUserSessionData({ unblockSessionId, userUuid: uuid });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createCorporate', () => {
    // Happy
    it('should call axios post method with expected params and return the expected response', async () => {
      // Arrange
      const expectedResult: CreateCorporateResponse = {
        status: message,
        corporate_uuid: uuid,
      };

      const expectedPath = '/corporate';
      const expectedBody: CreateCorporateRequest = corporateDetails;
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: CreateCorporateResponse = expectedResult;

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new CorporateManagementService(props);

      // Act
      const result = await service.createCorporate(corporateDetails);

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.createCorporate(corporateDetails);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.createCorporate(corporateDetails);
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('updateCorporate', () => {
    // Happy
    it('should call axios patch method with expected params and return the expected response', async () => {
      // Arrange
      const expectedPath = `/corporate/${uuid}`;
      const expectedBody: CreateCorporateRequest = corporateDetails;
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
      });

      const service = new CorporateManagementService(props);

      // Act
      await service.updateCorporate({
        ...corporateDetails,
        corporate_uuid: uuid,
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
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;
      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.updateCorporate({ ...corporateDetails, corporate_uuid: uuid });
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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.updateCorporate({ ...corporateDetails, corporate_uuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('addUserToCompany', () => {
    // Happy
    it('should call axios post method with expected params and return the expected response', async () => {
      // Arrange
      const expectedBody = {
        corporate_uuid: uuid,
        user_uuid: userUuid,
        role: UserCorporateRole.ADMINISTRATOR,
      };

      const expectedPath = `/corporate/${uuid}/user`;
      const expectedResult: LinkUserToCorporateResponse = {
        message,
        uuid,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      const responseData: LinkUserToCorporateResponse = {
        message: message,
        uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new CorporateManagementService(props);

      // Act
      const result = await service.linkUserToCorporate({
        corporateUuid: uuid,
        userUuid: userUuid,
        role: role,
      });

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });

    // Sad
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.linkUserToCorporate({
          corporateUuid: uuid,
          userUuid: userUuid,
          role: role,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.linkUserToCorporate({
          corporateUuid: uuid,
          userUuid: userUuid,
          role: role,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('removeUserFromCorporate', () => {
    // Happy
    it('should call axios delete method with expected params and return the expected response', async () => {
      // Arrange
      const expectedResult: UnlinkUserFromCorporateResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = `/corporate/${uuid}/user/${userUuid}`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      const responseData = {
        message: message,
        uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'delete').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });
      const service = new CorporateManagementService(props);

      // Act
      const result = await service.unlinkUserFromCorporate({
        corporateUuid: uuid,
        corporateUserUuid: userUuid,
      });

      // Assert
      expect(axiosClient.delete).toBeCalledTimes(1);
      expect(axiosClient.delete).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(result).toStrictEqual(expectedResult);
    });
    // Sad
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'delete').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.unlinkUserFromCorporate({
          corporateUuid: uuid,
          corporateUserUuid: userUuid,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(axiosClient.delete).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'delete').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;
      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.unlinkUserFromCorporate({
          corporateUuid: uuid,
          corporateUserUuid: userUuid,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getCorporateDetails', () => {
    // Happy
    it('Should call axios GET with expected headers and params and return an expected response', async () => {
      // Arrange
      const expectedResponse: GetCorporateDetailsResponse = {
        legal_name: faker.name.fullName(),
        type: CorporateType.CHARITY,
        contact_details: {
          name: faker.name.fullName(),
          phone: faker.phone.number(),
          email: faker.internet.email(),
        },
        registered_address: {},
        target_address: faker.finance.ethereumAddress(),
        status: CorporationStatus.FULL_CORPORATE,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: expectedResponse,
      } as AxiosResponse<GetCorporateDetailsResponse>);

      const expectedPath = `/corporate/${uuid}`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'user-uuid': uuid,
        },
      };

      const service = new CorporateManagementService(props);

      // Act
      const response = await service.getCorporateDetails({ corporate_uuid: uuid });

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    // Sad
    it('Should throw error if Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      props.setUserSessionData({ unblockSessionId: '', userUuid: '' });

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateDetails({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateDetails({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateDetails({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getCorporateTransactions', () => {
    // Happy
    it('Should call axios GET with expected headers and params and return an expected response', async () => {
      // Arrange
      const expectedResponse: GetCorporateTransactionsResponse[] = [
        {
          status: ProcessStatus.FINALIZE_PROCESS_FAILED,
          user_uuid: userUuid,
          direction: NewProcessDirection.CryptoToFiat,
          input: {
            amount: faker.datatype.number(),
            currency: CeloToken.CEUR,
            transaction_id: faker.datatype.uuid(),
          },
          output: {
            amount: faker.datatype.number(),
            currency: Currency.EURO,
            transaction_id: faker.datatype.uuid(),
          },
        },
      ];

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: expectedResponse,
      } as AxiosResponse<GetCorporateTransactionsResponse[]>);

      const expectedPath = `/corporate/${uuid}/transactions`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'user-uuid': uuid,
        },
      };

      const service = new CorporateManagementService(props);

      // Act
      const response = await service.getCorporateTransactions({ corporate_uuid: uuid });

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    // Sad
    it('Should throw error if Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      props.setUserSessionData({ unblockSessionId: '', userUuid: '' });

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateTransactions({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateTransactions({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateTransactions({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getCorporateTokenPreferences', () => {
    // Happy
    it('Should call axios GET with expected headers and params and return an expected response', async () => {
      // Arrange
      const expectedResponse: GetCorporateTokenPreferencesResponse[] = [tokenPrefs];

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: expectedResponse,
      } as AxiosResponse<GetCorporateTokenPreferencesResponse[]>);

      const expectedPath = `/corporate/${uuid}/token-preferences`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'user-uuid': uuid,
        },
      };

      const service = new CorporateManagementService(props);

      // Act
      const response = await service.getCorporateTokenPreferences({ corporate_uuid: uuid });

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
    });

    // Sad
    it('Should throw error if Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      props.setUserSessionData({ unblockSessionId: '', userUuid: '' });

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateTokenPreferences({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateTokenPreferences({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

      const service = new CorporateManagementService(props);
      let resultedError;

      // Act
      try {
        await service.getCorporateTokenPreferences({ corporate_uuid: uuid });
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('updateCorporateTokenPreferences', () => {
    // Happy
    it('should call axios patch method with expected params and return the expected response', async () => {
      // Arrange
      const expectedPath = `/corporate/${uuid}/token-preferences`;
      const expectedBody = tokenPrefs;
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
      });

      const service = new CorporateManagementService(props);

      // Act
      await service.updateCorporateTokenPreferences({
        ...expectedBody,
        corporate_uuid: uuid,
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
    it('should throw expected error when an Axios Error Happens', async () => {
      // Arrange

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;
      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.updateCorporateTokenPreferences({ ...tokenPrefs, corporate_uuid: uuid });
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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;
      let resultedError;

      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.updateCorporateTokenPreferences({ ...tokenPrefs, corporate_uuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
