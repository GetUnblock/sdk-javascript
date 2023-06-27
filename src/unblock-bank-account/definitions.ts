// TYPES
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

export type UserSessionData = {
  unblockSessionID: string;
  userUuid: string;
};

// REQUESTS DTO
export type CreateUnblockUserBankAccountRequest = UserSessionData & { currency: string };
export type GetAllunblockUserBankAccountsRequest = UserSessionData;
export type SimulateOnRampRequest = UserSessionData & { currency: string; value: number };
export type GetUnblockBankAccountByIdRequest = UserSessionData & { accountUuid: string };

// RESPONSES DTO
export type CreateUnblockUserBankAccountResponse = UserBankAccount;
export type GetAllunblockUserBankAccountsResponse = UserBankAccount[];
export type SimulateOnRampResponse = { message: string };
export type GetUnblockBankAccountByIdResponse = UserBankAccountFull;

// UNBLOCK API TYPES
// REQUESTS

// RESPONSES
export type UnblockUserBankAccount = {
  currency: string; // ISO-4217 currency code
  created_at: string;
  updated_at: string;
  uuid: string;
};

export type UnblockUserBankAccountDetails = {
  bic: string;
  account_number: string;
  iban: string;
  holder_name: string;
  current_balance: number;
  available_balance: number;
  sort_code: string;
};

export type UnblockUserBankAccountFull = UnblockUserBankAccount & UnblockUserBankAccountDetails;
