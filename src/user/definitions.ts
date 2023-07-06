import Country from '../enums/Country';
import { ProcessStatus } from '../enums/ProcessStatus';

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  targetAddress: string;
  country: Country;
};

export enum UserStatus {
  CREATED = 'CREATED',
  KYC_NEEDED = 'KYC_NEEDED',
  PENDING_KYC_DATA = 'PENDING_KYC_DATA',
  KYC_PENDING = 'KYC_PENDING',
  SOFT_KYC_FAILED = 'SOFT_KYC_FAILED',
  HARD_KYC_FAILED = 'HARD_KYC_FAILED',
  FULL_USER = 'FULL_USER',
}

export type CreateUserResponse = {
  message: string;
  userUuid: string;
  status: UserStatus;
};

export type UserSessionData = {
  unblockSessionId: string;
  userUuid: string;
};

export type GetUserStatusRequest = UserSessionData;

export type GetUserStatusResponse = {
  status: UserStatus;
};

export type GetUserRampTransactionsRequest = UserSessionData;

export enum ProcessDirection {
  ONRAMP = 'ONRAMP',
  OFFRAMP = 'OFFRAMP',
}

export type RampTransactionProcess = {
  uuid: string;
  status: ProcessStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type GetUserRampTransactionsResponse = {
  message: string;
  processes: {
    onramp: RampTransactionProcess[];
    offramp: RampTransactionProcess[];
  };
};
