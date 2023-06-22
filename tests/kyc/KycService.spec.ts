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
import {
  getRandomDocumentSubType,
  getRandomDocumentType,
  getRandomFromEnum,
  getRandomSourceOfFundsType,
} from '../utils';

describe('KycService', () => {
  let props: SdkSettings;
  beforeEach(() => {
    props = {
      prodUrl: 'https://getunblock.com',
      sandBoxUrl: 'https://sandbox.getunblock.com',
      apiKey: `API-Key ${faker.datatype.string(64)}`,
      prod: faker.datatype.boolean(),
      timeoutMs: 10000,
    };
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
        userUuid: faker.datatype.uuid(),
      };

      let resultedPath, resultedBody, resultedConfig;
      const axiosClient = {
        put: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'put').mockImplementationOnce((path, body, config) => {
        resultedBody = body;
        resultedConfig = config;
        resultedPath = path;

        const axiosResponse = {
          data: {},
        } as AxiosResponse;
        return Promise.resolve(axiosResponse);
      });

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
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.createKYCApplicant(createKYCApplicantParams);

      // Assert
      expect(response.created).toBeTruthy();
      expect(resultedBody).toStrictEqual(expectedBody);
      expect(resultedPath).toStrictEqual(expectedPath);
      expect(resultedConfig).toStrictEqual(expectedConfig);
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
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        put: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      const axiosClient = {
        put: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      let resultedPath, resultedConfig;
      const expectedResponse: GetAccessTokenForUserApplicantResponse = {
        token: faker.datatype.hexadecimal({ length: 128 }),
      };
      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockImplementationOnce((path, config) => {
        resultedConfig = config;
        resultedPath = path;

        const axiosResponse = {
          data: {
            token: expectedResponse.token,
          },
        } as AxiosResponse<{
          token: string;
        }>;
        return Promise.resolve(axiosResponse);
      });

      const expectedPath = `/user/${getAccessTokenForUserApplicantParams.userUuid}/kyc/applicant/token`;

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.getAccessTokenForUserApplicant(
        getAccessTokenForUserApplicantParams,
      );

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(resultedPath).toStrictEqual(expectedPath);
      expect(resultedConfig).toStrictEqual(expectedConfig);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const getAccessTokenForUserApplicantParams: GetAccessTokenForUserApplicantRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
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
        country: getRandomFromEnum(Country),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
        userUuid: faker.datatype.uuid(),
      };

      let resultedPath, resultedBody, resultedConfig;
      const expectedResponse: UploadKycDocumentResponse = { uploadUuid: faker.datatype.uuid() };
      const axiosClient = {
        put: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'put').mockImplementationOnce((path, body, config) => {
        resultedBody = body;
        resultedConfig = config;
        resultedPath = path;

        const axiosResponse = {
          data: { upload_uuid: expectedResponse.uploadUuid },
        } as AxiosResponse<{ upload_uuid: string }>;
        return Promise.resolve(axiosResponse);
      });

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
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.uploadKycDocument(uploadKycDocumentParams);

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(resultedBody).toStrictEqual(expectedBody);
      expect(resultedPath).toStrictEqual(expectedPath);
      expect(resultedConfig).toStrictEqual(expectedConfig);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const uploadKycDocumentParams: UploadKycDocumentRequest = {
        content: faker.datatype.string(),
        country: getRandomFromEnum(Country),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        put: jest.fn(),
      } as unknown as AxiosInstance;
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
        country: getRandomFromEnum(Country),
        documentType: getRandomDocumentType(),
        filename: faker.system.commonFileName('jpg'),
        documentSubType: getRandomDocumentSubType(),
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      const axiosClient = {
        put: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      let resultedPath, resultedConfig;
      const expectedResponse: GetUploadedKycDocumentsForUserResponse[] = [];
      for (let i = 0; i < faker.datatype.number(5); i++) {
        expectedResponse.push({
          checkUuid: faker.datatype.uuid(),
          country: getRandomFromEnum(Country),
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

      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockImplementationOnce((path, config) => {
        resultedConfig = config;
        resultedPath = path;

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
        const axiosResponse = {
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
        } as AxiosResponse<AuxResponse>;
        return Promise.resolve(axiosResponse);
      });

      const expectedPath = `/user/${getUploadedKycDocumentsForUserParams.userUuid}/kyc/document`;

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.getUploadedKycDocumentsForUser(
        getUploadedKycDocumentsForUserParams,
      );

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(resultedPath).toStrictEqual(expectedPath);
      expect(resultedConfig).toStrictEqual(expectedConfig);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const getUploadedKycDocumentsForUserParams: GetUploadedKycDocumentsForUserRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      let resultedPath, resultedBody, resultedConfig;
      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockImplementationOnce((path, body, config) => {
        resultedBody = body;
        resultedConfig = config;
        resultedPath = path;

        const axiosResponse = {
          data: {},
        } as AxiosResponse;
        return Promise.resolve(axiosResponse);
      });

      const expectedPath = `/user/${startKycVerificationParams.userUuid}/kyc/verification`;
      const expectedBody = {};
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.startKycVerification(startKycVerificationParams);

      // Assert
      expect(response.started).toBeTruthy();
      expect(resultedBody).toStrictEqual(expectedBody);
      expect(resultedPath).toStrictEqual(expectedPath);
      expect(resultedConfig).toStrictEqual(expectedConfig);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const startKycVerificationParams: StartKycVerificationRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      const axiosClient = {
        post: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      let resultedPath, resultedConfig;
      const expectedResponse: GetRequiredKycInformationResponse[] = [];
      for (let i = 0; i < faker.datatype.number(5); i++) {
        expectedResponse.push({
          documentClass: faker.word.noun(),
          documentType: getRandomDocumentType(),
        });
      }

      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'get').mockImplementationOnce((path, config) => {
        resultedConfig = config;
        resultedPath = path;

        type AuxResponse = {
          document_class: string;
          one_of_document_type: DocumentType;
        }[];
        const axiosResponse = {
          data: expectedResponse.map((item) => ({
            document_class: item.documentClass,
            one_of_document_type: item.documentType,
          })) as AuxResponse,
        } as AxiosResponse<AuxResponse>;
        return Promise.resolve(axiosResponse);
      });

      const expectedPath = `/user/${getRequiredKycInformationParams.userUuid}/kyc/verification`;

      const expectedConfig = {
        headers: {
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };
      const service = new KycService(props);
      // Act

      const response = await service.getRequiredKycInformation(getRequiredKycInformationParams);

      // Assert
      expect(response).toStrictEqual(expectedResponse);
      expect(resultedPath).toStrictEqual(expectedPath);
      expect(resultedConfig).toStrictEqual(expectedConfig);
    });

    // Sad
    it('Should throw expected error when an Axios Error Happens', async () => {
      // Arrange
      const getRequiredKycInformationParams: GetRequiredKycInformationRequest = {
        userUuid: faker.datatype.uuid(),
      };

      const axiosError = new AxiosError(undefined, undefined, undefined, undefined, {
        status: 500,
        data: {
          [faker.random.word()]: faker.datatype.string,
        },
      } as AxiosResponse);
      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
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
        userUuid: faker.datatype.uuid(),
      };

      const randomError = {
        [faker.random.word()]: faker.datatype.string,
      };

      const axiosClient = {
        get: jest.fn(),
      } as unknown as AxiosInstance;
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
