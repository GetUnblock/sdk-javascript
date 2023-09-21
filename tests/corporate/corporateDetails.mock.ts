import { faker } from '@faker-js/faker';
import { Currency } from '../../src';
import { CorporateType } from '../../src/enums/CorporateType';
import { CreateCorporateRequest } from '../../src/corporate/management/definitions';

export const corporateDetailsMock = (): CreateCorporateRequest => {
  const companyType = faker.helpers.arrayElement(Object.values(CorporateType));
  return {
    contact_details: {
      name: faker.name.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    },
    legal_name: faker.company.name(),
    type: companyType,
    registered_address: {
      city: faker.address.city(),
      country: faker.address.countryCode(),
    },
  };
};

export const unblockBankAccountApiMock = (): { [key: string]: any } => {
  return {
    uuid: faker.datatype.uuid(),
    iban: faker.finance.iban(),
    bic: faker.finance.bic(),
    sort_code: faker.finance.account(),
    account_number: faker.finance.account(),
    currency: faker.helpers.arrayElement(Object.values(Currency)),
  };
};
