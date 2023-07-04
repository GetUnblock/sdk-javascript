import { faker } from '@faker-js/faker';
import { AxiosError, AxiosResponse } from 'axios';

export const axiosErrorMock: AxiosError = new AxiosError(
  undefined,
  undefined,
  undefined,
  undefined,
  {
    status: 500,
    data: {
      [faker.random.word()]: faker.datatype.string,
    },
  } as AxiosResponse,
);

export const randomErrorMock: unknown = {
  [faker.random.word()]: faker.datatype.string,
};
