import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import {
  GetUserOfframpAddressRequest,
  GetUserOfframpAddressResponse,
  GetUserOfframpAddressResponseData,
} from './definitions';

export interface IOfframpService {
  getUserOfframpAddress(dto: GetUserOfframpAddressRequest): Promise<GetUserOfframpAddressResponse>;
}

export class OfframpService extends BaseService implements IOfframpService {
  async getUserOfframpAddress(
    dto: GetUserOfframpAddressRequest,
  ): Promise<GetUserOfframpAddressResponse> {
    const { apiKey } = this.props;
    const { userUuid, unblockSessionId, chain } = dto;
    const path = `/user/${userUuid}/wallet/${chain}`;

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
        'unblock-session-id': unblockSessionId,
      },
    };
    try {
      const response: AxiosResponse<GetUserOfframpAddressResponseData> = await this.axiosClient.get(
        path,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
