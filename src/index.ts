import { SDK } from './SDK';
import { SdkSettings } from './SdkSettings';
import { ServiceFactory } from './ServiceFactory';
import { SdkProps } from './definitions';

const GetUnblock = (props: SdkProps): SDK => {
  const settings = new SdkSettings(props.apiKey, props.prod);
  return new SDK(new ServiceFactory(settings));
};

// Types
export * from './general/auth/definitions';

export {
  CorporateDetails,
  CreateCorporateResponse,
  LinkUserToCorporateRequest,
  LinkUserToCorporateResponse,
  TargetAddress,
  UnlinkUserFromCorporateRequest,
  UnlinkUserFromCorporateResponse,
  UpdateCorporateResponse,
} from './corporate/management/definitions';

export { SdkProps } from './definitions';

export * from './user/kyc/definitions';

export {
  ChangeMainUserRemoteBankAccountRequest,
  CreateRemoteUserBankAccountRequest,
  CreateRemoteUserBankAccountResponse,
  EurAccountDetails,
  GbpAccountDetails,
  GetAllRemoteBankAccountsResponse,
  GetRemoteBankAccountByUuidRequest,
  GetRemoteBankAccountByUuidResponse,
  GetUserUnblockWalletRequest,
  GetUserUnblockWalletResponse,
  RemoteUserBankAccount,
} from './user/crypto-to-fiat/definitions';

export * from './general/process/definitions';

export {
  ExchangeRatesServiceRequest,
  ExchangeRatesServiceResponse,
  TransactionFeeEstRequest,
  TransactionFeeEstResponse,
} from './general/informative/definitions';

export {
  CreateUnblockUserBankAccountRequest,
  CreateUnblockUserBankAccountResponse,
  GetAllunblockUserBankAccountsResponse,
  GetUnblockBankAccountByIdRequest,
  GetUnblockBankAccountByIdResponse,
  SimulateOnRampRequest,
  SimulateOnRampResponse,
  UserBankAccount,
  UserBankAccountDetails,
  UserBankAccountFull,
} from './user/fiat-to-crypto/definitions';

export {
  CreateUserRequest,
  CreateUserResponse,
  GetUserRampTransactionsResponse,
  GetUserTokenPreferenceResponse,
  RampTransactionProcess,
  TokenPreference,
  TokenPreferenceArbitrum,
  TokenPreferenceCelo,
  TokenPreferenceMainnet,
  TokenPreferenceOptimism,
  TokenPreferencePolygon,
  UpdateUserRequest,
  UpdateUserTokenPreferencesRequest,
  UpdateUserTokenPreferencesResponse,
} from './user/management/definitions';

// Enums
export * from './enums/Chain';
export * from './enums/CorporateType';
export * from './enums/Country';
export * from './enums/Currency';
export * from './enums/PaymentMethods';
export * from './enums/ProcessDirection';
export * from './enums/ProcessStatus';
export * from './enums/Token';
export * from './enums/UserCorporateRole';
export * from './enums/UserStatus';

// Default
export default GetUnblock;
