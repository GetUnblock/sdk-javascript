import { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import Country from '../../enums/Country';
import { UserSessionDataNotSetError } from '../../errors';
import {
  CreateKYCApplicantRequest,
  CreateKYCApplicantResponse,
  DocumentSubType,
  DocumentType,
  GetKYCApplicationResponse,
  GetSumsubTokenForIDVCollectionResponse,
  PatchKYCVerificationStatusSandboxRequest,
  PatchKYCVerificationStatusSandboxResponse,
  StartKycVerificationResponse,
  UploadKycDocumentRequest,
  UploadKycDocumentResponse,
  InitSumsubSdkRequest,
  InitSumsubSdkResponse,
  OnboardingRequest,
  OnboardingResponse
} from './definitions';

export interface IKycService {
  createKYCApplicant(
    createKYCApplicantParams: CreateKYCApplicantRequest,
  ): Promise<CreateKYCApplicantResponse>;

  getKYCApplication(): Promise<GetKYCApplicationResponse>;

  getSumsubTokenForIDVCollection(): Promise<GetSumsubTokenForIDVCollectionResponse>;

  uploadKycDocument(
    uploadKycDocumentParams: UploadKycDocumentRequest,
  ): Promise<UploadKycDocumentResponse>;

  startKycVerification(): Promise<StartKycVerificationResponse>;

  patchKYCVerificationStatusSandbox(dto: PatchKYCVerificationStatusSandboxRequest): Promise<PatchKYCVerificationStatusSandboxResponse>;

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
        date_of_birth: DateTime.fromJSDate(createKYCApplicantParams.dateOfBirth).toFormat(
          'yyyy-MM-dd',
        ),
        source_of_funds: createKYCApplicantParams.sourceOfFunds,
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

  async getKYCApplication(): Promise<GetKYCApplicationResponse> {
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
      const response: AxiosResponse<GetKYCApplicationResponse> = await this.axiosClient.get(path, config);

      return response;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getSumsubTokenForIDVCollection(): Promise<GetSumsubTokenForIDVCollectionResponse> {
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

  async patchKYCVerificationStatusSandbox(
    patchKYCVerificationStatusSandboxParams: PatchKYCVerificationStatusSandboxRequest,
  ): Promise<PatchKYCVerificationStatusSandboxResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/kyc/document`;
      const body = {
        status: patchKYCVerificationStatusSandboxParams.status,
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

      return {};
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
        verificationStarted: true,
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

      const sumsubSdk: GetSumsubTokenForIDVCollectionResponse =
        await this.getSumsubTokenForIDVCollection();

      return {
        token: sumsubSdk.token,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
