import { faker } from '@faker-js/faker';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { SdkSettings } from '../../src/definitions';
import Country from '../../src/enums/Country';
import { KycService } from '../../src/kyc/KycService';
import {
  CreateKYCApplicantRequest,
  DocumentType,
  GetAccessTokenForUserApplicantRequest,
  GetAccessTokenForUserApplicantResponse,
  GetRequiredKycInformationRequest,
  GetRequiredKycInformationResponse,
  GetUploadedKycDocumentsForUserRequest,
  GetUploadedKycDocumentsForUserResponse,
  SourceOfFundsType,
  StartKycVerificationRequest,
  UploadKycDocumentRequest,
  UploadKycDocumentResponse,
} from '../../src/kyc/definitions';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';
import {
  getRandomDocumentSubType,
  getRandomDocumentType,
  getRandomSourceOfFundsType,
} from '../utils';

describe('KycService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let axiosClient: AxiosInstance;
  let props: SdkSettings;
  let axiosError: AxiosError;
  let randomError: unknown;

  let userUuid: string;
  let unblockSessionId: string;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
    userUuid = faker.datatype.uuid();
    unblockSessionId = faker.datatype.uuid();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createKYCApplicant', () => {
    // Happy
    it('Should call axios PUT with expected headers, params and body', async () => {
      // Arrange
      const createKYCApplicantParams: CreateKYCApplicantRequest = {
        address: faker.address.streetAddress(true),
        city: faker.address.city(),
        country: faker.address.countryCode('alpha-2') as Country,
        dateOfBirth: faker.datatype.datetime(),
        postcode: faker.address.zipCode(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
        sourceOfFundsDescription: faker.lorem.sentence(),
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'put').mockResolvedValue({
        data: {},
      } as AxiosResponse);

      const expectedPath = `/user/${createKYCApplicantParams.userUuid}/kyc/applicant`;
      const expectedBody = {
        address: createKYCApplicantParams.address,
        postcode: createKYCApplicantParams.postcode,
        city: createKYCApplicantParams.city,
        country: createKYCApplicantParams.country,
        date_of_birth: DateTime.fromJSDate(createKYCApplicantParams.dateOfBirth).toFormat(
          'yyyy-MM-dd',
        ),
        source_of_funds: createKYCApplicantParams.sourceOfFunds,
        source_of_funds_description: createKYCApplicantParams.sourceOfFundsDescription,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.createKYCApplicant(createKYCApplicantParams);

      // Assert
      expect(axiosClient.put).toHaveBeenCalledTimes(1);
      expect(axiosClient.put).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(response.created).toBeTruthy();
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const createKYCApplicantParams: CreateKYCApplicantRequest = {
        address: faker.address.streetAddress(true),
        city: faker.address.city(),
        country: faker.address.countryCode('alpha-2') as Country,
        dateOfBirth: faker.datatype.datetime(),
        postcode: faker.address.zipCode(),
        sourceOfFunds: getRandomSourceOfFundsType() as SourceOfFundsType,
        sourceOfFundsDescription: faker.lorem.sentence(),
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'put').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
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
        address: faker.address.streetAddress(true),
        city: faker.address.city(),
        country: faker.address.countryCode('alpha-2') as Country,
        dateOfBirth: faker.datatype.datetime(),
        postcode: faker.address.zipCode(),
        sourceOfFunds: getRandomSourceOfFundsType(),
        sourceOfFundsDescription: faker.lorem.sentence(),
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'put').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

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

  describe('getAccessTokenForUserApplicant', () => {
    // Happy
    it('Should call axios GET with expected headers and params', async () => {
      // Arrange
      const getAccessTokenForUserApplicantParams: GetAccessTokenForUserApplicantRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      const expectedResponse: GetAccessTokenForUserApplicantResponse = {
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

      const expectedPath = `/user/${getAccessTokenForUserApplicantParams.userUuid}/kyc/applicant/token`;

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.getAccessTokenForUserApplicant(
        getAccessTokenForUserApplicantParams,
      );

      // Assert
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(response).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const getAccessTokenForUserApplicantParams: GetAccessTokenForUserApplicantRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getAccessTokenForUserApplicant(getAccessTokenForUserApplicantParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const getAccessTokenForUserApplicantParams: GetAccessTokenForUserApplicantRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getAccessTokenForUserApplicant(getAccessTokenForUserApplicantParams);
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
    it('Should call axios PUT with expected headers, params and body', async () => {
      // Arrange
      const uploadKycDocumentParams: UploadKycDocumentRequest = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      const expectedResponse: UploadKycDocumentResponse = { uploadUuid: faker.datatype.uuid() };
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'put').mockResolvedValue({
        data: { upload_uuid: expectedResponse.uploadUuid },
      } as AxiosResponse<{ upload_uuid: string }>);

      const expectedPath = `/user/${uploadKycDocumentParams.userUuid}/kyc/document`;
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
      const service = new KycService(props);
      // Act

      const response = await service.uploadKycDocument(uploadKycDocumentParams);

      // Assert
      expect(axiosClient.put).toHaveBeenCalledTimes(1);
      expect(axiosClient.put).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(response).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const uploadKycDocumentParams: UploadKycDocumentRequest = {
        content: faker.datatype.string(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'put').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
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
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'put').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

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

  describe('getUploadedKycDocumentsForUser', () => {
    // Happy
    it('Should call axios GET with expected headers and params', async () => {
      // Arrange
      const getUploadedKycDocumentsForUserParams: GetUploadedKycDocumentsForUserRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      const expectedResponse: GetUploadedKycDocumentsForUserResponse[] = [];
      for (let i = 0; i < faker.datatype.number(5); i++) {
        expectedResponse.push({
          checkUuid: faker.datatype.uuid(),
          country: faker.helpers.arrayElement(Object.values(Country)),
          createdAt: faker.datatype.datetime().toISOString(),
          documentType: getRandomDocumentType(),
          name: faker.system.commonFileName('jpg'),
          status: faker.word.adjective({ strategy: 'shortest' }),
          updatedAt: faker.datatype.datetime().toISOString(),
          uuid: faker.datatype.uuid(),
          documentSubType: getRandomDocumentSubType(),
          uploadErrors: faker.lorem.sentence(),
          verificationErrors: faker.lorem.sentence(),
        });
      }

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

      type AuxResponse = {
        uuid: string;
        doc_type: string;
        doc_subtype?: string;
        name: string;
        country: string;
        status: string;
        upload_errors?: string;
        verification_errors?: string;
        created_at: string;
        updated_at: string;
        check_uuid: string;
      }[];
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: expectedResponse.map((item) => ({
          uuid: item.uuid,
          doc_type: item.documentType,
          doc_subtype: item.documentSubType,
          name: item.name,
          country: item.country,
          status: item.status,
          upload_errors: item.uploadErrors,
          verification_errors: item.verificationErrors,
          created_at: item.createdAt,
          updated_at: item.updatedAt,
          check_uuid: item.checkUuid,
        })),
      } as AxiosResponse<AuxResponse>);

      const expectedPath = `/user/${getUploadedKycDocumentsForUserParams.userUuid}/kyc/document`;

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const service = new KycService(props);

      // Act
      const response = await service.getUploadedKycDocumentsForUser(
        getUploadedKycDocumentsForUserParams,
      );

      // Assert
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(response).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const getUploadedKycDocumentsForUserParams: GetUploadedKycDocumentsForUserRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getUploadedKycDocumentsForUser(getUploadedKycDocumentsForUserParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const getUploadedKycDocumentsForUserParams: GetUploadedKycDocumentsForUserRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getUploadedKycDocumentsForUser(getUploadedKycDocumentsForUserParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('startKycVerification', () => {
    // Happy
    it('Should call axios POST with expected headers and body', async () => {
      // Arrange
      const startKycVerificationParams: StartKycVerificationRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: {},
      } as AxiosResponse);

      const expectedPath = `/user/${startKycVerificationParams.userUuid}/kyc/verification`;
      const expectedBody = {};
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.startKycVerification(startKycVerificationParams);

      // Assert
      expect(axiosClient.post).toHaveBeenCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(response.started).toBeTruthy();
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const startKycVerificationParams: StartKycVerificationRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.startKycVerification(startKycVerificationParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const startKycVerificationParams: StartKycVerificationRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.startKycVerification(startKycVerificationParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });

  describe('getRequiredKycInformation', () => {
    // Happy
    it('Should call axios GET with expected headers and params', async () => {
      // Arrange
      const getRequiredKycInformationParams: GetRequiredKycInformationRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      const expectedResponse: GetRequiredKycInformationResponse[] = [];
      for (let i = 0; i < faker.datatype.number(5); i++) {
        const documentsTypes: DocumentType[] = [];

        for (let j = 0; j < faker.datatype.number(5); j++) {
          documentsTypes.push(getRandomDocumentType());
        }

        expectedResponse.push({
          documentClass: faker.word.noun(),
          documentTypes: documentsTypes,
        });
      }

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      type AuxResponse = {
        required_documents: {
          document_class: string;
          one_of_document_type: DocumentType[];
        }[];
      };
      jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: {
          required_documents: expectedResponse.map((item) => ({
            document_class: item.documentClass,
            one_of_document_type: item.documentTypes,
          })),
        } as AuxResponse,
      } as AxiosResponse<AuxResponse>);

      const expectedPath = `/user/${getRequiredKycInformationParams.userUuid}/kyc/verification`;

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
          'unblock-session-id': unblockSessionId,
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.getRequiredKycInformation(getRequiredKycInformationParams);

      // Assert
      expect(axiosClient.get).toHaveBeenCalledTimes(1);
      expect(axiosClient.get).toHaveBeenLastCalledWith(expectedPath, expectedConfig);
      expect(response).toStrictEqual(expectedResponse);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const getRequiredKycInformationParams: GetRequiredKycInformationRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(axiosError);

      const expectedErrorMesage = `Api error': ${axiosError.response?.status} ${axiosError.response?.data}`;
      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getRequiredKycInformation(getRequiredKycInformationParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });

    it('Should throw expected error when an Unexpected Error Happens', async () => {
      // Arrange
      const getRequiredKycInformationParams: GetRequiredKycInformationRequest = {
        userUuid: userUuid,
        unblockSessionId: unblockSessionId,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockRejectedValueOnce(randomError);

      const expectedErrorMesage = `Unexpected error': ${randomError}`;

      const service = new KycService(props);
      let resultedError;

      // Act
      try {
        await service.getRequiredKycInformation(getRequiredKycInformationParams);
      } catch (e) {
        resultedError = e;
      }

      // Assert
      expect(resultedError).toBeInstanceOf(Error);
      expect((resultedError as Error).message).toBe(expectedErrorMesage);
    });
  });
});
