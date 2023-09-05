import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { Currency } from '../../enums/Currency';
import { CurrencyNotSupportedError, UserSessionDataNotSetError } from '../../errors';
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

  getAllRemoteBankAccounts(): Promise<GetAllRemoteBankAccountsResponse>;

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
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const { chain } = params;
      const path = `/user/wallet/${chain}`;

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
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const { currency } = params.accountDetails;

      if (currency !== Currency.EURO && currency !== Currency.GBP) {
        throw new CurrencyNotSupportedError(currency);
      }

      if (currency === Currency.GBP) {
        accountDetails = {
          currency: params.accountDetails.currency,
          account_number: params.accountDetails.accountNumber,
          sort_code: params.accountDetails.sortCode,
        };
      } else {
        accountDetails = {
          currency: params.accountDetails.currency,
          iban: params.accountDetails.iban,
        };
      }

      const path = `/user/bank-account/remote`;

      const body = {
        account_name: params.accountName,
        main_beneficiary: params.mainBeneficiary,
        account_details: accountDetails,
      };

      const config = {
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<CreateRemoteUserBankAccountResponse> =
        await this.axiosClient.post(path, body, config);

      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getAllRemoteBankAccounts(): Promise<GetAllRemoteBankAccountsResponse> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/bank-account/remote`;
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

      return response.data.map((item) => {
        return this.mapToRemoteUserBankAccountResponse(item);
      });
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async changeMainUserRemoteBankAccount(
    params: ChangeMainUserRemoteBankAccountRequest,
  ): Promise<void> {
    const { apiKey } = this.props;
    try {
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/bank-account/remote`;

      const body = {
        remote_bank_account_uuid: params.remoteBankAccountUuid,
      };

      const config = {
        headers: {
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
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/bank-account/remote/${params.accountUuid}`;
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

      return this.mapToRemoteUserBankAccountResponse(response.data);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  private mapToRemoteUserBankAccountResponse(
    input: UnblockRemoteUserBankAccount,
  ): RemoteUserBankAccount {
    return {
      currency: input.currency,
      mainBeneficiary: input.main_beneficiary,
      iban: input.iban,
      bic: input.bic,
      accountNumber: input.account_number,
      uuid: input.uuid,
      sortCode: input.sort_code,
    };
  }
}
