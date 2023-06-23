import Country from '../enums/Country';

export type SourceOfFundsType = 'SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER';
export type CreateKYCApplicantRequest = {
  userUuid: string;
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

export type GetAccessTokenForUserApplicantRequest = {
  userUuid: string;
};

export type GetAccessTokenForUserApplicantResponse = {
  token: string;
};

export type DocumentType = 'SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT';
export type DocumentSubType = 'FRONT_SIDE' | 'BACK_SIDE';
export type UploadKycDocumentRequest = {
  userUuid: string;
  content: string;
  filename: string;
  documentType: DocumentType;
  documentSubType?: DocumentSubType;
  country: Country;
};

export type UploadKycDocumentResponse = {
  uploadUuid: string;
};

export type GetUploadedKycDocumentsForUserRequest = {
  userUuid: string;
};

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

export type StartKycVerificationRequest = {
  userUuid: string;
};

export type StartKycVerificationResponse = {
  started: true;
};

export type GetRequiredKycInformationRequest = {
  userUuid: string;
};

export type GetRequiredKycInformationResponse = {
  documentClass: string;
  documentType: string;
};
