import { Currency } from './enums/Currency';
import { Token } from './enums/Token';

export class BadRequestError extends Error {}

export class SiweSigningError extends Error {
  constructor(public error: Error) {
    super(error.message);
  }
}

export class UserUuidNotSetError extends BadRequestError {
  constructor(details: string) {
    super(`The user uuid must be set first!\n${details}`);
  }
}

export class UserSessionDataNotSetError extends BadRequestError {
  constructor() {
    super(`The user session data was not set yet! Do the email login or siwe login first!`);
  }
}

export class UnsupportedEnvironmentError extends BadRequestError {
  constructor(environment: string) {
    super(`The operation you tried to call is not supported in environment ${environment}`);
  }
}

export class InvalidAccountDetailsError extends BadRequestError {
  constructor() {
    super(`Invalid account details`);
  }
}

export class InputAndOutputCurrencyMustBeOfDifferentTypeError extends BadRequestError {
  constructor(inputCurrency: Currency | Token, outputCurrency: Currency | Token) {
    super(
      `Input and Output Currency cannot be of the same type (fiat or crypto). Input currency provided ${inputCurrency}; Output currency provided: ${outputCurrency}`,
    );
  }
}

export class CurrencyNotSupportedError extends BadRequestError {
  constructor(currency: string) {
    super(`The currency ${currency} that you provided is not supported for this operation`);
  }
}
