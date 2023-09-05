import { Chain } from '../../enums/Chain';
import { Currency } from '../../enums/Currency';

export type GbpAccountDetails = {
  accountNumber: string;
  sortCode: string;
};

export type EurAccountDetails = {
  iban: string;
};

export type AccountDetails =
  | ({ currency: Currency.EURO } & EurAccountDetails)
  | ({ currency: Currency.GBP } & GbpAccountDetails);

export type RemoteUserBankAccount = {
  uuid: string;
  iban: string;
  bic: string;
  accountNumber: string;
  sortCode: string;
  mainBeneficiary: boolean;
  currency: Currency;
};

/** Request dto */
export type GetUserUnblockWalletRequest = { chain: Chain };

/** Response dto */
export type GetUserUnblockWalletResponse = { chain: Chain; address: string }[];

/** GetUnblock API response data */
export type GetUserUnblockWalletResponseData = GetUserUnblockWalletResponse;

/** Request dto */
export type CreateRemoteUserBankAccountRequest = {
  accountName: string;
  mainBeneficiary: boolean;
  accountDetails: AccountDetails;
};

/** Response dto */
export type CreateRemoteUserBankAccountResponse = {
  uuid: string;
};

/** Response dto */
export type GetAllRemoteBankAccountsResponse = RemoteUserBankAccount[];

/** Request dto */
export type ChangeMainUserRemoteBankAccountRequest = { remoteBankAccountUuid: string };

/** Request dto */
export type GetRemoteBankAccountByUuidRequest = { remoteBankAccountUuid: string };

/** Response dto */
export type GetRemoteBankAccountByUuidResponse = RemoteUserBankAccount;

/** GetUnblock API request body */
export type UnblockGbpAccountDetails = {
  currency: Currency; // ISO-4217 currency code
  account_number: string;
  sort_code: string;
};

/** GetUnblock API request body */
export type UnblockEurAccountDetails = {
  currency: Currency; // ISO-4217 currency code
  iban: string;
};

/** GetUnblock API response data */
export type UnblockRemoteUserBankAccount = {
  uuid: string;
  iban: string;
  bic: string;
  account_number: string;
  sort_code: string;
  main_beneficiary: boolean;
  currency: Currency;
};
