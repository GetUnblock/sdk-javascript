import { AxiosError } from 'axios';
import { BadRequestError } from './errors';

export class ErrorHandler {
  static handle(error: unknown): never {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      console.error(`${axiosError.response?.status}: ${JSON.stringify(axiosError.response?.data)}`);
      throw new Error(`Api error: ${axiosError.response?.status} ${axiosError.response?.data}`);
    } else if (error instanceof BadRequestError) {
      console.error(error.message);
      throw new Error(`Bad request: ${error.message}`);
    } else {
      console.error(error);
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}
