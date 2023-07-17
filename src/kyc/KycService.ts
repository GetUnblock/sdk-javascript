import { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import Country from '../enums/Country';
import { UserSessionDataNotSetError } from '../errors';
import {
  CreateKYCApplicantRequest,
  CreateKYCApplicantResponse,
  DocumentSubType,
  DocumentType,
  GetAccessTokenForUserApplicantResponse,
  GetRequiredKycInformationResponse,
  GetUploadedKycDocumentsForUserResponse,
  InitSumsubSdkRequest,
  InitSumsubSdkResponse,
  OnboardingRequest,
  OnboardingResponse,
  StartKycVerificationResponse,
  UploadKycDocumentRequest,
  UploadKycDocumentResponse,
} from './definitions';

export interface IKycService {
  createKYCApplicant(
    createKYCApplicantParams: CreateKYCApplicantRequest,
  ): Promise<CreateKYCApplicantResponse>;

  getAccessTokenForUserApplicant(): Promise<GetAccessTokenForUserApplicantResponse>;

  uploadKycDocument(
    uploadKycDocumentParams: UploadKycDocumentRequest,
  ): Promise<UploadKycDocumentResponse>;

  getUploadedKycDocumentsForUser(): Promise<GetUploadedKycDocumentsForUserResponse[]>;

  startKycVerification(): Promise<StartKycVerificationResponse>;

  getRequiredKycInformation(): Promise<GetRequiredKycInformationResponse[]>;

  onboarding(dto: OnboardingRequest): Promise<OnboardingResponse>;

  initSumsubSdk(dto: InitSumsubSdkRequest): Promise<InitSumsubSdkResponse>;
}

export class KycService extends BaseService implements IKycService {
  async createKYCApplicant(
    createKYCApplicantParams: CreateKYCApplicantRequest,
  ): Promise<CreateKYCApplicantResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/kyc/applicant`;
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
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      await this.axiosClient.put(path, body, config);

      return {
        created: true,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getAccessTokenForUserApplicant(): Promise<GetAccessTokenForUserApplicantResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/kyc/applicant/token`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
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
    uploadKycDocumentParams: UploadKycDocumentRequest,
  ): Promise<UploadKycDocumentResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/kyc/document`;
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
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

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

  async getUploadedKycDocumentsForUser(): Promise<GetUploadedKycDocumentsForUserResponse[]> {
    const { apiKey } = this.props;

    if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
      throw new UserSessionDataNotSetError();
    }

    try {
      const path = `/user/${this.props.userSessionData.userUuid}/kyc/document`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
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

  async startKycVerification(): Promise<StartKycVerificationResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/kyc/verification`;

      const config = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      await this.axiosClient.post(path, {}, config);

      return {
        started: true,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getRequiredKycInformation(): Promise<GetRequiredKycInformationResponse[]> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/kyc/verification`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<{
        required_documents: {
          document_class: string;
          one_of_document_type: DocumentType[];
        }[];
      }> = await this.axiosClient.get(path, config);

      return response.data.required_documents.map((item) => ({
        documentClass: item.document_class,
        documentTypes: item.one_of_document_type,
      }));
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async onboarding(dto: OnboardingRequest): Promise<OnboardingResponse> {
    const { applicantData, documentData } = dto;
    try {
      const applicant: CreateKYCApplicantResponse = await this.createKYCApplicant({
        ...applicantData,
      });

      const upload: UploadKycDocumentResponse = await this.uploadKycDocument({
        ...documentData,
      });

      const verification: StartKycVerificationResponse = await this.startKycVerification();

      return {
        applicantCreated: applicant.created,
        uploadUuid: upload.uploadUuid,
        verificationStarted: verification.started,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async initSumsubSdk(dto: InitSumsubSdkRequest): Promise<InitSumsubSdkResponse> {
    const { applicantData } = dto;
    try {
      const applicant: CreateKYCApplicantResponse = await this.createKYCApplicant({
        ...applicantData,
      });

      const sumsubSdk: GetAccessTokenForUserApplicantResponse =
        await this.getAccessTokenForUserApplicant();

      return {
        applicantCreated: applicant.created,
        token: sumsubSdk.token,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
