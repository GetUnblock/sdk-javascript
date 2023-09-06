import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import {
  AddUserToCorporateApiRequestBody,
  AddUserToCorporateApiResponseData,
  CreateCorporateRequest,
  CreateCorporateResponse,
  GetCorporateDetailsRequest,
  GetCorporateDetailsResponse,
  GetCorporateTokenPreferencesRequest,
  GetCorporateTokenPreferencesResponse,
  GetCorporateTransactionsRequest,
  GetCorporateTransactionsResponse,
  LinkUserToCorporateRequest,
  LinkUserToCorporateResponse,
  RemoveUserFromCorporateApiResponseData,
  UnlinkUserFromCorporateRequest,
  UnlinkUserFromCorporateResponse,
  UpdateCorporateRequest,
  UpdateCorporateTokenPreferencesRequest,
  UpdateCorporateTokenPreferencesResponse,
} from './definitions';
import { UserSessionDataNotSetError } from '../../errors';

export interface ICorporateManagementService {
  createCorporate(params: CreateCorporateRequest): Promise<CreateCorporateResponse>;
  updateCorporate(params: UpdateCorporateRequest): Promise<void>;
  getCorporateDetails(params: GetCorporateDetailsRequest): Promise<GetCorporateDetailsResponse>;
  linkUserToCorporate(params: LinkUserToCorporateRequest): Promise<LinkUserToCorporateResponse>;
  unlinkUserFromCorporate(
    params: UnlinkUserFromCorporateRequest,
  ): Promise<UnlinkUserFromCorporateResponse>;
  getCorporateTransactions(
    params: GetCorporateTransactionsRequest,
  ): Promise<GetCorporateTransactionsResponse>;
  getCorporateTokenPreferences(
    params: GetCorporateTokenPreferencesRequest,
  ): Promise<GetCorporateTokenPreferencesResponse>;
  updateCorporateTokenPreferences(
    params: UpdateCorporateTokenPreferencesRequest,
  ): Promise<UpdateCorporateTokenPreferencesResponse>;
}

export class CorporateManagementService extends BaseService implements ICorporateManagementService {
  async createCorporate(params: CreateCorporateRequest): Promise<CreateCorporateResponse> {
    const { apiKey } = this.props;

    const path = '/corporate';
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<CreateCorporateResponse> = await this.axiosClient.post(
        path,
        params,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async updateCorporate(params: UpdateCorporateRequest): Promise<void> {
    const { apiKey } = this.props;

    if (!this.props.userSessionData?.unblockSessionId) {
      throw new UserSessionDataNotSetError();
    }

    const { corporate_uuid, ...body } = params;
    const path = `/corporate/${corporate_uuid}`;
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': this.props.userSessionData.unblockSessionId,
      },
    };

    try {
      await this.axiosClient.patch(path, body, config);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async linkUserToCorporate(
    params: LinkUserToCorporateRequest,
  ): Promise<LinkUserToCorporateResponse> {
    const { apiKey } = this.props;

    const path = `/corporate/${params.corporateUuid}/user`;
    const body: AddUserToCorporateApiRequestBody = {
      corporate_uuid: params.corporateUuid,
      user_uuid: params.userUuid,
      role: params.role,
    };
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<AddUserToCorporateApiResponseData> =
        await this.axiosClient.post(path, body, config);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async unlinkUserFromCorporate(
    params: UnlinkUserFromCorporateRequest,
  ): Promise<UnlinkUserFromCorporateResponse> {
    const { apiKey } = this.props;

    if (!this.props.userSessionData?.unblockSessionId) {
      throw new UserSessionDataNotSetError();
    }

    const path = `/corporate/${params.corporateUuid}/user/${params.corporateUserUuid}`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': this.props.userSessionData.unblockSessionId,
      },
    };

    try {
      const response: AxiosResponse<RemoveUserFromCorporateApiResponseData> =
        await this.axiosClient.delete(path, config);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getCorporateDetails(
    params: GetCorporateDetailsRequest,
  ): Promise<GetCorporateDetailsResponse> {
    const { apiKey } = this.props;

    try {
      const path = `/corporate/${params.corporate_uuid}`;

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
      const response: AxiosResponse<GetCorporateDetailsResponse> = await this.axiosClient.get(
        path,
        config,
      );

      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  getCorporateTransactions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateTransactionsRequest,
  ): Promise<GetCorporateTransactionsResponse> {
    throw new Error('Method not implemented.');
  }
  getCorporateTokenPreferences(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCorporateTokenPreferencesRequest,
  ): Promise<GetCorporateTokenPreferencesResponse> {
    throw new Error('Method not implemented.');
  }
  updateCorporateTokenPreferences(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: UpdateCorporateTokenPreferencesRequest,
  ): Promise<UpdateCorporateTokenPreferencesResponse> {
    throw new Error('Method not implemented.');
  }
}
