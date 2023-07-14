/** SDK Initialization parameters */
export type SdkProps = {
  apiKey: string;
  prod: boolean;
};

export type GlobalSettings = {
  sandBoxUrl: 'https://sandbox.getunblock.com';
  prodUrl: 'https://getunblock.com';
  timeoutMs: 10000;
};

export type UserSessionData = {
  unblockSessionId: string;
  userUuid: string;
};
