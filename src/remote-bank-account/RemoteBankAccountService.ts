import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from 'src/definitions';
import {
  NewRemoteUserBankAccount,
  RemoteUserBankAccountRequest,
  RemoteUserBankAccountResponse,
  UnblockCreateRemoteUserBankAccount,
  UnblockEurAccountDetails,
  UnblockGbpAccountDetails,
  UnblockRemoteUserBankAccount,
  UserSessionData,
} from './definitions';

export interface IRemoteBankAccount {
  createRemoteUserBankAccount(
    dto: RemoteUserBankAccountRequest,
  ): Promise<RemoteUserBankAccountResponse>;
  getAllRemoteBankAccounts(dto: UserSessionData): Promise<RemoteUserBankAccountResponse[]>;
  changeMainUserRemoteBankAccount(dto: any): Promise<void>;
  getRemoteBankAccountByUuid(dto: any): Promise<void>;
}

export class RemoteBankAccountService implements IRemoteBankAccount {
  private readonly axiosClient: AxiosInstance;
  constructor(private props: SdkSettings) {
    const { prod, prodUrl, sandBoxUrl, timeoutMs } = props;
    this.axiosClient = axios.create({
      baseURL: prod ? prodUrl : sandBoxUrl,
      timeout: timeoutMs,
    });
  }

  /**
   * Creates a remote user bank account.
   *
   * @param {RemoteUserBankAccountRequest} dto - An object containing user uuid, session id and account information.
   *
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
        'unblock-session-id': dto.unblockSessionID,
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
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        throw new Error(`Api error': ${axiosError.response?.status} ${axiosError.response?.data}`);
      } else {
        throw new Error(`Unexpected error': ${error}`);
      }
    }
  }

  async getAllRemoteBankAccounts(dto: UserSessionData): Promise<RemoteUserBankAccountResponse[]> {
    const path = `/user/${dto.userUuid}/bank-account/remote`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: this.props.apiKey,
        'unblock-session-id': dto.unblockSessionID,
      },
    };

    try {
      const resposne: AxiosResponse<UnblockRemoteUserBankAccount[]> = await this.axiosClient.get(
        path,
        config,
      );

      const remoteUserBankAccounts: RemoteUserBankAccountResponse[] =
        this.mapToRemoteUserBankAccountResponse(resposne.data);
      return remoteUserBankAccounts;
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        throw new Error(`Api error': ${axiosError.response?.status} ${axiosError.response?.data}`);
      } else {
        throw new Error(`Unexpected error': ${error}`);
      }
    }
  }

  async changeMainUserRemoteBankAccount(dto: any): Promise<void> {
    console.log(dto);

    // const options = {
    //   method: 'PATCH',
    //   url: 'https://sandbox.getunblock.com/user/user_uuid/bank-account/remote',
    //   headers: {accept: 'application/json', 'content-type': 'application/json'}
    // };
    return;
  }

  async getRemoteBankAccountByUuid(dto: any): Promise<void> {
    console.log(dto);
    // const options = {
    //   method: 'GET',
    //   url: 'https://sandbox.getunblock.com/user/user_uuid/bank-account/remote/account_uuid',
    //   headers: {accept: 'application/json'}
    // };

    return;
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
