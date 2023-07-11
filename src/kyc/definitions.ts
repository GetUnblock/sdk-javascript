import { UserSessionData } from '../definitions';
import Country from '../enums/Country';

export type SourceOfFundsType = 'SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER';

export type CreateKYCApplicantRequest = UserSessionData & {
  address: string;
  postcode: string;
  city: string;
  country: Country;
  dateOfBirth: Date;
  sourceOfFunds: SourceOfFundsType;
  sourceOfFundsDescription: string;
};

export type CreateKYCApplicantResponse = {
  created: true;
};

export type GetAccessTokenForUserApplicantRequest = UserSessionData;

export type GetAccessTokenForUserApplicantResponse = {
  token: string;
};

export type DocumentType = 'SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT';
export type DocumentSubType = 'FRONT_SIDE' | 'BACK_SIDE';
export type UploadKycDocumentRequest = UserSessionData & {
  content: string;
  filename: string;
  documentType: DocumentType;
  documentSubType?: DocumentSubType;
  country: Country;
};

export type UploadKycDocumentResponse = {
  uploadUuid: string;
};

export type GetUploadedKycDocumentsForUserRequest = UserSessionData;

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

export type StartKycVerificationRequest = UserSessionData;

export type StartKycVerificationResponse = {
  started: true;
};

export type GetRequiredKycInformationRequest = UserSessionData;

export type GetRequiredKycInformationResponse = {
  documentClass: string;
  documentTypes: DocumentType[];
};
