export type UserBankAccount = {
  currency: string; // ISO-4217 currency code
  createdAt: string;
  updatedAt: string;
  uuid: string;
};

export type UserBankAccountDetails = {
  bic: string;
  accountNumber: string;
  iban: string;
  holderName: string;
  currentBalance: number;
  availableBalance: number;
  sortCode: string;
};

export type UserBankAccountFull = UserBankAccount & UserBankAccountDetails;

/** Request dto */
export type CreateUnblockUserBankAccountRequest = { currency: string };

/** Request dto */
export type SimulateOnRampRequest = { currency: string; value: number };

/** Request dto */
export type GetUnblockBankAccountByIdRequest = { accountUuid: string };

/** Response dto */
export type CreateUnblockUserBankAccountResponse = UserBankAccount;

/** Response dto */
export type GetAllunblockUserBankAccountsResponse = UserBankAccount[];

/** Response dto */
export type SimulateOnRampResponse = { message: string };

/** Response dto */
export type GetUnblockBankAccountByIdResponse = UserBankAccountFull;

/** GetUnblock API response data */
export type UnblockUserBankAccount = {
  currency: string; // ISO-4217 currency code
  created_at: string;
  updated_at: string;
  uuid: string;
};

/** GetUnblock API response data */
export type UnblockUserBankAccountDetails = {
  bic: string;
  account_number: string;
  iban: string;
  holder_name: string;
  current_balance: number;
  available_balance: number;
  sort_code: string;
};

/** GetUnblock API response data */
export type UnblockUserBankAccountFull = UnblockUserBankAccount & UnblockUserBankAccountDetails;
