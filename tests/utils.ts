import { faker } from '@faker-js/faker';
import { DocumentSubType, DocumentType, SourceOfFundsType } from 'src/user/kyc/definitions';

export const getRandomSourceOfFundsType = (): SourceOfFundsType =>
  faker.helpers.arrayElement(['SALARY', 'BUSINESS_INCOME', 'PENSION', 'OTHER']);

export const getRandomDocumentType = (): DocumentType =>
  faker.helpers.arrayElement(['SELFIE', 'PASSPORT', 'DRIVERS', 'ID_CARD', 'RESIDENCE_PERMIT']);

export const getRandomDocumentSubType = (): DocumentSubType =>
  faker.helpers.arrayElement(['FRONT_SIDE', 'BACK_SIDE']);
