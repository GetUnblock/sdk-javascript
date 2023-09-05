import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { UserSessionDataNotSetError } from '../../errors';
import {
  CreateUnblockUserBankAccountRequest,
  CreateUnblockUserBankAccountResponse,
  GetAllunblockUserBankAccountsResponse,
  GetUnblockBankAccountByUuidRequest,
  GetUnblockBankAccountByUuidResponse,
  SimulateOnRampRequest,
  UnblockBankAccount,
} from './definitions';

export interface IUserFiatToCryptoService {
  createUnblockUserBankAccount(
    params: CreateUnblockUserBankAccountRequest,
  ): Promise<CreateUnblockUserBankAccountResponse>;

  getAllUnblockUserBankAccounts(): Promise<GetAllunblockUserBankAccountsResponse>;

  simulateOnRamp(params: SimulateOnRampRequest): Promise<void>;

  getUnblockBankAccountByUuid(
    params: GetUnblockBankAccountByUuidRequest,
  ): Promise<GetUnblockBankAccountByUuidResponse>;
}

export class UserFiatToCryptoService extends BaseService implements IUserFiatToCryptoService {
  async createUnblockUserBankAccount(
    params: CreateUnblockUserBankAccountRequest,
  ): Promise<CreateUnblockUserBankAccountResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/bank-account/unblock`;
      const body = { currency: params.currency };
      const config = {
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<{ [key: string]: any }> = await this.axiosClient.post(
        path,
        body,
        config,
      );
      return this.mapUnblockBankAccountToCamelCase(response.data);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getAllUnblockUserBankAccounts(): Promise<GetAllunblockUserBankAccountsResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/bank-account/unblock`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<{ [key: string]: any }[]> = await this.axiosClient.get(
        path,
        config,
      );
      return response.data.map((bankAccount) => {
        return this.mapUnblockBankAccountToCamelCase(bankAccount);
      });
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async simulateOnRamp(params: SimulateOnRampRequest): Promise<void> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/bank-account/unblock/${params.accountUuid}/simulate`;
      const body = { account_uuid: params.accountUuid, value: params.value };
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      await this.axiosClient.post(path, body, config);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getUnblockBankAccountByUuid(
    params: GetUnblockBankAccountByUuidRequest,
  ): Promise<GetUnblockBankAccountByUuidResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/bank-account/unblock/${params.accountUuid}`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<{ [key: string]: any }> = await this.axiosClient.get(
        path,
        config,
      );

      return this.mapUnblockBankAccountToCamelCase(response.data);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  private mapUnblockBankAccountToCamelCase(bankAccount: {
    [key: string]: any;
  }): UnblockBankAccount {
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
