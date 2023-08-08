import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { InvalidAccountDetailsError, UserSessionDataNotSetError } from '../../errors';
import {
  ChangeMainUserRemoteBankAccountRequest,
  CreateRemoteUserBankAccountRequest,
  CreateRemoteUserBankAccountResponse,
  GetAllRemoteBankAccountsResponse,
  GetRemoteBankAccountByUuidRequest,
  GetRemoteBankAccountByUuidResponse,
  GetUserOfframpAddressRequest,
  GetUserOfframpAddressResponse,
  GetUserOfframpAddressResponseData,
  RemoteUserBankAccount,
  UnblockCreateRemoteUserBankAccount,
  UnblockEurAccountDetails,
  UnblockGbpAccountDetails,
  UnblockRemoteUserBankAccount,
} from './definitions';

export interface IUserCryptoToFiatService {
  getUserOfframpAddress(
    params: GetUserOfframpAddressRequest,
  ): Promise<GetUserOfframpAddressResponse>;
  createRemoteUserBankAccount(
    params: CreateRemoteUserBankAccountRequest,
  ): Promise<CreateRemoteUserBankAccountResponse>;

  getAllRemoteBankAccounts(): Promise<GetAllRemoteBankAccountsResponse[]>;

  changeMainUserRemoteBankAccount(params: ChangeMainUserRemoteBankAccountRequest): Promise<void>;

  getRemoteBankAccountByUuid(
    params: GetRemoteBankAccountByUuidRequest,
  ): Promise<GetRemoteBankAccountByUuidResponse>;
}

export class UserCryptoToFiatService extends BaseService implements IUserCryptoToFiatService {
  async getUserOfframpAddress(
    params: GetUserOfframpAddressRequest,
  ): Promise<GetUserOfframpAddressResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const { chain } = params;
      const path = `/user/${this.props.userSessionData.userUuid}/wallet/${chain}`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<GetUserOfframpAddressResponseData> = await this.axiosClient.get(
        path,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async createRemoteUserBankAccount(
    params: CreateRemoteUserBankAccountRequest,
  ): Promise<CreateRemoteUserBankAccountResponse> {
    const { apiKey } = this.props;
    let accountDetails: UnblockGbpAccountDetails | UnblockEurAccountDetails;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      if ('iban' in params.accountDetails) {
        accountDetails = {
          currency: params.accountDetails.currency,
          iban: params.accountDetails.iban,
        };
      } else if ('accountNumber' in params.accountDetails && 'sortCode' in params.accountDetails) {
        accountDetails = {
          currency: params.accountDetails.currency,
          account_number: params.accountDetails.accountNumber,
          sort_code: params.accountDetails.sortCode,
        };
      } else {
        throw new InvalidAccountDetailsError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/bank-account/remote`;

      const body: UnblockCreateRemoteUserBankAccount = {
        account_name: params.accountName,
        account_country: params.accountCountry,
        beneficiary_country: params.beneficiaryCountry,
        main_beneficiary: params.mainBeneficiary,
        account_details: accountDetails,
      };

      const config = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<UnblockRemoteUserBankAccount> = await this.axiosClient.post(
        path,
        body,
        config,
      );
      const newRemoteBankAccount: RemoteUserBankAccount = this.mapToRemoteUserBankAccountResponse([
        response.data,
      ])[0];

      return newRemoteBankAccount;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getAllRemoteBankAccounts(): Promise<GetAllRemoteBankAccountsResponse[]> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/bank-account/remote`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<UnblockRemoteUserBankAccount[]> = await this.axiosClient.get(
        path,
        config,
      );
      const remoteUserBankAccounts: GetAllRemoteBankAccountsResponse[] =
        this.mapToRemoteUserBankAccountResponse(response.data);
      return remoteUserBankAccounts;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async changeMainUserRemoteBankAccount(
    params: ChangeMainUserRemoteBankAccountRequest,
  ): Promise<void> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/bank-account/remote`;

      const body: { account_uuid: string } = {
        account_uuid: params.accountUuid,
      };

      const config = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      await this.axiosClient.patch(path, body, config);
      return;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getRemoteBankAccountByUuid(
    params: GetRemoteBankAccountByUuidRequest,
  ): Promise<GetRemoteBankAccountByUuidResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/bank-account/remote/${params.accountUuid}`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<UnblockRemoteUserBankAccount> = await this.axiosClient.get(
        path,
        config,
      );
      const remoteUserBankAccounts: GetRemoteBankAccountByUuidResponse =
        this.mapToRemoteUserBankAccountResponse([response.data])[0];
      return remoteUserBankAccounts;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  private mapToRemoteUserBankAccountResponse(
    input: UnblockRemoteUserBankAccount[],
  ): RemoteUserBankAccount[] {
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
