import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import {
  ApiTransactionFeeEstReqParams,
  ApiTransactionFeeEstResponse,
  TransactionFeeEstRequest,
  TransactionFeeEstResponse,
} from './definitions';

export interface ITransactionFeeService {
  getTransactionFeeEstimation(dto: TransactionFeeEstRequest): Promise<TransactionFeeEstResponse>;
}

export class TransactionFeeService extends BaseService implements ITransactionFeeService {
  async getTransactionFeeEstimation(
    dto: TransactionFeeEstRequest,
  ): Promise<TransactionFeeEstResponse> {
    const { apiKey } = this.props;
    const { paymentMethod, direction, inputCurrency, outputCurrency, amount } = dto;
    const path = `/transaction-fee`;
    const queryParams: ApiTransactionFeeEstReqParams = {
      paymentMethod: paymentMethod,
      direction: direction,
      inputCurrency: inputCurrency,
      outputCurrency: outputCurrency,
      amount: amount,
    };
    const config = {
      params: { ...queryParams },
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    };
    try {
      const response: AxiosResponse<ApiTransactionFeeEstResponse> = await this.axiosClient.get(
        path,
        config,
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
