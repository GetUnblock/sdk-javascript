import { faker } from '@faker-js/faker';
import { DocumentSubType, DocumentType, SourceOfFundsType } from 'src/user/kyc/definitions';
import { RemoteBankAccount } from '../src/corporate/crypto-to-fiat/definitions';
import { UnblockBankAccount } from '../src/corporate/fiat-to-crypto/definitions';

export const getRandomSourceOfFundsType = (): SourceOfFundsType =>
  faker.helpers.arrayElement(['SALARY', 'BUSINESS_INCOME', 'PENSION', 'OTHER']);

export const getRandomDocumentType = (): DocumentType =>
  faker.helpers.arrayElement(['SELFIE', 'PASSPORT', 'DRIVERS', 'ID_CARD', 'RESIDENCE_PERMIT']);

export const getRandomDocumentSubType = (): DocumentSubType =>
  faker.helpers.arrayElement(['FRONT_SIDE', 'BACK_SIDE']);

export const apiUnblockBankAccountToCamelCase = (apiBankAccount: {
  [key: string]: any;
}): UnblockBankAccount => {
  return {
    uuid: apiBankAccount.uuid,
    iban: apiBankAccount.iban,
    bic: apiBankAccount.bic,
    currency: apiBankAccount.currency,
    sortCode: apiBankAccount.sort_code,
    accountNumber: apiBankAccount.account_number,
  };
};

export const apiRemoteBankAccountToCamelCase = (apiRemoteBankAccount: {
  [key: string]: any;
}): RemoteBankAccount => {
  return {
    uuid: apiRemoteBankAccount.uuid,
    iban: apiRemoteBankAccount.iban,
    bic: apiRemoteBankAccount.bic,
    accountNumber: apiRemoteBankAccount.account_number,
    sortCode: apiRemoteBankAccount.sort_code,
    mainBeneficiary: apiRemoteBankAccount.main_beneficiary,
    currency: apiRemoteBankAccount.currency,
  };
};
