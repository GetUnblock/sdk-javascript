export class BadRequestError extends Error {}

export class SiweSigningError extends BadRequestError {
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
