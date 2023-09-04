import { Currency } from '../../enums/Currency';
import { ProcessDirection } from '../../enums/ProcessDirection';
import { ProcessStatus } from '../../enums/ProcessStatus';

type InputDetail = {
  amount: number;
  currency: Currency; // | Token -> Is in the other PR
  transactionId: string;
};
type OutputDetail = InputDetail;

/** Request dto */
export type GetTransactionDetailsRequest = {
  processUuid: string;
};
/** Response dto */
export type GetTransactionDetailsResponse = {
  status: ProcessStatus;
  userUuid: string;
  direction: ProcessDirection;
  input: InputDetail;
  output: OutputDetail;
};
