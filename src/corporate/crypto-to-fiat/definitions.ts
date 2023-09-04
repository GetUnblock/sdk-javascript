import { Chain } from '../../enums/Chain';
import { Currency } from '../../enums/Currency';

type EURAccountDetails = {
  iban: string;
};

type GBPAccountDetails = {
  accountNumber: string;
  sortCode: string;
};

type AccountDetails =
  | ({ currency: Currency.EURO } & EURAccountDetails)
  | ({ currency: Currency.GBP } & GBPAccountDetails);

type RemoteBankAccount = {
  uuid: string;
  iban: string;
  bic: string;
  accountNumber: string;
  sortCode: string;
  mainBeneficiary: boolean;
  currency: Currency;
};

export type GetCorporateUnblockWalletRequest = {
  corporateUuid: string;
  chain: Chain;
};

export type GetCorporateUnblockWalletResponse = {
  chain: Chain;
  address: string;
};

export type CreateCorporateRemoteBankAccountRequest = {
  corporateUuid: string;
  accountName: string;
  mainRemoteBankAccount: boolean;
  accountDetails: AccountDetails;
};

export type CreateCorporateRemoteBankAccountResponse = {
  uuid: string;
};

export type GetCorporateRemoteBankAccountsRequest = {
  corporateUuid: string;
};

export type GetCorporateRemoteBankAccountsResponse = [RemoteBankAccount];

export type UpdateCorporateMainRemoteBankAccountRequest = {
  corporateUuid: string;
  remoteBankAccountUuid: string;
};

export type GetCorporateRemoteBankAccountDetailsRequest = {
  corporateUuid: string;
  remoteBankAccountUuid: string;
};

export type GetCorporateRemoteBankAccountDetailsResponse = RemoteBankAccount;
