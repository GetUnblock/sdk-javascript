import { Currency } from '../../enums/Currency';

export type UnblockBankAccount = {
  uuid: string;
  currency: Currency;
  iban: string;
  bic: string;
  accountNumber: string;
  sortCode: string;
};
export type CreateCorporateUnblockBankAccountRequest = {
  corporateUuid: string;
  currency: Currency;
};

export type CreateCorporateUnblockBankAccountResponse = UnblockBankAccount;

export type GetCorporateUnblockBankAccountsRequest = {
  corporateUuid: string;
};

export type GetCorporateUnblockBankAccountsResponse = UnblockBankAccount[];

export type GetCorporateUnblockBankAccountRequest = {
  corporateUuid: string;
  accountUuid: string;
};

export type GetCorporateUnblockBankAccountResponse = UnblockBankAccount;

export type SimulateFiatToCryptoRequest = {
  corporateUuid: string;
  accountUuid: string;
  value: number;
};
