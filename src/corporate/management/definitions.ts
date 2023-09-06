import { CorporateType } from '../../enums/CorporateType';
import { UserCorporateRole } from '../../enums/UserCorporateRole';

/** Corporate details type */
export type CorporateDetails = {
  /** The name of the corporate */
  legal_name: string;

  /** The type of the corporate */
  type: CorporateType;

  /** The registered address of the business */
  registeredAddress?: string;

  /** The city where the business is located */
  city: string;

  /**
   * The country from which the user accessed
   * Must be a valid ISO 3166-1 alpha-2 country code
   */
  country: string;

  /** The registration number of the business */
  registrationNumber: string;

  /** The contact name of the business */
  contactName: string;

  /** The contact phone number of the business */
  phone: string;

  /** The contact email of the business */
  email: string;

  /**
   * The industry sector type of the business
   * This is optional
   */
  industrySectorType?: string;

  /**
   * The industry sector value of the business
   * This is required if industrySectorType is 'OTHER'
   */
  industrySectorValue?: string;
};

/**  * The target Ethereum address type */
export type TargetAddress = {
  /** Must be a valid Ethereum address */
  targetAddress: string;
};

export type CorporationAddress = {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  country?: string;
  post_code?: string;
};

export type ContactDetails = {
  name: string;
  phone: string;
  email: string;
};

/** Request dto */
export type CreateCorporateRequest = {
  legal_name: string;
  type: CorporateType;
  registration_number?: string;
  contact_details: ContactDetails;
  registered_address: CorporationAddress;
  trading_address?: CorporationAddress;
  target_crypto_address?: string;
};

/** Request dto*/
export type UpdateCorporateRequest = CreateCorporateRequest & { corporate_uuid: string };

/** Request dto */
export type LinkUserToCorporateRequest = {
  corporateUuid: string;
  userUuid: string;
  role: UserCorporateRole;
};

/** Request dto*/
export type UnlinkUserFromCorporateRequest = {
  corporateUuid: string;
  corporateUserUuid: string;
};

/** Response dto */
export type CreateCorporateResponse = {
  status: string;
  corporate_uuid: string;
};

/** Response dto */
export type UpdateCorporateResponse = {
  message: string;
  uuid: string;
};

/** Response dto */
export type LinkUserToCorporateResponse = {
  message: string;
  uuid: string;
};

/** Response dto */
export type UnlinkUserFromCorporateResponse = {
  message: string;
  uuid: string;
};

// GetUnblock API types

/** Type for GetUnblock API endpoint*/
export type CorporateDetailsApiRequest = {
  name: string;
  type: CorporateType;
  registered_address?: string;
  city: string;
  country: string;
  registration_number: string;
  contact_name: string;
  phone: string;
  email: string;
  industry_sector_type?: string;
  industry_sector_value?: string;
};

/** Request Body for GetUnblock API endpoint*/
export type CreateCorporateApiRequestBody = CorporateDetailsApiRequest & {
  target_address: string;
};

/** Request Body for GetUnblock API endpoint*/
export type UpdateCorporateApiRequestBody = CorporateDetailsApiRequest;

/** Request Body for GetUnblock API endpoint*/
export type AddUserToCorporateApiRequestBody = {
  corporate_uuid: string;
  user_uuid: string;
  role: UserCorporateRole;
};

/** Response data from GetUnblock Api endpoint */
export type CreateCorporateApiResponseData = {
  message: string;
  uuid: string;
};

/** Response data from GetUnblock Api endpoint */
export type UpdateCorporateApiResponseData = {
  message: string;
  uuid: string;
};

/** Response data from GetUnblock Api endpoint */
export type AddUserToCorporateApiResponseData = {
  message: string;
  uuid: string;
};

/** Response data from GetUnblock Api endpoint */
export type RemoveUserFromCorporateApiResponseData = {
  message: string;
  uuid: string;
};

export type GetCorporateDetailsRequest = {
  corporate_uuid: string;
};

export enum CorporationStatus {
  CREATED = 'CREATED',
  KYB_NEEDED = 'KYB_NEEDED',
  PENDING_KYB_DATA = 'PENDING_KYB_DATA',
  KYB_PENDING = 'KYB_PENDING',
  SOFT_KYB_FAILED = 'SOFT_KYB_FAILED',
  HARD_KYB_FAILED = 'HARD_KYB_FAILED',
  FULL_CORPORATE = 'FULL_CORPORATE',
  SUSPENDED = 'SUSPENDED',
}

export type GetCorporateDetailsResponse = {
  legal_name: string;
  type: CorporateType;
  registration_number?: string;
  contact_details: ContactDetails;
  registered_address: CorporationAddress;
  trading_address?: CorporationAddress;
  target_address: string;
  status: CorporationStatus;
};

export type GetCorporateTransactionsRequest = {
  not_defined_yet: true;
};

export type GetCorporateTransactionsResponse = {
  not_defined_yet: true;
};

export type GetCorporateTokenPreferencesRequest = {
  not_defined_yet: true;
};

export type GetCorporateTokenPreferencesResponse = {
  not_defined_yet: true;
};

export type UpdateCorporateTokenPreferencesRequest = {
  not_defined_yet: true;
};

export type UpdateCorporateTokenPreferencesResponse = {
  not_defined_yet: true;
};
