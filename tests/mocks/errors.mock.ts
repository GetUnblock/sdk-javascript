import { faker } from '@faker-js/faker';
import { AxiosError, AxiosResponse } from 'axios';

export const axiosErrorMock = (): AxiosError => {
  return new AxiosError(undefined, undefined, undefined, undefined, {
    status: faker.internet.httpStatusCode({ types: ['serverError', 'clientError'] }),
    data: {
      [faker.random.word()]: faker.datatype.string(),
    },
  } as AxiosResponse);
};

export const randomErrorMock = (): unknown => {
  return {
    [faker.random.word()]: faker.datatype.string(),
  };
};
