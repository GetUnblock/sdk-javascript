import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { UserSessionDataNotSetError } from '../../errors';
import {
  CreateUnblockUserBankAccountRequest,
  CreateUnblockUserBankAccountResponse,
  GetAllunblockUserBankAccountsResponse,
  GetUnblockBankAccountByIdRequest,
  GetUnblockBankAccountByIdResponse,
  SimulateOnRampRequest,
  SimulateOnRampResponse,
  UnblockUserBankAccount,
  UnblockUserBankAccountFull,
} from './definitions';

export interface IUserFiatToCryptoService {
  createUnblockUserBankAccount(
    params: CreateUnblockUserBankAccountRequest,
  ): Promise<CreateUnblockUserBankAccountResponse>;

  getAllUnblockUserBankAccounts(): Promise<GetAllunblockUserBankAccountsResponse>;

  simulateOnRamp(params: SimulateOnRampRequest): Promise<SimulateOnRampResponse>;

  getUnblockBankAccountById(
    params: GetUnblockBankAccountByIdRequest,
  ): Promise<GetUnblockBankAccountByIdResponse>;
}

export class UserFiatToCryptoService extends BaseService implements IUserFiatToCryptoService {
  async createUnblockUserBankAccount(
    params: CreateUnblockUserBankAccountRequest,
  ): Promise<CreateUnblockUserBankAccountResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/bank-account/unblock`;
      const body = { currency: params.currency };
      const config = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<UnblockUserBankAccount> = await this.axiosClient.post(
        path,
        body,
        config,
      );
      return {
        currency: response.data.currency,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
        uuid: response.data.uuid,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getAllUnblockUserBankAccounts(): Promise<GetAllunblockUserBankAccountsResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/bank-account/unblock`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<UnblockUserBankAccount[]> = await this.axiosClient.get(
        path,
        config,
      );
      const mappedResponse = response.data.map((item) => {
        return {
          currency: item.currency,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          uuid: item.uuid,
        };
      });
      return mappedResponse;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async simulateOnRamp(params: SimulateOnRampRequest): Promise<SimulateOnRampResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/bank-account/unblock/test`;
      const body = { currency: params.currency, value: params.value };
      const config = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<{ message: string }> = await this.axiosClient.post(
        path,
        body,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getUnblockBankAccountById(
    params: GetUnblockBankAccountByIdRequest,
  ): Promise<GetUnblockBankAccountByIdResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/bank-account/unblock/${params.accountUuid}`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<UnblockUserBankAccountFull> = await this.axiosClient.get(
        path,
        config,
      );

      return {
        currency: response.data.currency,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
        uuid: response.data.uuid,
        bic: response.data.bic,
        accountNumber: response.data.account_number,
        iban: response.data.iban,
        holderName: response.data.holder_name,
        currentBalance: response.data.current_balance,
        availableBalance: response.data.available_balance,
        sortCode: response.data.sort_code,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
