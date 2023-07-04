import { faker } from '@faker-js/faker';
import { SdkSettings } from '../../src/definitions';

export const propsMock: SdkSettings = {
  prodUrl: 'https://getunblock.com',
  sandBoxUrl: 'https://sandbox.getunblock.com',
  apiKey: `API-Key ${faker.datatype.string(64)}`,
  prod: faker.datatype.boolean(),
  timeoutMs: 10000,
};
