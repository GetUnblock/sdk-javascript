import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import { UserSessionData } from '../definitions';
import {
  NewRemoteUserBankAccount,
  RemoteUserBankAccountRequest,
  RemoteUserBankAccountResponse,
  UnblockCreateRemoteUserBankAccount,
  UnblockEurAccountDetails,
  UnblockGbpAccountDetails,
  UnblockRemoteUserBankAccount,
} from './definitions';

export interface IRemoteBankAccountService {
  createRemoteUserBankAccount(
    dto: RemoteUserBankAccountRequest,
  ): Promise<RemoteUserBankAccountResponse>;

  getAllRemoteBankAccounts(dto: UserSessionData): Promise<RemoteUserBankAccountResponse[]>;

  changeMainUserRemoteBankAccount(dto: UserSessionData & { accountUuid: string }): Promise<void>;

  getRemoteBankAccountByUuid(
    dto: UserSessionData & { accountUuid: string },
  ): Promise<RemoteUserBankAccountResponse>;
}

export class RemoteBankAccountService extends BaseService implements IRemoteBankAccountService {
  /**
   * Creates a remote user bank account.
   *
   * @param {RemoteUserBankAccountRequest} dto - An object containing user uuid, session id and account information.
   * @returns {Promise<RemoteUserBankAccountResponse>} A promise that resolves to a response object containing the new bank account details.
   *
   * @throws {Error} Will throw an error if the API request fails or if an unexpected error occurs.
   */
  async createRemoteUserBankAccount(
    dto: RemoteUserBankAccountRequest,
  ): Promise<RemoteUserBankAccountResponse> {
    const { apiKey } = this.props;
    let accountDetails: UnblockGbpAccountDetails | UnblockEurAccountDetails;

    if ('iban' in dto.accountDetails) {
      accountDetails = {
        currency: dto.accountDetails.currency,
        iban: dto.accountDetails.iban,
      };
    } else if ('accountNumber' in dto.accountDetails && 'sortCode' in dto.accountDetails) {
      accountDetails = {
        currency: dto.accountDetails.currency,
        account_number: dto.accountDetails.accountNumber,
        sort_code: dto.accountDetails.sortCode,
      };
    } else {
      throw new Error('Invalid account details');
    }

    const path = `/user/${dto.userUuid}/bank-account/remote`;

    const body: UnblockCreateRemoteUserBankAccount = {
      account_name: dto.accountName,
      account_country: dto.accountCountry,
      beneficiary_country: dto.beneficiaryCountry,
      main_beneficiary: dto.mainBeneficiary,
      account_details: accountDetails,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': dto.unblockSessionId,
      },
    };

    try {
      const response: AxiosResponse<UnblockRemoteUserBankAccount> = await this.axiosClient.post(
        path,
        body,
        config,
      );
      const newRemoteBankAccount: NewRemoteUserBankAccount =
        this.mapToRemoteUserBankAccountResponse([response.data])[0];

      return newRemoteBankAccount;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  /**
   * Retrieve all remote bank accounts for the user
   *
   * @param {UserSessionData} dto - An object containing user session data
   * @returns {Promise<RemoteUserBankAccountResponse[]>} - Returns a promise that resolves to an array of remote bank account responses if the retrieval was successful
   *
   * @throws Will throw an error if the Axios request fails, either due to an API error or an unexpected error.
   */
  async getAllRemoteBankAccounts(dto: UserSessionData): Promise<RemoteUserBankAccountResponse[]> {
    const { apiKey } = this.props;
    const path = `/user/${dto.userUuid}/bank-account/remote`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': dto.unblockSessionId,
      },
    };

    try {
      const response: AxiosResponse<UnblockRemoteUserBankAccount[]> = await this.axiosClient.get(
        path,
        config,
      );
      const remoteUserBankAccounts: RemoteUserBankAccountResponse[] =
        this.mapToRemoteUserBankAccountResponse(response.data);
      return remoteUserBankAccounts;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  /**
   * Change the user's main remote bank account
   *
   * @param {UserSessionData & { accountUuid: string }} dto - An object containing user session data and the UUID of the account to be changed
   * @returns {Promise<void>} - Returns a promise that resolves to void if the change was successful
   *
   * @throws Will throw an error if the Axios request fails, either due to an API error or an unexpected error.
   */
  async changeMainUserRemoteBankAccount(
    dto: UserSessionData & { accountUuid: string },
  ): Promise<void> {
    const { apiKey } = this.props;
    const path = `/user/${dto.userUuid}/bank-account/remote`;

    const body: { account_uuid: string } = {
      account_uuid: dto.accountUuid,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': dto.unblockSessionId,
      },
    };

    try {
      await this.axiosClient.patch(path, body, config);
      return;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  /**
   * Retrieve a remote bank account for the user by account UUID
   *
   * @param {UserSessionData & { accountUuid: string }} dto - An object containing user session data and the UUID of the account to be retrieved
   * @returns {Promise<RemoteUserBankAccountResponse>} - Returns a promise that resolves to a remote bank account response if the retrieval was successful
   *
   * @throws Will throw an error if the Axios request fails, either due to an API error or an unexpected error.
   */
  async getRemoteBankAccountByUuid(
    dto: UserSessionData & { accountUuid: string },
  ): Promise<RemoteUserBankAccountResponse> {
    const { apiKey } = this.props;
    const path = `/user/${dto.userUuid}/bank-account/remote/${dto.accountUuid}`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': dto.unblockSessionId,
      },
    };

    try {
      const response: AxiosResponse<UnblockRemoteUserBankAccount> = await this.axiosClient.get(
        path,
        config,
      );
      const remoteUserBankAccounts: RemoteUserBankAccountResponse =
        this.mapToRemoteUserBankAccountResponse([response.data])[0];
      return remoteUserBankAccounts;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  private mapToRemoteUserBankAccountResponse(
    input: UnblockRemoteUserBankAccount[],
  ): NewRemoteUserBankAccount[] {
    return input.map((item) => ({
      firstName: item.first_name,
      lastName: item.last_name,
      currency: item.currency,
      mainBeneficiary: item.main_beneficiary,
      iban: item.iban,
      bic: item.bic,
      accountNumber: item.account_number,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      accountName: item.account_name,
      bankName: item.bank_name,
      uuid: item.uuid,
      sortCode: item.sort_code,
    }));
  }
}
