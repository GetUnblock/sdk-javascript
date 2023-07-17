import Country from '../enums/Country';
import { ProcessStatus } from '../enums/ProcessStatus';
import { UserStatus } from '../enums/UserStatus';

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  targetAddress: string;
  country: Country;
};

export type CreateUserResponse = {
  message: string;
  userUuid: string;
  status: UserStatus;
};

export type GetUserStatusResponse = {
  status: UserStatus;
};

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
