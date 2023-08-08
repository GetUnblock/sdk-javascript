import { AxiosResponse } from 'axios';

import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { ProcessStatus } from '../../enums/ProcessStatus';
import {
  GetOfframpProcessStatusRequest,
  GetOfframpProcessStatusResponse,
  GetOnrampProcessStatusRequest,
  GetOnrampProcessStatusResponse,
} from './definitions';

export interface IProcessService {
  getOnrampProcessStatus(
    params: GetOnrampProcessStatusRequest,
  ): Promise<GetOnrampProcessStatusResponse>;

  getOfframpProcessStatus(
    params: GetOfframpProcessStatusRequest,
  ): Promise<GetOfframpProcessStatusResponse>;
}

export class ProcessService extends BaseService implements IProcessService {
  async getOnrampProcessStatus(
    params: GetOnrampProcessStatusRequest,
  ): Promise<GetOnrampProcessStatusResponse> {
    const { apiKey } = this.props;
    const path = `/process/onramp/${params.processUuid}`;

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
      ErrorHandler.handle(error);
    }
  }

  async getOfframpProcessStatus(
    params: GetOfframpProcessStatusRequest,
  ): Promise<GetOfframpProcessStatusResponse> {
    const { apiKey } = this.props;
    const path = `/process/offramp/${params.processUuid}`;

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
      ErrorHandler.handle(error);
    }
  }
}
