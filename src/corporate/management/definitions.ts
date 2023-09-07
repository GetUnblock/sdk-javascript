import { CorporateType } from '../../enums/CorporateType';
import { UserCorporateRole } from '../../enums/UserCorporateRole';
import { ProcessStatus } from '../../enums/ProcessStatus';
import { Currency } from '../../enums/Currency';
import { StableToken } from '../../enums/Token';
import { Chain } from '../../enums/Chain';

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

/** Request Body for GetUnblock API endpoint*/
export type AddUserToCorporateApiRequestBody = {
  corporate_uuid: string;
  user_uuid: string;
  role: UserCorporateRole;
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
  corporate_uuid: string;
};

export type Transaction = {
  amount: number;
  currency: Currency | StableToken;
  transaction_id: string;
};

export enum NewProcessDirection {
  FiatToCrypto = 'fiatToCrypto',
  CryptoToFiat = 'cryptoToFiat',
}

export type GetCorporateTransactionsResponse = {
  status: ProcessStatus;
  user_uuid: string;
  direction: NewProcessDirection;
  input: Transaction;
  output: Transaction;
};

export type GetCorporateTokenPreferencesRequest = {
  corporate_uuid: string;
};

export type GetCorporateTokenPreferencesResponse = {
  currency: Currency;
  chain: Chain;
  token: StableToken;
};

export type UpdateCorporateTokenPreferencesRequest = GetCorporateTokenPreferencesResponse &
  GetCorporateTokenPreferencesRequest;
