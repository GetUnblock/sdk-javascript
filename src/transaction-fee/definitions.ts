import { Currency } from '../enums/Currency';
import { PaymentMethods } from '../enums/PaymentMethods';
import { ProcessDirection } from '../enums/ProcessDirection';

/**
 * Request for Get Transaction Fee Estimation
 */
export type TransactionFeeEstRequest = ApiTransactionFeeEstReqParams;

/**
 * Response for Get Transaction Fee Estimation
 */
export type TransactionFeeEstResponse = ApiTransactionFeeEstResponse;

/**
 * Query Params for GU API Get Transaction Fee Estimation
 */
export type ApiTransactionFeeEstReqParams = {
  paymentMethod: PaymentMethods;
  direction: ProcessDirection;
  inputCurrency: Currency;
  outputCurrency: Currency;
  amount: number;
};

/**
 * GU API Response for Get Transaction Fee Estimation
 */
export type ApiTransactionFeeEstResponse = {
  percentageFee: number;
  totalAmount: number;
};
