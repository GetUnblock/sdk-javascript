import { faker } from '@faker-js/faker';
import { SdkSettings } from '../../src/definitions';

export const propsMock: SdkSettings = {
  apiKey: `API-Key ${faker.datatype.string(64)}`,
  prod: faker.datatype.boolean(),
  sandBoxUrl: 'https://sandbox.getunblock.com',
  prodUrl: 'https://getunblock.com',
  timeoutMs: 10000,
};
