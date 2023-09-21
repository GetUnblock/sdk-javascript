import { faker } from '@faker-js/faker';
import { SdkSettings } from '../../src/SdkSettings';

export const propsMock = (): SdkSettings =>
  new SdkSettings(`API-Key ${faker.datatype.string(64)}`, false);
