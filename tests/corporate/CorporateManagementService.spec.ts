import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { SdkSettings } from '../../src/SdkSettings';
import { CorporateManagementService } from '../../src/corporate/management/CorporateManagementService';
import {
  AddUserToCorporateApiRequestBody,
  CorporateDetails,
  CreateCorporateApiRequestBody,
  CreateCorporateApiResponseData,
  CreateCorporateResponse,
  TargetAddress,
  UpdateCorporateApiRequestBody,
} from '../../src/corporate/management/definitions';
import { UserCorporateRole } from '../../src/enums/UserCorporateRole';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';
import { corporateDetailsMock } from './corporateDetails.mock';

describe('CorporateManagementService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  let corporateDetails: CorporateDetails;
  let targetAddress: TargetAddress;
  let message: string;
  let uuid: string;
  let userUuid: string;
  let role: UserCorporateRole;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
    corporateDetails = corporateDetailsMock();
    targetAddress = { targetAddress: faker.datatype.hexadecimal({ length: 42 }) };
    message = faker.lorem.sentence();
    uuid = faker.datatype.uuid();
    userUuid = faker.datatype.uuid();
    role = faker.helpers.arrayElement(Object.values(UserCorporateRole));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createCorporate', () => {
    // Happy
    it('should call axios post method with expected params and return the expected response', async () => {
      // Arrange
      const expectedResult: CreateCorporateResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = '/corporate';
      const expectedBody: CreateCorporateApiRequestBody = {
        name: corporateDetails.legal_name,
        type: corporateDetails.type,
        registered_address: corporateDetails.registeredAddress,
        city: corporateDetails.city,
        country: corporateDetails.country,
        registration_number: corporateDetails.registrationNumber,
        contact_name: corporateDetails.contactName,
        phone: corporateDetails.phone,
        email: corporateDetails.email,
        industry_sector_type: corporateDetails.industrySectorType,
        industry_sector_value: corporateDetails.industrySectorValue,
        target_address: targetAddress.targetAddress,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: CreateCorporateApiResponseData = {
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
      const result = await service.createCorporate({
        ...corporateDetails,
        ...targetAddress,
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
        await service.createCorporate({ ...corporateDetails, ...targetAddress });
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
        await service.createCorporate({ ...corporateDetails, ...targetAddress });
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
      const expectedResult: CreateCorporateResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = `/corporate/${uuid}`;
      const expectedBody: UpdateCorporateApiRequestBody = {
        name: corporateDetails.legal_name,
        type: corporateDetails.type,
        registered_address: corporateDetails.registeredAddress,
        city: corporateDetails.city,
        country: corporateDetails.country,
        registration_number: corporateDetails.registrationNumber,
        contact_name: corporateDetails.contactName,
        phone: corporateDetails.phone,
        email: corporateDetails.email,
        industry_sector_type: corporateDetails.industrySectorType,
        industry_sector_value: corporateDetails.industrySectorValue,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: CreateCorporateApiResponseData = {
        message: message,
        uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new CorporateManagementService(props);

      // Act
      const result = await service.updateCorporate({ ...corporateDetails, corporateUuid: uuid });

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

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;
      const service = new CorporateManagementService(props);

      // Act
      try {
        await service.updateCorporate({ ...corporateDetails, corporateUuid: uuid });
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
        await service.updateCorporate({ ...corporateDetails, corporateUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('addUserToCampany', () => {
    // Happy
    it('should call axios post method with expected params and return the expected response', async () => {
      // Arrange
      const expectedResult: CreateCorporateResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = `/corporate/${uuid}/user`;
      const expectedBody: AddUserToCorporateApiRequestBody = {
        corporate_uuid: uuid,
        user_uuid: userUuid,
        role: role,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: CreateCorporateApiResponseData = {
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
      const expectedResult: CreateCorporateResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = `/corporate/${uuid}/user/${userUuid}`;
      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
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
});
