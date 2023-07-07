import { faker } from '@faker-js/faker';
import { CompanyDetails } from '../../src/company/definitions';
import { CompanyType } from '../../src/enums/CompanyType';

export const companyDetailsMock = (): CompanyDetails => {
  const companyType = faker.helpers.arrayElement(Object.values(CompanyType));
  const randomChoice = faker.datatype.number({ min: 1, max: 100 });

  let industrySectorType;
  if (randomChoice <= 34) {
    industrySectorType = faker.commerce.department();
  } else if (randomChoice <= 67) {
    industrySectorType = 'OTHER';
  }

  const industrySectorValue =
    industrySectorType === 'OTHER' ? faker.commerce.productMaterial() : undefined;

  return {
    name: faker.company.name(),
    type: companyType,
    registeredAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    country: faker.address.countryCode(),
    registrationNumber: faker.datatype.uuid(),
    contactName: faker.name.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    industrySectorType: industrySectorType,
    industrySectorValue: industrySectorValue,
  };
};
