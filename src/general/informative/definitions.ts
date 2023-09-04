import { Currency } from '../../enums/Currency';
import { PaymentMethods } from '../../enums/PaymentMethods';
import { ProcessDirection } from '../../enums/ProcessDirection';
import { Token } from '../../enums/Token';

/** Request dto */
export type ExchangeRatesServiceRequest = {
  baseCurrency: Currency;
  targetCurrency: Currency;
};

/** Response dto */
export type ExchangeRatesServiceResponse = {
  exchangeRate: number;
};

/**
 * Request for Get Transaction Fee Estimation
 */
export type TransactionFeeEstRequest = {
  paymentMethod: PaymentMethods;
  direction: ProcessDirection;
  inputCurrency: Currency | Token;
  outputCurrency: Currency | Token;
  amount: number;
};

type MerchantFee = {
  type: 'add' | 'remove';
  amount: number;
};
/**
 * Response for Get Transaction Fee Estimation
 */
export type TransactionFeeEstResponse = {
  unblockFee: number;
  merchantFee: MerchantFee;
  totalFeePercentage: number;
};

export type ApiTransactionFeeEstRequest = {
  payment_method: PaymentMethods;
  direction: ProcessDirection;
  input_currency: Currency | Token;
  output_currency: Currency | Token;
  amount: number;
};

export type ApiTransactionFeeEstResponse = {
  unblock_fee: number;
  merchant_fee: MerchantFee;
  total_fee_percentage: number;
};
