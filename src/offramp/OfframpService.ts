import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import { UserSessionDataNotSetError } from '../errors';
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

    try {
      if (!this.props.userSessionData?.userUuid || !this.props.userSessionData.unblockSessionId) {
        throw new UserSessionDataNotSetError();
      }

      const { chain } = dto;
      const path = `/user/${this.props.userSessionData.userUuid}/wallet/${chain}`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
          'unblock-session-id': this.props.userSessionData.unblockSessionId,
        },
      };
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
