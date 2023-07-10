import { faker } from '@faker-js/faker';
import { Chain } from '../../src/enums/Chain';
import { Currency } from '../../src/enums/Currency';
import {
  ArbitrumToken,
  CeloToken,
  MainnetToken,
  OptimismToken,
  PolygonToken,
} from '../../src/enums/Tokens';
import {
  TokenPreference,
  TokenPreferenceArbitrum,
  TokenPreferenceCelo,
  TokenPreferenceMainnet,
  TokenPreferenceOptimism,
  TokenPreferencePolygon,
} from '../../src/token-preference/definitions';

const tokenPreferencePolygonMock = (): TokenPreferencePolygon => ({
  currency: faker.helpers.arrayElement(Object.values(Currency)),
  chain: Chain.POLYGON,
  token: faker.helpers.arrayElement(Object.values(PolygonToken)),
});

const tokenPreferenceCeloMock = (): TokenPreferenceCelo => ({
  currency: faker.helpers.arrayElement(Object.values(Currency)),
  chain: Chain.CELO,
  token: faker.helpers.arrayElement(Object.values(CeloToken)),
});

const tokenPreferenceOptimismMock = (): TokenPreferenceOptimism => ({
  currency: faker.helpers.arrayElement(Object.values(Currency)),
  chain: Chain.OPTIMISM,
  token: faker.helpers.arrayElement(Object.values(OptimismToken)),
});

const tokenPreferenceMainnetMock = (): TokenPreferenceMainnet => ({
  currency: faker.helpers.arrayElement(Object.values(Currency)),
  chain: Chain.MAINNET,
  token: faker.helpers.arrayElement(Object.values(MainnetToken)),
});

const tokenPreferenceArbitrumMock = (): TokenPreferenceArbitrum => ({
  currency: faker.helpers.arrayElement(Object.values(Currency)),
  chain: Chain.ARBITRUM,
  token: faker.helpers.arrayElement(Object.values(ArbitrumToken)),
});

const tokenPreferenceMock = (): TokenPreference => {
  const preferenceMocks = [
    tokenPreferencePolygonMock(),
    tokenPreferenceCeloMock(),
    tokenPreferenceOptimismMock(),
    tokenPreferenceMainnetMock(),
    tokenPreferenceArbitrumMock(),
  ];
  return faker.helpers.arrayElement(preferenceMocks);
};

export const tokenPreferencesMock = (): TokenPreference[] => {
  const preferenceLength = faker.datatype.number({ min: 1, max: 5 });
  return Array.from({ length: preferenceLength }, tokenPreferenceMock);
};
