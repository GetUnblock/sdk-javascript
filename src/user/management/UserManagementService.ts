import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { UserStatus } from '../../enums/UserStatus';
import { UserSessionDataNotSetError } from '../../errors';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  GetUserTokenPreferenceResponse,
  GetUserTokenPreferenceResponseData,
  ProcessDetails,
  TokenPreference,
  UpdateUserRequest,
} from './definitions';

export interface IUserManagementService {
  createUser(params: CreateUserRequest): Promise<CreateUserResponse>;
  updateUser(params: UpdateUserRequest): Promise<void>;
  getUserDetails(): Promise<GetUserResponse>;
  getUserRampTransactions(): Promise<ProcessDetails[]>;
  getUserTokenPreference(): Promise<GetUserTokenPreferenceResponse>;
  updateUserTokenPreference(params: TokenPreference): Promise<void>;
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
        user_uuid: string;
        status: UserStatus;
      }> = await this.axiosClient.post(path, body, config);

      return {
        status: response.data.status,
        userUuid: response.data.user_uuid,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getUserDetails(): Promise<GetUserResponse> {
    const { apiKey } = this.props;

    try {
      const path = `/user`;

      const config: any = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
        },
      };
      if (this.props.userSessionData?.userUuid) {
        config.headers['user-uuid'] = this.props.userSessionData.userUuid;
      } else if (this.props.userSessionData?.unblockSessionId) {
        config.headers['unblock-session-id'] = this.props.userSessionData.unblockSessionId;
      } else {
        throw new UserSessionDataNotSetError();
      }
      const response: AxiosResponse<GetUserResponse> = await this.axiosClient.get(path, config);

      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getUserRampTransactions(): Promise<ProcessDetails[]> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/transactions`;

      const config: any = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
        },
      };
      if (this.props.userSessionData?.userUuid) {
        config.headers['user-uuid'] = this.props.userSessionData.userUuid;
      } else if (this.props.userSessionData?.unblockSessionId) {
        config.headers['unblock-session-id'] = this.props.userSessionData.unblockSessionId;
      } else {
        throw new UserSessionDataNotSetError();
      }

      const response: AxiosResponse<ProcessDetails[]> = await this.axiosClient.get(path, config);

      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async updateUser(params: UpdateUserRequest): Promise<void> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user`;
      const config = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };

      await this.axiosClient.patch(path, params, config);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getUserTokenPreference(): Promise<GetUserTokenPreferenceResponse> {
    const { apiKey } = this.props;

    try {
      const path = `/user/token-preferences`;
      const config: any = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
        },
      };
      if (this.props.userSessionData?.userUuid) {
        config.headers['user-uuid'] = this.props.userSessionData.userUuid;
      } else if (this.props.userSessionData?.unblockSessionId) {
        config.headers['unblock-session-id'] = this.props.userSessionData.unblockSessionId;
      } else {
        throw new UserSessionDataNotSetError();
      }

      const response: AxiosResponse<GetUserTokenPreferenceResponseData> =
        await this.axiosClient.get(path, config);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async updateUserTokenPreference(params: TokenPreference): Promise<void> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/token-preferences`;
      const config = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
      await this.axiosClient.patch(path, params, config);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
