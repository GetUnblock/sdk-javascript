import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import { UserSessionDataNotSetError } from '../errors';
import {
  GetUserTokenPreferenceResponse,
  GetUserTokenPreferenceResponseData,
  UpdateUserTokenPreferenceRequestBody,
  UpdateUserTokenPreferencesRequest,
  UpdateUserTokenPreferencesResponse,
  UpdateUserTokenPreferencesResponseData,
} from './definitions';

export interface ITokenPreferenceService {
  getUserTokenPreference(): Promise<GetUserTokenPreferenceResponse>;

  updateUserTokenPreference(
    dto: UpdateUserTokenPreferencesRequest,
  ): Promise<UpdateUserTokenPreferencesResponse>;
}

export class TokenPreferenceService extends BaseService implements ITokenPreferenceService {
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
    dto: UpdateUserTokenPreferencesRequest,
  ): Promise<UpdateUserTokenPreferencesResponse> {
    const { apiKey } = this.props;

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const path = `/user/${this.props.userSessionData.userUuid}/token-preferences`;
      const body: UpdateUserTokenPreferenceRequestBody = dto.preferences;
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
