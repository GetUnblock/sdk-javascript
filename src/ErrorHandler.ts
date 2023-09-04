import { AxiosError } from 'axios';
import { BadRequestError, SiweSigningError } from './errors';

export class ErrorHandler {
  static handle(error: unknown): never {
    switch (true) {
      case error instanceof SiweSigningError:
        const siweError = error as SiweSigningError;
        console.error(siweError.error);
        throw new Error(`Siwe Signing Error: ${siweError.error}`);
      case error instanceof AxiosError:
        const axiosError = error as AxiosError;
        console.error(
          `${axiosError.response?.status}: ${JSON.stringify(axiosError.response?.data)}`,
        );
        throw new Error(`Api error: ${axiosError.response?.status} ${axiosError.response?.data}`);
      case error instanceof BadRequestError:
        console.error(error);
        throw new Error(`Bad request: ${error}`);
      default:
        console.error(error);
        throw new Error(`Unexpected error: ${error}`);
    }
  }
}
