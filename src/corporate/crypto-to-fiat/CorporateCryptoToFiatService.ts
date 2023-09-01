import { BaseService } from '../../BaseService';
import {
  CreateCorporateRemoteBankAccountRequest,
  CreateCorporateRemoteBankAccountResponse,
  GetCorporateRemoteBankAccountDetailsRequest,
  GetCorporateRemoteBankAccountDetailsResponse,
  GetCorporateRemoteBankAccountsRequest,
  GetCorporateRemoteBankAccountsResponse,
  GetCorporateUnblockWalletRequest,
  GetCorporateUnblockWalletResponse,
  UpdateCorporateRemoteBankAccountRequest,
  UpdateCorporateRemoteBankAccountResponse,
} from './definitions';

export interface ICorporateCryptoToFiatService {
  getCorporateUnblockWallet(
    params: GetCorporateUnblockWalletRequest,
  ): Promise<GetCorporateUnblockWalletResponse>;
  createCorporateRemoteBankAccount(
    params: CreateCorporateRemoteBankAccountRequest,
  ): Promise<CreateCorporateRemoteBankAccountResponse>;
  getCorporateRemoteBankAccounts(
    params: GetCorporateRemoteBankAccountsRequest,
  ): Promise<GetCorporateRemoteBankAccountsResponse>;
  updateCorporateRemoteBankAccount(
    params: UpdateCorporateRemoteBankAccountRequest,
  ): Promise<UpdateCorporateRemoteBankAccountResponse>;
  getCorporateRemoteBankAccountDetails(
    params: GetCorporateRemoteBankAccountDetailsRequest,
  ): Promise<GetCorporateRemoteBankAccountDetailsResponse>;
}

export class CorporateCryptoToFiatService
  extends BaseService
  implements ICorporateCryptoToFiatService
{
  getCorporateUnblockWallet(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateUnblockWalletRequest,
  ): Promise<GetCorporateUnblockWalletResponse> {
    throw new Error('Method not implemented.');
  }

  createCorporateRemoteBankAccount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateCorporateRemoteBankAccountRequest,
  ): Promise<CreateCorporateRemoteBankAccountResponse> {
    throw new Error('Method not implemented.');
  }

  getCorporateRemoteBankAccounts(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateRemoteBankAccountsRequest,
  ): Promise<GetCorporateRemoteBankAccountsResponse> {
    throw new Error('Method not implemented.');
  }

  updateCorporateRemoteBankAccount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: UpdateCorporateRemoteBankAccountRequest,
  ): Promise<UpdateCorporateRemoteBankAccountResponse> {
    throw new Error('Method not implemented.');
  }

  getCorporateRemoteBankAccountDetails(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateRemoteBankAccountDetailsRequest,
  ): Promise<GetCorporateRemoteBankAccountDetailsResponse> {
    throw new Error('Method not implemented.');
  }
}
