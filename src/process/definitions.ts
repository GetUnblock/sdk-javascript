import { ProcessStatus } from '../enums/ProcessStatus';

/** Request for Get Onramp Process Status*/
export type GetOnrampProcessStatusRequest = {
  processUuid: string;
};

/** Request for Get Offramp Process Status*/
export type GetOfframpProcessStatusRequest = {
  processUuid: string;
};

/** Response for Get Offramp Process Status*/
export type GetOnrampProcessStatusResponse = {
  status: ProcessStatus;
};

/** Response for Get Offramp Process Status*/
export type GetOfframpProcessStatusResponse = {
  status: ProcessStatus;
};
