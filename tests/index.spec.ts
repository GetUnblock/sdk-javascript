import { faker } from '@faker-js/faker';
import GetUnblock from '../src';
import { SDK } from '../src/SDK';

describe('index', () => {
  it('Should SDK be defined', () => {
    const sdk = GetUnblock({
      apiKey: `API-Key ${faker.datatype.string(128)}`,
      prod: false,
    });
    expect(sdk).toBeInstanceOf(SDK);
  });
});
