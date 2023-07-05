import { AxiosResponse } from 'axios';
import { BaseService } from '../BaseService';
import { ErrorHandler } from '../ErrorHandler';
import { ExchangeRatesServiceRequest, ExchangeRatesServiceResponse } from './definitions';

export interface IExchangeRatesService {
  getExchangeRate(params: ExchangeRatesServiceRequest): Promise<ExchangeRatesServiceResponse>;
}

export class ExchangeRatesService extends BaseService implements IExchangeRatesService {
  async getExchangeRate(
    params: ExchangeRatesServiceRequest,
  ): Promise<ExchangeRatesServiceResponse> {
    const { apiKey } = this.props;

    const path = `/exchange-rates`;

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
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
}
