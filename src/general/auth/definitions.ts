// Interfaces
export interface IEthereumProviderSigner {
  getAddress(): Promise<string>;
  signMessage(message: string): Promise<string>;
}

// Requests
/** Request dto */
export type AuthenticateWithSiweRequest = {
  message: string;
  signature: string;
};

/** Request dto */
export type AuthenticateWithEmailRequest = {
  userUuid: string;
};

/** Request dto */
export type SetUnblockSessionByEmailCodeRequest = {
  emailCode: string;
};

export type CreateSiweMessageRequest = {
  walletAddress: string;
  statement: string;
  signingUrl: string;
  chainId: number;
};

export type SiweLoginRequest = {
  providerSigner: IEthereumProviderSigner;
  chainId: string;
  signingUrl: string;
};

export type GenerateSiweSignedMessageRequest = SiweLoginRequest;

// Responses

/** Response dto */
export type AuthenticateWithEmailResponse = {
  message: string;
};

/** Response dto */
export type GenerateSiweSiginedMessageResponse = {
  message: string;
  signature: string;
};
