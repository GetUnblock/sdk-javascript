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
  userUuid: string;
  status: UserStatus;
};

type UserAddress = {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  country?: string;
  post_code?: string;
};

export type GetUserResponse = {
  uuid: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  target_address?: string;
  email: string;
  address: UserAddress;
  status: string;
  linked_corporates_uuid: string[];
};

type ProcessInput = {
  amount: number;
  currency: string;
  transaction_id: string;
};

type ProcessOutput = {
  amount: number | undefined;
  currency: string;
  transaction_id: string | undefined;
};

export enum ExternalProcessDirection {
  CRYPTO_TO_FIAT = 'cryptoToFiat',
  FIAT_TO_CRYPTO = 'fiatToCrypto',
}

export type ProcessDetails = {
  status: ProcessStatus;
  user_uuid: string;
  direction: ExternalProcessDirection;
  input: ProcessInput;
  output?: ProcessOutput;
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

export type UpdateUserRequest = {
  target_address?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  email?: string;
  address?: UserAddress;
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
