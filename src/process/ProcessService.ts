import { AxiosError, AxiosResponse } from 'axios';

import { BaseService } from '../BaseService';
import { ProcessStatus } from '../enums/ProcessStatus';
import {
  GetOfframpProcessStatusRequest,
  GetOfframpProcessStatusResponse,
  GetOnrampProcessStatusRequest,
  GetOnrampProcessStatusResponse,
} from './definitions';

export interface IProcessService {
  getOnrampProcessStatus(
    dto: GetOnrampProcessStatusRequest,
  ): Promise<GetOnrampProcessStatusResponse>;

  getOfframpProcessStatus(
    dto: GetOfframpProcessStatusRequest,
  ): Promise<GetOfframpProcessStatusResponse>;
}

export class ProcessService extends BaseService implements IProcessService {
  async getOnrampProcessStatus(
    dto: GetOnrampProcessStatusRequest,
  ): Promise<GetOnrampProcessStatusResponse> {
    const { apiKey } = this.props;
    const path = `/process/onramp/${dto.processUuid}`;

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };
    try {
      const response: AxiosResponse<{ status: ProcessStatus }> = await this.axiosClient.get(
        path,
        config,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        throw new Error(`Api error': ${axiosError.response?.status} ${axiosError.response?.data}`);
      } else {
        throw new Error(`Unexpected error': ${error}`);
      }
    }
  }

  async getOfframpProcessStatus(
    dto: GetOfframpProcessStatusRequest,
  ): Promise<GetOfframpProcessStatusResponse> {
    const { apiKey } = this.props;
    const path = `/process/offramp/${dto.processUuid}`;

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };
    try {
      const response: AxiosResponse<{ status: ProcessStatus }> = await this.axiosClient.get(
        path,
        config,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        throw new Error(`Api error': ${axiosError.response?.status} ${axiosError.response?.data}`);
      } else {
        throw new Error(`Unexpected error': ${error}`);
      }
    }
  }
}
