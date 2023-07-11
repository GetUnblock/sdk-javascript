import { Currency } from '../enums/Currency';

/** Request dto */
export type ExchangeRatesServiceRequest = {
  baseCurrency: Currency;
  targetCurrency: Currency;
};

/** Response dto */
export type ExchangeRatesServiceResponse = {
  exchangeRate: number;
};
