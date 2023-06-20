export type SdkSettingsParams = {
  apiKey: string;
  prod: boolean;
};

export type SdkSettings = {
  sandBoxUrl: 'https://sandbox.getunblock.com';
  prodUrl: 'https://getunblock.com';
  timeoutMs: 10000;
} & SdkSettingsParams;
