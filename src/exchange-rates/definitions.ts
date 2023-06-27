import { Currency } from '../enums/Currency';

export type ExchangeRatesServiceRequest = {
  baseCurrency: Currency;
  targetCurrency: Currency;
};

export type ExchangeRatesServiceResponse = {
  exchangeRate: number;
};
