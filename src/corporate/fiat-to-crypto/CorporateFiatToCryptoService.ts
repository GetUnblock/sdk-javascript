import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { UnsupportedEnvironmentError, UserSessionDataNotSetError } from '../../errors';
import {
  CreateCorporateUnblockBankAccountRequest,
  CreateCorporateUnblockBankAccountResponse,
  GetCorporateUnblockBankAccountRequest,
  GetCorporateUnblockBankAccountResponse,
  GetCorporateUnblockBankAccountsRequest,
  GetCorporateUnblockBankAccountsResponse,
  UnblockBankAccount,
  simulateRequest,
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
  simulate(params: simulateRequest): Promise<void>;
}

export class CorporateFiatToCryptoService
  extends BaseService
  implements ICorporateFiatToCryptoService
{
  async createCorporateUnblockBankAccount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateCorporateUnblockBankAccountRequest,
  ): Promise<CreateCorporateUnblockBankAccountResponse> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/corporate/${params.corporateUuid}/bank-account/unblock`;

      const body = {
        currency: params.currency,
      };
      const config = {
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<CreateCorporateUnblockBankAccountResponse> =
        await this.axiosClient.post(path, body, config);

      return this.unblockBankAccountToCamelCase(response.data);
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  async getCorporateUnblockBankAccounts(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateUnblockBankAccountsRequest,
  ): Promise<GetCorporateUnblockBankAccountsResponse> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/corporate/${params.corporateUuid}/bank-account/unblock`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<GetCorporateUnblockBankAccountsResponse> =
        await this.axiosClient.get(path, config);

      return response.data.map((uba) => {
        return this.unblockBankAccountToCamelCase(uba);
      });
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  async getCorporateUnblockBankAccount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateUnblockBankAccountRequest,
  ): Promise<GetCorporateUnblockBankAccountResponse> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/corporate/${params.corporateUuid}/bank-account/unblock/${params.accountUuid}`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<GetCorporateUnblockBankAccountResponse> =
        await this.axiosClient.get(path, config);

      return this.unblockBankAccountToCamelCase(response.data);
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  async simulate(params: simulateRequest): Promise<void> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      if (this.props.prod) {
        throw new UnsupportedEnvironmentError('production');
      }

      const path = `/corporate/${params.corporateUuid}/bank-account/unblock/${params.accountUuid}/simulate`;
      const body = {
        value: params.value,
      };
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      await this.axiosClient.post(path, body, config);
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  private unblockBankAccountToCamelCase(bankAccount: { [key: string]: any }): UnblockBankAccount {
    return {
      uuid: bankAccount.uuid,
      currency: bankAccount.currency,
      iban: bankAccount.iban,
      bic: bankAccount.bic,
      accountNumber: bankAccount.account_number,
      sortCode: bankAccount.sort_code,
    };
  }
}
