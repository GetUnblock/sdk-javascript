import { AxiosError } from 'axios';

export class ErrorHandler {
  static handle(error: unknown): never {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      console.error(axiosError.response?.data);
      throw new Error(`Api error': ${axiosError.response?.status} ${axiosError.response?.data}`);
    } else {
      console.error(error);
      throw new Error(`Unexpected error': ${error}`);
    }
  }
}
