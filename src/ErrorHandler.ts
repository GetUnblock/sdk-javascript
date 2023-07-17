import { AxiosError } from 'axios';
import { SiweSigningError } from './errors';

export class ErrorHandler {
  static handle(error: unknown): never {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      console.error(`${axiosError.response?.status}: ${JSON.stringify(axiosError.response?.data)}`);
      throw new Error(`Api error: ${axiosError.response?.status} ${axiosError.response?.data}`);
    } else if (error instanceof SiweSigningError) {
      console.error(error.error);
      throw new Error(`Siwe Signing Error: ${error.error}`);
    } else {
      console.error(error);
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}
