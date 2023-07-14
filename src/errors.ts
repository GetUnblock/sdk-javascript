export class SiweSigningError extends Error {
  constructor(public error: Error) {
    super(error.message);
  }
}

export class UserUuidNotSetError extends Error {
  constructor(details: string) {
    super(`The user uuid must be set first!\n${details}`);
  }
}

export class UserSessionDataNotSetError extends Error {
  constructor() {
    super(`The user session data was not set yet! Do the email login or siwe login first!`);
  }
}

export class InvalidAccountDetailsError extends Error {
  constructor() {
    super(`Invalid account details`);
  }
}
