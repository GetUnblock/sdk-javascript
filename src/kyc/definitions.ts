import { UserSessionData } from '../definitions';
import Country from '../enums/Country';

export type SourceOfFundsType = 'SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER';

export type ApplicantData = {
  address: string;
  postcode: string;
  city: string;
  country: Country;
  dateOfBirth: Date;
  sourceOfFunds: SourceOfFundsType;
  sourceOfFundsDescription: string;
};

/** Request dto */
export type CreateKYCApplicantRequest = UserSessionData & ApplicantData;

/** Response dto */
export type CreateKYCApplicantResponse = {
  created: true;
};

/** Request dto */
export type GetAccessTokenForUserApplicantRequest = UserSessionData;

/** Response dto */
export type GetAccessTokenForUserApplicantResponse = {
  token: string;
};

/** KYC document type */
export type DocumentType = 'SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT';

/** KYC document subtype (side) */
export type DocumentSubType = 'FRONT_SIDE' | 'BACK_SIDE';

/** Upload document data */
export type UploadDocumentData = {
  content: string;
  filename: string;
  documentType: DocumentType;
  documentSubType?: DocumentSubType;
  country: Country;
};

/** Request dto */
export type UploadKycDocumentRequest = UserSessionData & UploadDocumentData;

/** Response dto */
export type UploadKycDocumentResponse = {
  uploadUuid: string;
};

/** Request dto */
export type GetUploadedKycDocumentsForUserRequest = UserSessionData;

/** Response dto */
export type GetUploadedKycDocumentsForUserResponse = {
  uuid: string;
  documentType: DocumentType;
  documentSubType?: DocumentSubType;
  name: string;
  country: Country;
  status: string;
  uploadErrors?: string;
  verificationErrors?: string;
  createdAt: string;
  updatedAt: string;
  checkUuid: string;
};

/** Request dto */
export type StartKycVerificationRequest = UserSessionData;

/** Response dto */
export type StartKycVerificationResponse = {
  started: true;
};

/** Request dto */
export type GetRequiredKycInformationRequest = UserSessionData;

/** Response dto */
export type GetRequiredKycInformationResponse = {
  documentClass: string;
  documentTypes: DocumentType[];
};

/** Request dto */
export type OnboardingRequest = {
  sessionData: UserSessionData;
  applicantData: ApplicantData;
  documentData: UploadDocumentData;
};

/** Response dto */
export type OnboardingResponse = {
  applicantCreated: boolean;
  uploadUuid: string;
  verificationStarted: boolean;
};
