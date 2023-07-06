import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { CompanyService } from '../../src/company/CompanyService';
import {
  AddUserToCompanyApiRequestBody,
  CompanyDetails,
  CreateCompanyApiRequestBody,
  CreateCompanyApiResponseData,
  CreateCompanyResponse,
  TargetAddress,
  UpdateCompanyApiRequestBody,
} from '../../src/company/definitions';
import { SdkSettings } from '../../src/definitions';
import { UserCompanyRole } from '../../src/enums/UserCompanyRole';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';
import { companyDetailsMock } from './companyDetails.mock';

describe('CompanyService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  let companyDetails: CompanyDetails;
  let targetAddress: TargetAddress;
  let message: string;
  let uuid: string;
  let userUuid: string;
  let role: UserCompanyRole;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
    companyDetails = companyDetailsMock();
    targetAddress = { targetAddress: faker.datatype.hexadecimal({ length: 42 }) };
    message = faker.lorem.sentence();
    uuid = faker.datatype.uuid();
    userUuid = faker.datatype.uuid();
    role = faker.helpers.arrayElement(Object.values(UserCompanyRole));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createCompany', () => {
    // Happy
    it('should call axios post method with expected params and return the expected response', async () => {
      // Arrange
      const expectedResult: CreateCompanyResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = '/company';
      const expectedBody: CreateCompanyApiRequestBody = {
        name: companyDetails.name,
        type: companyDetails.type,
        registered_address: companyDetails.registeredAddress,
        city: companyDetails.city,
        country: companyDetails.country,
        registration_number: companyDetails.registrationNumber,
        contact_name: companyDetails.contactName,
        phone: companyDetails.phone,
        email: companyDetails.email,
        industry_sector_type: companyDetails.industrySectorType,
        industry_sector_value: companyDetails.industrySectorValue,
        target_address: targetAddress.targetAddress,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: CreateCompanyApiResponseData = {
        message: message,
        uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new CompanyService(props);

      // Act
      const result = await service.createCompany({
        ...companyDetails,
        ...targetAddress,
        companyUuid: uuid,
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

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new CompanyService(props);

      // Act
      try {
        await service.createCompany({ ...companyDetails, ...targetAddress, companyUuid: uuid });
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new CompanyService(props);

      // Act
      try {
        await service.createCompany({ ...companyDetails, ...targetAddress, companyUuid: uuid });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('updateCompany', () => {
    // Happy
    it('should call axios patch method with expected params and return the expected response', async () => {
      // Arrange
      const expectedResult: CreateCompanyResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = `/company/${uuid}`;
      const expectedBody: UpdateCompanyApiRequestBody = {
        name: companyDetails.name,
        type: companyDetails.type,
        registered_address: companyDetails.registeredAddress,
        city: companyDetails.city,
        country: companyDetails.country,
        registration_number: companyDetails.registrationNumber,
        contact_name: companyDetails.contactName,
        phone: companyDetails.phone,
        email: companyDetails.email,
        industry_sector_type: companyDetails.industrySectorType,
        industry_sector_value: companyDetails.industrySectorValue,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: CreateCompanyApiResponseData = {
        message: message,
        uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'patch').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new CompanyService(props);

      // Act
      const result = await service.updateCompany({ ...companyDetails, companyUuid: uuid });

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

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;
      const service = new CompanyService(props);

      // Act
      try {
        await service.updateCompany({ ...companyDetails, companyUuid: uuid });
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new CompanyService(props);

      // Act
      try {
        await service.updateCompany({ ...companyDetails, companyUuid: uuid });
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
      const expectedResult: CreateCompanyResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = `/company/${uuid}/user`;
      const expectedBody: AddUserToCompanyApiRequestBody = {
        company_uuid: uuid,
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

      const responseData: CreateCompanyApiResponseData = {
        message: message,
        uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new CompanyService(props);

      // Act
      const result = await service.addUserToCompany({
        companyUuid: uuid,
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

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new CompanyService(props);

      // Act
      try {
        await service.addUserToCompany({
          companyUuid: uuid,
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;

      const service = new CompanyService(props);

      // Act
      try {
        await service.addUserToCompany({
          companyUuid: uuid,
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

  describe('removeUserFromCompany', () => {
    // Happy
    it('should call axios delete method with expected params and return the expected response', async () => {
      // Arrange
      const expectedResult: CreateCompanyResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = `/company/${uuid}/user/${userUuid}`;
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
      const service = new CompanyService(props);

      // Act
      const result = await service.removeUserFromCompany({
        companyUuid: uuid,
        companyUserUuid: userUuid,
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

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      let resultedError;

      const service = new CompanyService(props);

      // Act
      try {
        await service.removeUserFromCompany({
          companyUuid: uuid,
          companyUserUuid: userUuid,
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

      const expectedErrorMesage = `Unexpected error': ${randomError}`;
      let resultedError;
      const service = new CompanyService(props);

      // Act
      try {
        await service.removeUserFromCompany({
          companyUuid: uuid,
          companyUserUuid: userUuid,
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
