import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { Currency } from '../../enums/Currency';
import { UserSessionDataNotSetError } from '../../errors';
import {
  CreateCorporateRemoteBankAccountRequest,
  CreateCorporateRemoteBankAccountResponse,
  GetCorporateRemoteBankAccountDetailsRequest,
  GetCorporateRemoteBankAccountDetailsResponse,
  GetCorporateRemoteBankAccountsRequest,
  GetCorporateRemoteBankAccountsResponse,
  GetCorporateUnblockWalletRequest,
  GetCorporateUnblockWalletResponse,
  RemoteBankAccount,
  UpdateCorporateMainRemoteBankAccountRequest,
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
  updateCorporateMainRemoteBankAccount(
    params: UpdateCorporateMainRemoteBankAccountRequest,
  ): Promise<void>;
  getCorporateRemoteBankAccountDetails(
    params: GetCorporateRemoteBankAccountDetailsRequest,
  ): Promise<GetCorporateRemoteBankAccountDetailsResponse>;
}

export class CorporateCryptoToFiatService
  extends BaseService
  implements ICorporateCryptoToFiatService
{
  async getCorporateUnblockWallet(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateUnblockWalletRequest,
  ): Promise<GetCorporateUnblockWalletResponse> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/corporate/${params.corporateUuid}/wallet/${params.chain}`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<GetCorporateUnblockWalletResponse> = await this.axiosClient.get(
        path,
        config,
      );

      return response.data;
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  async createCorporateRemoteBankAccount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateCorporateRemoteBankAccountRequest,
  ): Promise<CreateCorporateRemoteBankAccountResponse> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/corporate/${params.corporateUuid}/bank-account/remote`;

      const accountDetails =
        params.accountDetails.currency === Currency.EURO
          ? { currency: params.accountDetails.currency, iban: params.accountDetails.iban }
          : {
              currency: params.accountDetails.currency,
              sort_code: params.accountDetails.sortCode,
              account_number: params.accountDetails.accountNumber,
            };
      const body = {
        account_name: params.accountName,
        main_beneficiary: params.mainRemoteBankAccount,
        account_details: accountDetails,
      };
      const config = {
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<CreateCorporateRemoteBankAccountResponse> =
        await this.axiosClient.post(path, body, config);

      return response.data;
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  async getCorporateRemoteBankAccounts(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateRemoteBankAccountsRequest,
  ): Promise<GetCorporateRemoteBankAccountsResponse> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/corporate/${params.corporateUuid}/bank-account/remote`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<GetCorporateRemoteBankAccountsResponse> =
        await this.axiosClient.get(path, config);

      return response.data.map((rca) => {
        return this.remoteBankAccountToCamelCase(rca);
      });
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  async updateCorporateMainRemoteBankAccount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: UpdateCorporateMainRemoteBankAccountRequest,
  ): Promise<void> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/corporate/${params.corporateUuid}/bank-account/remote`;
      const body = {
        remote_bank_account_uuid: params.remoteBankAccountUuid,
      };
      const config = {
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      await this.axiosClient.patch(path, body, config);
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  async getCorporateRemoteBankAccountDetails(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateRemoteBankAccountDetailsRequest,
  ): Promise<GetCorporateRemoteBankAccountDetailsResponse> {
    const { apiKey, userSessionData } = this.props;

    try {
      if (!userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/corporate/${params.corporateUuid}/bank-account/remote/${params.remoteBankAccountUuid}`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<GetCorporateRemoteBankAccountDetailsResponse> =
        await this.axiosClient.get(path, config);
      return this.remoteBankAccountToCamelCase(response.data);
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }

  private remoteBankAccountToCamelCase(remoteBankAccount: {
    [key: string]: any;
  }): RemoteBankAccount {
    return {
      uuid: remoteBankAccount.uuid,
      iban: remoteBankAccount.iban,
      bic: remoteBankAccount.bic,
      accountNumber: remoteBankAccount.account_number,
      sortCode: remoteBankAccount.sort_code,
      mainBeneficiary: remoteBankAccount.main_beneficiary,
      currency: remoteBankAccount.currency,
    };
  }
}
