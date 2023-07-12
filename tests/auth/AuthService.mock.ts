import { IEthereumProviderSigner } from '../../src';

export const mockEthereumProviderSigner: () => jest.Mocked<IEthereumProviderSigner> = () => ({
  getAddress: jest.fn(),
  signMessage: jest.fn(),
});
