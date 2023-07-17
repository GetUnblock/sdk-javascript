import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ErrorHandler } from '../ErrorHandler';
import { SdkSettings } from '../SdkSettings';
import { ProcessStatus } from '../enums/ProcessStatus';
import { UserStatus } from '../enums/UserStatus';
import { UserSessionDataNotSetError } from '../errors';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserRampTransactionsResponse,
  GetUserStatusResponse,
} from './definitions';

export interface IUserService {
  createUser(params: CreateUserRequest): Promise<CreateUserResponse>;
  getUserStatus(): Promise<GetUserStatusResponse>;
  getUserRampTransactions(): Promise<GetUserRampTransactionsResponse>;
}

export class UserService implements IUserService {
  private readonly axiosClient: AxiosInstance;
  constructor(private props: SdkSettings) {
    this.axiosClient = axios.create({
      baseURL: this.props.prod ? this.props.prodUrl : this.props.sandBoxUrl,
      timeout: this.props.timeoutMs,
    });
  }

  async createUser(params: CreateUserRequest): Promise<CreateUserResponse> {
    const { apiKey } = this.props;

    const path = `/user`;
    const body = {
      first_name: params.firstName,
      last_name: params.lastName,
      email: params.email,
      target_address: params.targetAddress,
      country: params.country,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<{
        message: string;
        user_uuid: string;
        status: UserStatus;
      }> = await this.axiosClient.post(path, body, config);

      return {
        message: response.data.message,
        status: response.data.status,
        userUuid: response.data.user_uuid,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getUserStatus(): Promise<GetUserStatusResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/status`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      const response: AxiosResponse<{
        status: UserStatus;
      }> = await this.axiosClient.get(path, config);

      return {
        status: response.data.status,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getUserRampTransactions(): Promise<GetUserRampTransactionsResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `user/${this.props.userSessionData.userUuid}/process`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<{
        message: string;
        processes: {
          onramp: {
            uuid: string;
            status: ProcessStatus;
            amount: number;
            created_at: string;
            updated_at: string;
          }[];
          offramp: {
            uuid: string;
            status: ProcessStatus;
            amount: number;
            created_at: string;
            updated_at: string;
          }[];
        };
      }> = await this.axiosClient.get(path, config);

      return {
        message: response.data.message,
        processes: {
          onramp: response.data.processes.onramp.map((item) => ({
            amount: item.amount,
            createdAt: item.created_at,
            status: item.status,
            updatedAt: item.updated_at,
            uuid: item.uuid,
          })),
          offramp: response.data.processes.offramp.map((item) => ({
            amount: item.amount,
            createdAt: item.created_at,
            status: item.status,
            updatedAt: item.updated_at,
            uuid: item.uuid,
          })),
        },
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
