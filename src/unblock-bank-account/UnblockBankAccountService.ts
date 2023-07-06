import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import {
  CreateUnblockUserBankAccountRequest,
  CreateUnblockUserBankAccountResponse,
  GetAllunblockUserBankAccountsRequest,
  GetAllunblockUserBankAccountsResponse,
  GetUnblockBankAccountByIdRequest,
  GetUnblockBankAccountByIdResponse,
  SimulateOnRampRequest,
  SimulateOnRampResponse,
  UnblockUserBankAccount,
  UnblockUserBankAccountFull,
} from './definitions';

export interface IUnblockBankAccountService {
  createUnblockUserBankAccount(
    dto: CreateUnblockUserBankAccountRequest,
  ): Promise<CreateUnblockUserBankAccountResponse>;

  getAllUnblockUserBankAccounts(
    dto: GetAllunblockUserBankAccountsRequest,
  ): Promise<GetAllunblockUserBankAccountsResponse>;

  simulateOnRamp(dto: SimulateOnRampRequest): Promise<SimulateOnRampResponse>;

  getUnblockBankAccountById(
    dto: GetUnblockBankAccountByIdRequest,
  ): Promise<GetUnblockBankAccountByIdResponse>;
}

export class UnblockBankAccountService extends BaseService implements IUnblockBankAccountService {
  /**
   * Creates an UnblockUser bank account with provided details.
   *
   * @param {CreateUnblockUserBankAccountRequest} dto - The request data transfer object. It should contain the user UUID, the session ID, and the currency details for the new account.
   *
   * `userUuid`: UUID of the user for whom the bank account is being created.
   *
   * `unblockSessionID`: Session ID.
   *
   * `currency`: ISO 4217 currency code.
   *
   * @returns {Promise<CreateUnblockUserBankAccountResponse>} A Promise that resolves to a response object containing the details of the created UnblockUser bank account.
   *
   * @throws Will throw an error if the Axios request fails, either due to an API error or an unexpected error.
   */
  async createUnblockUserBankAccount(
    dto: CreateUnblockUserBankAccountRequest,
  ): Promise<CreateUnblockUserBankAccountResponse> {
    const { apiKey } = this.props;
    const path = `/user/${dto.userUuid}/bank-account/unblock`;
    const body = { currency: dto.currency };
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': dto.unblockSessionID,
      },
    };
    try {
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

  /**
   * Fetches all Unblock User Bank Accounts from the API endpoint.
   *
   * @param {GetAllunblockUserBankAccountsRequest} dto - The data transfer object (DTO) containing user information.
   *
   * `userUuid`: UUID of the user for whom the bank account is being created.
   *
   * `unblockSessionID`: Session ID.
   *
   * @returns {Promise<GetAllunblockUserBankAccountsResponse[]>} - A promise that resolves to an array of user bank accounts.
   *
   * @throws Will throw an error if the Axios request fails, either due to an API error or an unexpected error.
   *
   */
  async getAllUnblockUserBankAccounts(
    dto: GetAllunblockUserBankAccountsRequest,
  ): Promise<GetAllunblockUserBankAccountsResponse> {
    const { apiKey } = this.props;
    const path = `/user/${dto.userUuid}/bank-account/unblock`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': dto.unblockSessionID,
      },
    };
    try {
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

  async simulateOnRamp(dto: SimulateOnRampRequest): Promise<SimulateOnRampResponse> {
    const { apiKey } = this.props;
    const path = `/user/${dto.userUuid}/bank-account/unblock/test`;
    const body = { currency: dto.currency, value: dto.value };
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': dto.unblockSessionID,
      },
    };
    try {
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
    dto: GetUnblockBankAccountByIdRequest,
  ): Promise<GetUnblockBankAccountByIdResponse> {
    const { apiKey } = this.props;
    const path = `/user/${dto.userUuid}/bank-account/unblock/${dto.accountUuid}`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': dto.unblockSessionID,
      },
    };
    try {
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
