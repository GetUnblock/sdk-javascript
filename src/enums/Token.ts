export enum CeloToken {
  CELO = 'CELO',
  CEUR = 'cEUR',
  CUSD = 'cUSD',
}

export enum PolygonToken {
  USDC = 'usdc',
  USDT = 'usdt',
  MATIC = 'matic',
  DAI = 'dai',
}

export enum OptimismToken {
  USDC = 'usdc',
  USDT = 'usdt',
  ETH = 'eth',
  DAI = 'dai',
}

export enum MainnetToken {
  USDC = 'usdc',
  USDT = 'usdt',
  ETH = 'eth',
  DAI = 'dai',
}

export enum ArbitrumToken {
  USDC = 'usdc',
  USDT = 'usdt',
  ETH = 'eth',
  DAI = 'dai',
}

export enum TronToken {
  USDT = 'usdt',
  TRX = 'trx',
}

export type StableToken =
  | CeloToken.CEUR
  | CeloToken.CUSD
  | PolygonToken.USDC
  | PolygonToken.USDT
  | OptimismToken.USDC
  | MainnetToken.USDC
  | MainnetToken.USDT
  | ArbitrumToken.USDC
  | TronToken.USDT
  | OptimismToken.USDT
  | ArbitrumToken.USDT
  | PolygonToken.DAI
  | OptimismToken.DAI
  | MainnetToken.DAI
  | ArbitrumToken.DAI;

export enum Token {
  USDT = 'USDT',
  USDC = 'USDC',
  DAI = 'DAI',
  CEUR = 'CEUR',
  CUSD = 'CUSD',
}
