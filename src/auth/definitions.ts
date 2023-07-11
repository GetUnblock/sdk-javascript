import { AuthenticationMethod } from '../enums/AuthenticationMethod';

/** Request dto */
export type SiweLoginRequest = {
  authenticationMethod: AuthenticationMethod.SIWE;
  message: string;
  signature: string;
};

/** Request dto */
export type EmailLoginRequest = {
  authenticationMethod: AuthenticationMethod.EMAIL;
  userUuid: string;
};

/** Request dto */
export type LoginRequest = SiweLoginRequest | EmailLoginRequest;

/** Request dto */
export type SessionRequest = {
  userUuid: string;
  code: string;
};

/** Response dto */
export type SiweLoginResponse = {
  userUuid: string;
  unblockSessionId: string;
};

/** Response dto */
export type EmailLoginResponse = {
  message: string;
  userUuid: string;
};

/** Response dto */
export type LoginResponse = {
  authenticationMethod: AuthenticationMethod;
} & (SiweLoginResponse | EmailLoginResponse);

/** Response dto */
export type SessionResponse = {
  sessionId: string;
};
