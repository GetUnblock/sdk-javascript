import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import {
  ApiTransactionFeeEstRequest,
  ApiTransactionFeeEstResponse,
  ExchangeRatesServiceRequest,
  ExchangeRatesServiceResponse,
  TransactionFeeEstRequest,
  TransactionFeeEstResponse,
} from './definitions';

export interface IInformativeService {
  getExchangeRate(params: ExchangeRatesServiceRequest): Promise<ExchangeRatesServiceResponse>;
  getTransactionFeeEstimation(params: TransactionFeeEstRequest): Promise<TransactionFeeEstResponse>;
}

export class InformativeService extends BaseService implements IInformativeService {
  async getExchangeRate(
    params: ExchangeRatesServiceRequest,
  ): Promise<ExchangeRatesServiceResponse> {
    const path = `/exchange-rates`;

    const config = {
      headers: {
        accept: 'application/json',
      },
      params: {
        base_currency: params.baseCurrency,
        target_currency: params.targetCurrency,
      },
    };
    try {
      const response: AxiosResponse<{
        exchange_rate: number;
      }> = await this.axiosClient.get(path, config);

      return {
        exchangeRate: response.data.exchange_rate,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getTransactionFeeEstimation(
    params: TransactionFeeEstRequest,
  ): Promise<TransactionFeeEstResponse> {
    const { apiKey } = this.props;
    const { paymentMethod, direction, inputCurrency, outputCurrency, amount } = params;
    const path = `/fees`;
    const queryParams: ApiTransactionFeeEstRequest = {
      payment_method: paymentMethod,
      direction: direction,
      input_currency: inputCurrency,
      output_currency: outputCurrency,
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
      return {
        unblockFee: response.data.unblock_fee,
        merchantFee: response.data.merchant_fee,
        totalFeePercentage: response.data.total_fee_percentage,
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
