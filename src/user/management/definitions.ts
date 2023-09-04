import { Chain } from '../../enums/Chain';
import Country from '../../enums/Country';
import { Currency } from '../../enums/Currency';
import { ProcessStatus } from '../../enums/ProcessStatus';
import {
  ArbitrumToken,
  CeloToken,
  MainnetToken,
  OptimismToken,
  PolygonToken,
} from '../../enums/Token';
import { UserStatus } from '../../enums/UserStatus';

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  targetAddress: string;
  country: Country;
};

export type CreateUserResponse = {
  message: string;
  userUuid: string;
  status: UserStatus;
};

export type GetUserStatusResponse = {
  status: UserStatus;
};

export type RampTransactionProcess = {
  uuid: string;
  status: ProcessStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type GetUserRampTransactionsResponse = {
  message: string;
  processes: {
    onramp: RampTransactionProcess[];
    offramp: RampTransactionProcess[];
  };
};

export type UpdateUserRequest = CreateUserRequest & {
  userUuid: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postCode: string;
};
export type UpdateUserResponse = {
  updated: true;
};

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

/** Mainnet token preference */
export type TokenPreferenceMainnet = {
  currency: Currency;
  chain: Chain.MAINNET;
  token: MainnetToken;
};

/** Arbitrum token preference */
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

/** Response dto */
export type GetUserTokenPreferenceResponse = TokenPreference[];

/** GetUnblock API response data */
export type GetUserTokenPreferenceResponseData = TokenPreference[];

/** Request dto */
export type UpdateUserTokenPreferencesRequest = {
  preferences: TokenPreference[];
};

/** Response dto */
export type UpdateUserTokenPreferencesResponse = { preferences: TokenPreference[] };

/** GetUnblock API request body */
export type UpdateUserTokenPreferenceRequestBody = TokenPreference[];

/** GetUnblock API response data */
export type UpdateUserTokenPreferencesResponseData = { preferences: TokenPreference[] };
