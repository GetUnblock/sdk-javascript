import { SDK } from './SDK';
import { SdkSettings } from './SdkSettings';
import { ServiceFactory } from './ServiceFactory';
import { SdkProps } from './definitions';

const GetUnblock = (props: SdkProps): SDK => {
  const settings = new SdkSettings(props.apiKey, props.prod);
  return new SDK(new ServiceFactory(settings));
};

// Types
export * from './auth/definitions';

export {
  AddUserToCompanyRequest,
  AddUserToCompanyResponse,
  CompanyDetails,
  CreateCompanyResponse,
  RemoveUserFromCompanyRequest,
  RemoveUserFromCompanyResponse,
  TargetAddress,
  UpdateCompanyResponse,
} from './company/definitions';

export { SdkProps } from './definitions';

export * from './exchange-rates/definitions';

export * from './kyc/definitions';

export { GetUserOfframpAddressRequest, GetUserOfframpAddressResponse } from './offramp/definitions';

export * from './process/definitions';

export {
  ChangeMainUserRemoteBankAccountRequest,
  CreateRemoteUserBankAccount,
  CreateRemoteUserBankAccountRequest,
  CreateRemoteUserBankAccountResponse,
  EurAccountDetails,
  GbpAccountDetails,
  GetAllRemoteBankAccountsResponse,
  GetRemoteBankAccountByUuidRequest,
  GetRemoteBankAccountByUuidResponse,
  RemoteUserBankAccount,
} from './remote-bank-account/definitions';

export {
  GetUserTokenPreferenceResponse,
  TokenPreference,
  TokenPreferenceArbitrum,
  TokenPreferenceCelo,
  TokenPreferenceMainnet,
  TokenPreferenceOptimism,
  TokenPreferencePolygon,
  UpdateUserTokenPreferencesRequest,
  UpdateUserTokenPreferencesResponse,
} from './token-preference/definitions';

export { TransactionFeeEstRequest, TransactionFeeEstResponse } from './transaction-fee/definitions';

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
} from './unblock-bank-account/definitions';

export * from './user/definitions';

// Enums
export * from './enums/Chain';
export * from './enums/CompanyType';
export * from './enums/Country';
export * from './enums/Currency';
export * from './enums/PaymentMethods';
export * from './enums/ProcessDirection';
export * from './enums/ProcessStatus';
export * from './enums/Tokens';
export * from './enums/UserCompanyRole';
export * from './enums/UserStatus';

// Default
export default GetUnblock;
