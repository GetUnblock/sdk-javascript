import { faker } from '@faker-js/faker';
import { DocumentSubType, DocumentType, SourceOfFundsType } from 'src/kyc/definitions';

export const getRandomFromEnum = <T>(
  enumeration:
    | {
        [s: string]: T;
      }
    | ArrayLike<T>,
): T => {
  const enumValues = Object.values(enumeration);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex] as T[keyof T] as T;
};

export const getRandomSourceOfFundsType = (): SourceOfFundsType =>
  faker.helpers.arrayElement(['SALARY', 'BUSINESS_INCOME', 'PENSION', 'OTHER']);

export const getRandomDocumentType = (): DocumentType =>
  faker.helpers.arrayElement(['SELFIE', 'PASSPORT', 'DRIVERS', 'ID_CARD', 'RESIDENCE_PERMIT']);

export const getRandomDocumentSubType = (): DocumentSubType =>
  faker.helpers.arrayElement(['FRONT_SIDE', 'BACK_SIDE']);
