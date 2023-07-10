import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import { UserSessionData } from '../definitions';
import {
  GetUserTokenPreferenceResponse,
  GetUserTokenPreferenceResponseData,
  GetUserTokenPreferencesRequest,
  UpdateUserTokenPreferenceRequestBody,
  UpdateUserTokenPreferencesRequest,
  UpdateUserTokenPreferencesResponse,
  UpdateUserTokenPreferencesResponseData,
} from './definitions';

export interface ITokenPreferenceService {
  getUserTokenPreference(
    dto: GetUserTokenPreferencesRequest,
  ): Promise<GetUserTokenPreferenceResponse>;

  updateUserTokenPreference(
    dto: UpdateUserTokenPreferencesRequest,
  ): Promise<UpdateUserTokenPreferencesResponse>;
}

export class TokenPreferenceService extends BaseService implements ITokenPreferenceService {
  async getUserTokenPreference(dto: UserSessionData): Promise<GetUserTokenPreferenceResponse> {
    const { apiKey } = this.props;
    const { userUuid, unblockSessionId } = dto;

    const path = `/user/${userUuid}/token-preferences`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': unblockSessionId,
      },
    };

    try {
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
    const { userUuid, unblockSessionId } = dto;

    const path = `/user/${userUuid}/token-preferences`;
    const body: UpdateUserTokenPreferenceRequestBody = dto.preferences;
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': unblockSessionId,
      },
    };

    try {
      const response: AxiosResponse<UpdateUserTokenPreferencesResponseData> =
        await this.axiosClient.patch(path, body, config);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
