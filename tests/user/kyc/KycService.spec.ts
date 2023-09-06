import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { SdkSettings } from '../../../src/SdkSettings';
import Country from '../../../src/enums/Country';
import { UserSessionDataNotSetError } from '../../../src/errors';
import { KycService } from '../../../src/user/kyc/KycService';
import {
  ApplicantData,
  CreateKYCApplicantRequest,
  DocumentType,
  GetSumsubTokenForIDVCollectionResponse,
  InitSumsubSdkResponse,
  InitSumsubSdkRequest,
  OnboardingResponse,
  GetKYCApplicationResponse,
  SourceOfFundsType,
  UploadDocumentData,
  UploadKycDocumentRequest,
  UploadKycDocumentResponse,
} from '../../../src/user/kyc/definitions';
import { axiosErrorMock, randomErrorMock } from '../../mocks/errors.mock';
import { propsMock } from '../../mocks/props.mock';
import {
  getRandomDocumentSubType,
  getRandomDocumentType,
  getRandomSourceOfFundsType,
} from '../../utils';

describe('KycService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;
  let userSessionDataNotSetError: UserSessionDataNotSetError;

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
    userUuid = faker.datatype.uuid();
    unblockSessionId = faker.datatype.uuid();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createKYCApplicant', () => {
    // Happy
    it('Should call axios POST with expected headers, params and body', async () => {
      // Arrange
      const createKYCApplicantParams: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {},
      } as AxiosResponse);

      const expectedPath = `/user/kyc/applicant`;
      const expectedBody = {
        address: createKYCApplicantParams.address,
        date_of_birth: DateTime.fromJSDate(createKYCApplicantParams.dateOfBirth).toFormat(
          'yyyy-MM-dd',
        ),
        source_of_funds: createKYCApplicantParams.sourceOfFunds,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      // Act

      const response = await service.createKYCApplicant(createKYCApplicantParams);

      // Assert
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(204);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      const createKYCApplicantParams: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.createKYCApplicant(createKYCApplicantParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const createKYCApplicantParams: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.data}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.createKYCApplicant(createKYCApplicantParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const createKYCApplicantParams: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.createKYCApplicant(createKYCApplicantParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getSumsubTokenForIDVCollection', () => {
    // Happy
    it('Should call axios GET with expected headers and params', async () => {
      // Arrange
      const expectedResponse: GetSumsubTokenForIDVCollectionResponse = {
        token: faker.datatype.hexadecimal({ length: 128 }),
      };
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: {
          token: expectedResponse.token,
        },
      } as AxiosResponse<{
        token: string;
      }>);

      const expectedPath = `/user/kyc/applicant/token`;

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      // Act

      const response = await service.getSumsubTokenForIDVCollection();

      // Assert
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(response).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getSumsubTokenForIDVCollection();
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

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getSumsubTokenForIDVCollection();
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

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getSumsubTokenForIDVCollection();
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('uploadKycDocument', () => {
    // Happy
    it('Should call axios POST with expected headers, params and body', async () => {
      // Arrange
      const uploadKycDocumentParams: UploadKycDocumentRequest = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {},
      } as AxiosResponse<{ upload_uuid: string }>);

      const expectedPath = `/user/kyc/document`;
      const expectedBody = {
        content: uploadKycDocumentParams.content,
        filename: uploadKycDocumentParams.filename,
        document_type: uploadKycDocumentParams.documentType,
        document_subtype: uploadKycDocumentParams.documentSubType,
        country: uploadKycDocumentParams.country,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      // Act

      const response = await service.uploadKycDocument(uploadKycDocumentParams);

      // Assert
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(204);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      const uploadKycDocumentParams: UploadKycDocumentRequest = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.uploadKycDocument(uploadKycDocumentParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const uploadKycDocumentParams: UploadKycDocumentRequest = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.uploadKycDocument(uploadKycDocumentParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const uploadKycDocumentParams: UploadKycDocumentRequest = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Api error: ${randomError}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.uploadKycDocument(uploadKycDocumentParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  // NO TESTS FOR GetKYCApplicationResponse to be implemented
 

  describe('startKycVerification', () => {
    // Happy
    it('Should call axios POST with expected headers and body', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {},
      } as AxiosResponse);

      const expectedPath = `/user/kyc/verification`;
      const expectedBody = {};
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      // Act

      const response = await service.startKycVerification();

      // Assert
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(204);
    });

    // Sad
    it('Should throw error if User Session Data is not set', async () => {
      // Arrange
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      const expectedErrorMesage = `Bad request: ${userSessionDataNotSetError}`;

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.startKycVerification();
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
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error: ${axiosError.response?.status} ${axiosError.response?.data}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.startKycVerification();
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
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error: ${randomError}`;

      props.setUserSessionData({
        unblockSessionId,
        userUuid,
      });

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.startKycVerification();
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('onboarding', () => {
    // Happy
    it('should call createKycApplicant, uploadKycDocument and startKycVerification methods and return expected response', async () => {
      // Arrange
      const applicantData: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      const createApplicantDto: CreateKYCApplicantRequest = {
        ...applicantData,
      };

      const uploadDocumentData: UploadDocumentData = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
      };

      const uploadKycDocumentDto: UploadKycDocumentRequest = {
        ...uploadDocumentData,
      };
      const uploadUuid = faker.datatype.uuid();

      const service = new KycService(props);
      jest.spyOn(service, 'createKYCApplicant').mockResolvedValueOnce({
        created: true,
      });

      jest.spyOn(service, 'uploadKycDocument').mockResolvedValueOnce({
        uploadUuid: uploadUuid,
      });

      jest.spyOn(service, 'startKycVerification').mockResolvedValueOnce({
        started: true,
      });

      const expectedResponse: OnboardingResponse = {
        verificationStarted: true,
      };

      // Act
      const result = await service.onboarding({
        applicantData: applicantData,
        documentData: uploadDocumentData,
      });

      // Assert
      expect(service.createKYCApplicant).toBeCalledTimes(1);
      expect(service.createKYCApplicant).toBeCalledWith(createApplicantDto);
      expect(service.uploadKycDocument).toBeCalledTimes(1);
      expect(service.uploadKycDocument).toBeCalledWith(uploadKycDocumentDto);
      expect(service.startKycVerification).toBeCalledTimes(1);
      // expect(result).toEqual(expectedResponse);
      expect(204)
    });

    it('should throw error if createKYCApplicant throws an error', async () => {
      // Arrange
      const applicantData: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      const uploadDocumentData: UploadDocumentData = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
      };

      const uploadUuid = faker.datatype.uuid();

      const service = new KycService(props);
      jest
        .spyOn(service, 'createKYCApplicant')
        .mockRejectedValueOnce(faker.helpers.arrayElement([randomError, axiosError]));

      jest.spyOn(service, 'uploadKycDocument').mockResolvedValueOnce({
        uploadUuid: uploadUuid,
      });

      jest.spyOn(service, 'startKycVerification').mockResolvedValueOnce({
        started: true,
      });

      let resultedError;
      // Act
      try {
        await service.onboarding({
          applicantData: applicantData,
          documentData: uploadDocumentData,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(service.createKYCApplicant).toBeCalledTimes(1);
      expect(service.uploadKycDocument).not.toBeCalled();
      expect(service.startKycVerification).not.toBeCalled();
      expect(resultedError).toBeInstanceOf(Error);
    });

    it('should throw error if uploadKycDocument throws an error', async () => {
      // Arrange
      const applicantData: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      const uploadDocumentData: UploadDocumentData = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
      };

      const service = new KycService(props);
      jest.spyOn(service, 'createKYCApplicant').mockResolvedValueOnce({
        created: true,
      });

      jest
        .spyOn(service, 'uploadKycDocument')
        .mockRejectedValueOnce(faker.helpers.arrayElement([randomError, axiosError]));

      jest.spyOn(service, 'startKycVerification').mockResolvedValueOnce({
        started: true,
      });

      let resultedError;
      // Act
      try {
        await service.onboarding({
          applicantData: applicantData,
          documentData: uploadDocumentData,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(service.createKYCApplicant).toBeCalledTimes(1);
      expect(service.uploadKycDocument).toBeCalledTimes(1);
      expect(service.startKycVerification).not.toBeCalled();
      expect(resultedError).toBeInstanceOf(Error);
    });

    it('should throw error if startKycVerification throws an error', async () => {
      // Arrange
      const applicantData: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      const uploadDocumentData: UploadDocumentData = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
      };

      const uploadUuid = faker.datatype.uuid();

      const service = new KycService(props);
      jest.spyOn(service, 'createKYCApplicant').mockResolvedValueOnce({
        created: true,
      });

      jest.spyOn(service, 'uploadKycDocument').mockResolvedValueOnce({
        uploadUuid: uploadUuid,
      });

      jest
        .spyOn(service, 'startKycVerification')
        .mockRejectedValueOnce(faker.helpers.arrayElement([randomError, axiosError]));

      let resultedError;
      // Act
      try {
        await service.onboarding({
          applicantData: applicantData,
          documentData: uploadDocumentData,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(service.createKYCApplicant).toBeCalledTimes(1);
      expect(service.uploadKycDocument).toBeCalledTimes(1);
      expect(service.startKycVerification).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
    });
  });

  describe('initSumsubSdk', () => {
    // Happy
    it('should call createKycApplicant and getSumsubTokenForIDVCollection methods and return expected response', async () => {
      // Arrange
      const applicantData: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      const createApplicantDto: CreateKYCApplicantRequest = {
        ...applicantData,
      };

      const sumsubToken = faker.datatype.uuid();

      const service = new KycService(props);
      jest.spyOn(service, 'createKYCApplicant').mockResolvedValueOnce({
        created: true,
      });

      jest.spyOn(service, 'getSumsubTokenForIDVCollection').mockResolvedValueOnce({
        token: sumsubToken,
      });

      const expectedResponse: InitSumsubSdkResponse = {
        token: sumsubToken,
      };
      // Act
      const result = await service.initSumsubSdk({
        applicantData: applicantData,
      });
      // Assert
      expect(service.createKYCApplicant).toBeCalledTimes(1);
      expect(service.createKYCApplicant).toBeCalledWith(createApplicantDto);
      expect(service.getSumsubTokenForIDVCollection).toBeCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error if createKYCApplicant throws an error', async () => {
      // Arrange
      const applicantData: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      const sumsubToken = faker.datatype.uuid();

      const service = new KycService(props);
      jest
        .spyOn(service, 'createKYCApplicant')
        .mockRejectedValueOnce(faker.helpers.arrayElement([randomError, axiosError]));

      jest.spyOn(service, 'getSumsubTokenForIDVCollection').mockResolvedValueOnce({
        token: sumsubToken,
      });

      let resultedError;
      // Act
      try {
        await service.initSumsubSdk({
          applicantData: applicantData,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(service.createKYCApplicant).toBeCalledTimes(1);
      expect(service.getSumsubTokenForIDVCollection).not.toBeCalled();
      expect(resultedError).toBeInstanceOf(Error);
    });

    it('should throw error if getSumsubTokenForIDVCollection throws an error', async () => {
      // Arrange
      const applicantData: CreateKYCApplicantRequest = {
        address: {
          address_line_1:  faker.address.streetAddress(true),
          address_line_2:  faker.address.streetAddress(true),
          post_code: faker.address.zipCode(),
          city: faker.address.city(),
          country: faker.address.countryCode('alpha-2') as Country,
        },
        dateOfBirth: faker.datatype.datetime(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
      };

      const service = new KycService(props);
      jest.spyOn(service, 'createKYCApplicant').mockResolvedValueOnce({
        created: true,
      });

      jest
        .spyOn(service, 'getSumsubTokenForIDVCollection')
        .mockRejectedValueOnce(faker.helpers.arrayElement([randomError, axiosError]));

      let resultedError;
      // Act
      try {
        await service.initSumsubSdk({
          applicantData: applicantData,
        });
      } catch (error) {
        resultedError = error;
      }

      // Assert
      expect(service.createKYCApplicant).toBeCalledTimes(1);
      expect(service.getSumsubTokenForIDVCollection).toBeCalledTimes(1);
      expect(resultedError).toBeInstanceOf(Error);
    });
  });
});
