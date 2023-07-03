import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SdkSettings } from 'src/definitions';
import {
  ApiTransactionFeeEstReqParams,
  ApiTransactionFeeEstResponse,
  TransactionFeeEstRequest,
  TransactionFeeEstResponse,
} from './definitions';

export interface ITransactionFeeService {
  getTransactionFeeEstimation(dto: TransactionFeeEstRequest): Promise<TransactionFeeEstResponse>;
}

export class TransactionFeeService implements ITransactionFeeService {
  private readonly axiosClient: AxiosInstance;
  constructor(private props: SdkSettings) {
    const { prod, prodUrl, sandBoxUrl, timeoutMs } = props;
    this.axiosClient = axios.create({
      baseURL: prod ? prodUrl : sandBoxUrl,
      timeout: timeoutMs,
    });
  }

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
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        throw new Error(`Api error': ${axiosError.response?.status} ${axiosError.response?.data}`);
      } else {
        throw new Error(`Unexpected error': ${error}`);
      }
    }
  }
}
