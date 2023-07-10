import { UserSessionData } from '../definitions';
import { Chain } from '../enums/Chain';
import { Currency } from '../enums/Currency';
import {
  ArbitrumToken,
  CeloToken,
  MainnetToken,
  OptimismToken,
  PolygonToken,
} from '../enums/Tokens';

/** Polygon token preference */
export type TokenPreferencePolygon = {
  currency: Currency;
  chain: Chain.POLYGON;
  token: PolygonToken;
};

/** Celo token preference */
export type TokenPreferenceCelo = {
  currency: Currency;
  chain: Chain.CELO;
  token: CeloToken;
};

/** Optimism token preference */
export type TokenPreferenceOptimism = {
  currency: Currency;
  chain: Chain.OPTIMISM;
  token: OptimismToken;
};

/** Optimism token preference */
export type TokenPreferenceMainnet = {
  currency: Currency;
  chain: Chain.MAINNET;
  token: MainnetToken;
};

/** Optimism token preference */
export type TokenPreferenceArbitrum = {
  currency: Currency;
  chain: Chain.ARBITRUM;
  token: ArbitrumToken;
};

/** Token Preferences */
export type TokenPreference =
  | TokenPreferencePolygon
  | TokenPreferenceCelo
  | TokenPreferenceOptimism
  | TokenPreferenceMainnet
  | TokenPreferenceArbitrum;

/** Request dto */
export type GetUserTokenPreferencesRequest = UserSessionData;

/** Response dto */
export type GetUserTokenPreferenceResponse = TokenPreference[];

/** GetUnblock API response data */
export type GetUserTokenPreferenceResponseData = TokenPreference[];

/** Request dto */
export type UpdateUserTokenPreferencesRequest = UserSessionData & {
  preferences: TokenPreference[];
};

/** Response dto */
export type UpdateUserTokenPreferencesResponse = { preferences: TokenPreference[] };

/** GetUnblock API request body */
export type UpdateUserTokenPreferenceRequestBody = TokenPreference[];

/** GetUnblock API response data */
export type UpdateUserTokenPreferencesResponseData = { preferences: TokenPreference[] };
