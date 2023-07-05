import { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import Country from '../enums/Country';
import {
  CreateKYCApplicantRequest,
  CreateKYCApplicantResponse,
  DocumentSubType,
  DocumentType,
  GetAccessTokenForUserApplicantRequest,
  GetAccessTokenForUserApplicantResponse,
  GetRequiredKycInformationRequest,
  GetRequiredKycInformationResponse,
  GetUploadedKycDocumentsForUserRequest,
  GetUploadedKycDocumentsForUserResponse,
  StartKycVerificationRequest,
  StartKycVerificationResponse,
  UploadKycDocumentRequest,
  UploadKycDocumentResponse,
} from './definitions';

export interface IKycService {
  createKYCApplicant(
    createKYCApplicantParams: CreateKYCApplicantRequest,
  ): Promise<CreateKYCApplicantResponse>;

  getAccessTokenForUserApplicant(
    getAccessTokenForUserApplicantParams: GetAccessTokenForUserApplicantRequest,
  ): Promise<GetAccessTokenForUserApplicantResponse>;

  uploadKycDocument(
    uploadKycDocumentParams: UploadKycDocumentRequest,
  ): Promise<UploadKycDocumentResponse>;

  getUploadedKycDocumentsForUser(
    getUploadedKycDocumentsForUserParams: GetUploadedKycDocumentsForUserRequest,
  ): Promise<GetUploadedKycDocumentsForUserResponse[]>;

  startKycVerification(
    startKycVerificationParams: StartKycVerificationRequest,
  ): Promise<StartKycVerificationResponse>;

  getRequiredKycInformation(
    getRequiredKycInformationParams: GetRequiredKycInformationRequest,
  ): Promise<GetRequiredKycInformationResponse[]>;
}

export class KycService extends BaseService implements IKycService {
  async createKYCApplicant(
    createKYCApplicantParams: CreateKYCApplicantRequest,
  ): Promise<CreateKYCApplicantResponse> {
    const { apiKey } = this.props;

    const path = `/user/${createKYCApplicantParams.userUuid}/kyc/applicant`;
    const body = {
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

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      await this.axiosClient.put(path, body, config);

      return {
        created: true,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getAccessTokenForUserApplicant(
    getAccessTokenForUserApplicantParams: GetAccessTokenForUserApplicantRequest,
  ): Promise<GetAccessTokenForUserApplicantResponse> {
    const { apiKey } = this.props;

    const path = `/user/${getAccessTokenForUserApplicantParams.userUuid}/kyc/applicant/token`;

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };
    try {
      const response: AxiosResponse<{
        token: string;
      }> = await this.axiosClient.get(path, config);

      return {
        token: response.data.token,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async uploadKycDocument(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uploadKycDocumentParams: UploadKycDocumentRequest,
  ): Promise<UploadKycDocumentResponse> {
    const { apiKey } = this.props;

    const path = `/user/${uploadKycDocumentParams.userUuid}/kyc/document`;
    const body = {
      content: uploadKycDocumentParams.content,
      filename: uploadKycDocumentParams.filename,
      document_type: uploadKycDocumentParams.documentType,
      document_subtype: uploadKycDocumentParams.documentSubType,
      country: uploadKycDocumentParams.country,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<{ upload_uuid: string }> = await this.axiosClient.put(
        path,
        body,
        config,
      );

      return {
        uploadUuid: response.data.upload_uuid,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getUploadedKycDocumentsForUser(
    getUploadedKycDocumentsForUserParams: GetUploadedKycDocumentsForUserRequest,
  ): Promise<GetUploadedKycDocumentsForUserResponse[]> {
    const { apiKey } = this.props;

    const path = `/user/${getUploadedKycDocumentsForUserParams.userUuid}/kyc/document`;

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };
    try {
      const response: AxiosResponse<
        {
          uuid: string;
          doc_type: DocumentType;
          doc_subtype?: DocumentSubType;
          name: string;
          country: Country;
          status: string;
          upload_errors?: string;
          verification_errors?: string;
          created_at: string;
          updated_at: string;
          check_uuid: string;
        }[]
      > = await this.axiosClient.get(path, config);

      return response.data.map((item) => ({
        checkUuid: item.check_uuid,
        country: item.country,
        createdAt: item.created_at,
        documentType: item.doc_type,
        name: item.name,
        status: item.status,
        updatedAt: item.updated_at,
        uuid: item.uuid,
        documentSubType: item.doc_subtype,
        uploadErrors: item.upload_errors,
        verificationErrors: item.verification_errors,
      }));
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async startKycVerification(
    startKycVerificationParams: StartKycVerificationRequest,
  ): Promise<StartKycVerificationResponse> {
    const { apiKey } = this.props;

    const path = `/user/${startKycVerificationParams.userUuid}/kyc/verification`;

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      await this.axiosClient.post(path, {}, config);

      return {
        started: true,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getRequiredKycInformation(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRequiredKycInformationParams: GetRequiredKycInformationRequest,
  ): Promise<GetRequiredKycInformationResponse[]> {
    const { apiKey } = this.props;

    const path = `/user/${getRequiredKycInformationParams.userUuid}/kyc/verification`;

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };
    try {
      const response: AxiosResponse<
        {
          document_class: string;
          one_of_document_type: DocumentType;
        }[]
      > = await this.axiosClient.get(path, config);

      return response.data.map((item) => ({
        documentClass: item.document_class,
        documentType: item.one_of_document_type,
      }));
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
