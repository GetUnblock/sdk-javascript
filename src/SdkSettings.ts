import { UserSessionData } from './definitions';

export class SdkSettings {
  sandBoxUrl = 'https://sandbox.getunblock.com';
  prodUrl = 'https://getunblock.com';
  timeoutMs = 10000;
  userSessionData?: UserSessionData;

  constructor(public apiKey: string, public prod: boolean) {}

  setUserSessionData(userSessionData: UserSessionData) {
    this.userSessionData = userSessionData;
  }
}
