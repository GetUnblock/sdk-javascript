// ENUMS
export enum AuthenticationMethod {
  SIWE = 'SIWE',
  EMAIL = 'EMAIL',
}

// Types
// Requests
export type SiweLoginRequest = {
  authenticationMethod: AuthenticationMethod.SIWE;
  message: string;
  signature: string;
};

export type EmailLoginRequest = {
  authenticationMethod: AuthenticationMethod.EMAIL;
  userUuid: string;
};

export type LoginRequest = SiweLoginRequest | EmailLoginRequest;

export type SessionRequest = {
  userUuid: string;
  code: string;
};

// Responses
export type SiweLoginResponse = {
  userUuid: string;
  unblockSessionId: string;
};

export type EmailLoginResponse = {
  message: string;
  userUuid: string;
};

export type LoginResponse = {
  authenticationMethod: AuthenticationMethod;
} & (SiweLoginResponse | EmailLoginResponse);

export type SessionResponse = {
  sessionId: string;
};
