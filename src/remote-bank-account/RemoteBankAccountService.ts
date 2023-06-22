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
} from './definitions';

export interface IRemoteBankAccount {
  createRemoteUserBankAccount(
    dto: RemoteUserBankAccountRequest,
  ): Promise<RemoteUserBankAccountResponse>;
  getAllremoteBankAccounts(dto: any): Promise<void>;
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
      const newRemoteBankAccount: NewRemoteUserBankAccount = {
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        currency: response.data.currency,
        mainBeneficiary: response.data.main_beneficiary,
        iban: response.data.iban,
        bic: response.data.bic,
        accountNumber: response.data.account_number,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
        accountName: response.data.account_name,
        bankName: response.data.bank_name,
        uuid: response.data.uuid,
        sortCode: response.data.sort_code,
      };

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

  async getAllremoteBankAccounts(dto: any): Promise<void> {
    console.log(dto);
    return;

    // const options = {
    //   method: 'GET',
    //   url: 'https://sandbox.getunblock.com/user/user_uuid/bank-account/remote',
    //   headers: {accept: 'application/json'}
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
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
}
