import { AxiosResponse } from 'axios';

import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import { GetTransactionDetailsRequest, GetTransactionDetailsResponse } from './definitions';

export interface IProcessService {
  getTransactionDetails(
    params: GetTransactionDetailsRequest,
  ): Promise<GetTransactionDetailsResponse>;
}

export class ProcessService extends BaseService implements IProcessService {
  async getTransactionDetails(
    params: GetTransactionDetailsRequest,
  ): Promise<GetTransactionDetailsResponse> {
    const { apiKey } = this.props;
    const path = '/process';
    const queryParams = {
      process_uuid: params.processUuid,
    };

    const config = {
      params: { ...queryParams },
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };
    try {
      const response: AxiosResponse<{ [key: string]: any }> = await this.axiosClient.get(
        path,
        config,
      );
      const data = response.data;

      return {
        status: data.status,
        userUuid: data.user_uuid,
        direction: data.direction,
        input: {
          amount: data.input.amount,
          currency: data.input.currency,
          transactionId: data.input.transaction_id,
        },
        output: {
          amount: data.output.amount,
          currency: data.output.currency,
          transactionId: data.output.transaction_id,
        },
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
