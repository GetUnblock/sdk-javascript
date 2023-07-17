import Country from '../enums/Country';

export type GbpAccountDetails = {
  currency: string; // ISO-4217 currency code
  accountNumber: string;
  sortCode: string;
};

export type EurAccountDetails = {
  currency: string; // ISO-4217 currency code
  iban: string;
};

export type CreateRemoteUserBankAccount = {
  accountName: string;
  accountCountry: Country; // ISO-3166 alpha-2 country code
  beneficiaryCountry: string;
  mainBeneficiary: boolean;
  accountDetails: GbpAccountDetails | EurAccountDetails;
};

export type RemoteUserBankAccount = {
  firstName: string;
  lastName: string;
  currency: string;
  mainBeneficiary: boolean;
  iban: string;
  bic: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
  accountName: string;
  bankName: string;
  uuid: string;
  sortCode: string;
};

/** Request dto */
export type CreateRemoteUserBankAccountRequest = CreateRemoteUserBankAccount;

/** Request dto */
export type ChangeMainUserRemoteBankAccountRequest = { accountUuid: string };

/** Request dto */
export type GetRemoteBankAccountByUuidRequest = { accountUuid: string };

/** Response dto */
export type CreateRemoteUserBankAccountResponse = RemoteUserBankAccount;

/** Response dto */
export type GetAllRemoteBankAccountsResponse = RemoteUserBankAccount;

/** Response dto */
export type GetRemoteBankAccountByUuidResponse = RemoteUserBankAccount;

/** GetUnblock API request body */
export type UnblockGbpAccountDetails = {
  currency: string; // ISO-4217 currency code
  account_number: string;
  sort_code: string;
};

/** GetUnblock API request body */
export type UnblockEurAccountDetails = {
  currency: string; // ISO-4217 currency code
  iban: string;
};

/** GetUnblock API request body */
export type UnblockCreateRemoteUserBankAccount = {
  account_name: string;
  account_country: Country; // ISO-3166 alpha-2 country code
  beneficiary_country: string;
  main_beneficiary: boolean;
  account_details: UnblockGbpAccountDetails | UnblockEurAccountDetails;
};

/** GetUnblock API response data */
export type UnblockRemoteUserBankAccount = {
  first_name: string;
  last_name: string;
  currency: string;
  main_beneficiary: boolean;
  iban: string;
  bic: string;
  account_number: string;
  created_at: string;
  updated_at: string;
  account_name: string;
  bank_name: string;
  uuid: string;
  sort_code: string;
};
