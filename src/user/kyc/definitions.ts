import Country from '../../enums/Country';

export type SourceOfFundsType = 'SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER';

/** Address Details */
export type AddressDetails =
  {
    address_line_1: string,
    address_line_2: string,
    post_code: string,
    city: string,
    country: Country
  };

/** Aplicant Data */
export type ApplicantData = {
  address: AddressDetails
  dateOfBirth: Date;
  sourceOfFunds: SourceOfFundsType;
};

/** Document Object */
export type DocumentObject = {
  docType : DocumentType,
  docSubtype: DocumentSubType
};

/** KYC statuses */
export type KycStatuses = 'KYC_NEEDED' | 'PENDING_KYC_DATA' | 'KYC_PENDING' | 'SOFT_KYC_FAILED' | 'HARD_KYC_FAILED';

/** User statuses patching*/
export type UserStatusesPatchSandbox =  'FULL_USER' | 'SOFT_KYC_FAILED' | 'HARD_KYC_FAILED'


/** KYC document type */
export type DocumentType = 'SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' ;

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
export type CreateKYCApplicantRequest = ApplicantData;

/** Response dto */
export type CreateKYCApplicantResponse = {};

/** Response dto */
export type GetKYCApplicationResponse = {
  status: KycStatuses
  docsMissing?: DocumentObject[],
  kycEnduserErrorMessage?: string,
  kcyRejectLabel?: string
}

/** Response dto */
export type GetSumsubTokenForIDVCollectionResponse = {
  token: string;
};

/** Response dto */
export type InitSumsubSdkResponse = {
  token: string;
};

/** Request dto */
export type OnboardingRequest = {
  applicantData: ApplicantData;
  documentData: UploadDocumentData;
};

/** Response dto */
export type OnboardingResponse = {
  verificationStarted: boolean;
};

/** Request dto */
export type InitSumsubSdkRequest = {
  applicantData: ApplicantData;
};

export type InitSumsubSdkResponse = {
  token: string;
};

/** Request dto */
export type UploadKycDocumentRequest = UploadDocumentData;

/** Response dto */
export type UploadKycDocumentResponse = {};

/** Response dto */
export type StartKycVerificationResponse = {};

/** Response dto */
export type PatchKYCVerificationStatusSandboxRequest = {
  status: UserStatusesPatchSandbox;
};

/** Response dto */
export type PatchKYCVerificationStatusSandboxResponse = {};



