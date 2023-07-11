import { ProcessStatus } from '../enums/ProcessStatus';

/** Request dto*/
export type GetOnrampProcessStatusRequest = {
  processUuid: string;
};

/** Request dto*/
export type GetOfframpProcessStatusRequest = {
  processUuid: string;
};

/** Response dto*/
export type GetOnrampProcessStatusResponse = {
  status: ProcessStatus;
};

/** Response dto*/
export type GetOfframpProcessStatusResponse = {
  status: ProcessStatus;
};
