import { BaseService } from '../../BaseService';
import {
  CreateCorporateUnblockBankAccountRequest,
  CreateCorporateUnblockBankAccountResponse,
  GetCorporateUnblockBankAccountRequest,
  GetCorporateUnblockBankAccountResponse,
  GetCorporateUnblockBankAccountsRequest,
  GetCorporateUnblockBankAccountsResponse,
} from './definitions';

export interface ICorporateFiatToCryptoService {
  createCorporateUnblockBankAccount(
    params: CreateCorporateUnblockBankAccountRequest,
  ): Promise<CreateCorporateUnblockBankAccountResponse>;
  getCorporateUnblockBankAccounts(
    params: GetCorporateUnblockBankAccountsRequest,
  ): Promise<GetCorporateUnblockBankAccountsResponse>;
  getCorporateUnblockBankAccount(
    params: GetCorporateUnblockBankAccountRequest,
  ): Promise<GetCorporateUnblockBankAccountResponse>;
}

export class CorporateFiatToCryptoService
  extends BaseService
  implements ICorporateFiatToCryptoService
{
  createCorporateUnblockBankAccount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateCorporateUnblockBankAccountRequest,
  ): Promise<CreateCorporateUnblockBankAccountResponse> {
    throw new Error('Method not implemented.');
  }

  getCorporateUnblockBankAccounts(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateUnblockBankAccountsRequest,
  ): Promise<GetCorporateUnblockBankAccountsResponse> {
    throw new Error('Method not implemented.');
  }

  getCorporateUnblockBankAccount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateUnblockBankAccountRequest,
  ): Promise<GetCorporateUnblockBankAccountResponse> {
    throw new Error('Method not implemented.');
  }
}
