import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { ProcessStatus } from '../../enums/ProcessStatus';
import { UserStatus } from '../../enums/UserStatus';
import { UserSessionDataNotSetError } from '../../errors';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserRampTransactionsResponse,
  GetUserStatusResponse,
  GetUserTokenPreferenceResponse,
  GetUserTokenPreferenceResponseData,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserTokenPreferenceRequestBody,
  UpdateUserTokenPreferencesRequest,
  UpdateUserTokenPreferencesResponse,
  UpdateUserTokenPreferencesResponseData,
} from './definitions';

export interface IUserManagementService {
  createUser(params: CreateUserRequest): Promise<CreateUserResponse>;
  updateUser(params: UpdateUserRequest): Promise<UpdateUserResponse>;
  getUserStatus(): Promise<GetUserStatusResponse>;
  getUserRampTransactions(): Promise<GetUserRampTransactionsResponse>;
  getUserTokenPreference(): Promise<GetUserTokenPreferenceResponse>;
  updateUserTokenPreference(
    params: UpdateUserTokenPreferencesRequest,
  ): Promise<UpdateUserTokenPreferencesResponse>;
}

export class UserManagementService extends BaseService implements IUserManagementService {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser(params: UpdateUserRequest): Promise<UpdateUserResponse> {
    throw new Error('Method not implemented.');
  }

  async getUserTokenPreference(): Promise<GetUserTokenPreferenceResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/token-preferences`;
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<GetUserTokenPreferenceResponseData> =
        await this.axiosClient.get(path, config);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async updateUserTokenPreference(
    params: UpdateUserTokenPreferencesRequest,
  ): Promise<UpdateUserTokenPreferencesResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/token-preferences`;
      const body: UpdateUserTokenPreferenceRequestBody = params.preferences;
      const config = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      const response: AxiosResponse<UpdateUserTokenPreferencesResponseData> =
        await this.axiosClient.patch(path, body, config);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
