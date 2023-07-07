import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import {
  AddUserToCompanyApiRequestBody,
  AddUserToCompanyApiResponseData,
  AddUserToCompanyRequest,
  AddUserToCompanyResponse,
  CreateCompanyApiRequestBody,
  CreateCompanyApiResponseData,
  CreateCompanyRequest,
  CreateCompanyResponse,
  RemoveUserFromCompanyApiResponseData,
  RemoveUserFromCompanyRequest,
  RemoveUserFromCompanyResponse,
  UpdateCompanyApiRequestBody,
  UpdateCompanyApiResponseData,
  UpdateCompanyRequest,
  UpdateCompanyResponse,
} from './definitions';

export interface ICompanyService {
  createCompany(dto: CreateCompanyRequest): Promise<CreateCompanyResponse>;
  updateCompany(dto: UpdateCompanyRequest): Promise<UpdateCompanyResponse>;
  addUserToCompany(dto: AddUserToCompanyRequest): Promise<AddUserToCompanyResponse>;
  removeUserFromCompany(dto: RemoveUserFromCompanyRequest): Promise<RemoveUserFromCompanyResponse>;
}

export class CompanyService extends BaseService implements ICompanyService {
  async createCompany(dto: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const { apiKey } = this.props;

    const path = '/company';
    const body: CreateCompanyApiRequestBody = {
      name: dto.name,
      type: dto.type,
      registered_address: dto.registeredAddress,
      city: dto.city,
      country: dto.country,
      registration_number: dto.registrationNumber,
      contact_name: dto.contactName,
      phone: dto.phone,
      email: dto.email,
      industry_sector_type: dto.industrySectorType,
      industry_sector_value: dto.industrySectorValue,
      target_address: dto.targetAddress,
    };
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<CreateCompanyApiResponseData> = await this.axiosClient.post(
        path,
        body,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async updateCompany(dto: UpdateCompanyRequest): Promise<UpdateCompanyResponse> {
    const { apiKey } = this.props;

    const path = `/company/${dto.companyUuid}`;
    const body: UpdateCompanyApiRequestBody = {
      name: dto.name,
      type: dto.type,
      registered_address: dto.registeredAddress,
      city: dto.city,
      country: dto.country,
      registration_number: dto.registrationNumber,
      contact_name: dto.contactName,
      phone: dto.phone,
      email: dto.email,
      industry_sector_type: dto.industrySectorType,
      industry_sector_value: dto.industrySectorValue,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<UpdateCompanyApiResponseData> = await this.axiosClient.patch(
        path,
        body,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async addUserToCompany(dto: AddUserToCompanyRequest): Promise<AddUserToCompanyResponse> {
    const { apiKey } = this.props;

    const path = `/company/${dto.companyUuid}/user`;
    const body: AddUserToCompanyApiRequestBody = {
      company_uuid: dto.companyUuid,
      user_uuid: dto.userUuid,
      role: dto.role,
    };
    const config = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<AddUserToCompanyApiResponseData> = await this.axiosClient.post(
        path,
        body,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async removeUserFromCompany(
    dto: RemoveUserFromCompanyRequest,
  ): Promise<RemoveUserFromCompanyResponse> {
    const { apiKey } = this.props;

    const path = `/company/${dto.companyUuid}/user/${dto.companyUserUuid}`;
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };

    try {
      const response: AxiosResponse<RemoveUserFromCompanyApiResponseData> =
        await this.axiosClient.delete(path, config);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
