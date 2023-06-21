import { faker } from '@faker-js/faker';
import GetUnblock from '../src';
import { SDK } from '../src/SDK';

describe('index', () => {
  it('Should SDK be defined', () => {
    const sdk = GetUnblock({
      prodUrl: 'https://getunblock.com',
      sandBoxUrl: 'https://sandbox.getunblock.com',
      apiKey: `API-Key ${faker.datatype.string(128)}`,
      prod: false,
      timeoutMs: 10000,
    });
    expect(sdk).toBeInstanceOf(SDK);
  });
});
