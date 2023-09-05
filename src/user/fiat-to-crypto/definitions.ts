import { Currency } from '../../enums/Currency';

export type UnblockBankAccount = {
  uuid: string;
  currency: Currency;
  iban: string;
  bic: string;
  accountNumber: string;
  sortCode: string;
};

/** Request dto */
export type CreateUnblockUserBankAccountRequest = { currency: Currency };

/** Response dto */
export type CreateUnblockUserBankAccountResponse = UnblockBankAccount;

/** Response dto */
export type GetAllunblockUserBankAccountsResponse = UnblockBankAccount[];

/** Request dto */
export type GetUnblockBankAccountByUuidRequest = { accountUuid: string };

/** Response dto */
export type GetUnblockBankAccountByUuidResponse = UnblockBankAccount;

/** Request dto */
export type SimulateOnRampRequest = { accountUuid: string; value: number };
