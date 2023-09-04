import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import {
  AddUserToCorporateApiRequestBody,
  AddUserToCorporateApiResponseData,
  CreateCorporateApiRequestBody,
  CreateCorporateApiResponseData,
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
  UpdateCorporateApiRequestBody,
  UpdateCorporateApiResponseData,
  UpdateCorporateRequest,
  UpdateCorporateResponse,
  UpdateCorporateTokenPreferencesRequest,
  UpdateCorporateTokenPreferencesResponse,
} from './definitions';

export interface ICorporateManagementService {
  createCorporate(params: CreateCorporateRequest): Promise<CreateCorporateResponse>;
  updateCorporate(params: UpdateCorporateRequest): Promise<UpdateCorporateResponse>;
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
    const body: CreateCorporateApiRequestBody = {
      name: params.legal_name,
      type: params.type,
      registered_address: params.registeredAddress,
      city: params.city,
      country: params.country,
      registration_number: params.registrationNumber,
      contact_name: params.contactName,
      phone: params.phone,
      email: params.email,
      industry_sector_type: params.industrySectorType,
      industry_sector_value: params.industrySectorValue,
      target_address: params.targetAddress,
    };
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<CreateCorporateApiResponseData> = await this.axiosClient.post(
        path,
        body,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async updateCorporate(params: UpdateCorporateRequest): Promise<UpdateCorporateResponse> {
    const { apiKey } = this.props;

    const path = `/corporate/${params.corporateUuid}`;
    const body: UpdateCorporateApiRequestBody = {
      name: params.legal_name,
      type: params.type,
      registered_address: params.registeredAddress,
      city: params.city,
      country: params.country,
      registration_number: params.registrationNumber,
      contact_name: params.contactName,
      phone: params.phone,
      email: params.email,
      industry_sector_type: params.industrySectorType,
      industry_sector_value: params.industrySectorValue,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<UpdateCorporateApiResponseData> = await this.axiosClient.patch(
        path,
        body,
        config,
      );
      return response.data;
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

    const path = `/corporate/${params.corporateUuid}/user/${params.corporateUserUuid}`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCorporateDetails(params: GetCorporateDetailsRequest): Promise<GetCorporateDetailsResponse> {
    throw new Error('Method not implemented.');
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
