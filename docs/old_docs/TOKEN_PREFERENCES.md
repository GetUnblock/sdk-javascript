---
title: Token Preferences Service
excerpt: Reference page for the Token Preferences Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface ITokenPreferenceService {
  getUserTokenPreference(): Promise<GetUserTokenPreferenceResponse>
  updateUserTokenPreference(params: UpdateUserTokenPreferencesRequest): Promise<UpdateUserTokenPreferencesResponse>;
}
```

### Structures used

#### Union types, Literal Types and Enums

<span id="TokenPreferencePolygon"></span>

```typescript
type TokenPreferencePolygon = {
  currency: Currency;
  chain: Chain.POLYGON;
  token: PolygonToken;
};
```

<span id="TokenPreferenceCelo"></span>

```typescript
type TokenPreferenceCelo = {
  currency: Currency;
  chain: Chain.CELO;
  token: CeloToken;
};
```

<span id="TokenPreferenceOptimism"></span>

```typescript
type TokenPreferenceOptimism = {
  currency: Currency;
  chain: Chain.OPTIMISM;
  token: OptimismToken;
};
```

<span id="TokenPreferenceMainnet"></span>

```typescript
type TokenPreferenceMainnet = {
  currency: Currency;
  chain: Chain.MAINNET;
  token: MainnetToken;
};
```

<span id="TokenPreferenceArbitrum"></span>

```typescript
type TokenPreferenceArbitrum = {
  currency: Currency;
  chain: Chain.ARBITRUM;
  token: ArbitrumToken;
};
```

<span id="TokenPreference"></span>

```typescript
type TokenPreference =
  | TokenPreferencePolygon
  | TokenPreferenceCelo
  | TokenPreferenceOptimism
  | TokenPreferenceMainnet
  | TokenPreferenceArbitrum
```

<span id="GetUserTokenPreferenceResponse"></span>

```typescript
type GetUserTokenPreferenceResponse = TokenPreference[]
```

#### <span id="UpdateUserTokenPreferencesRequest"></span>UpdateUserTokenPreferencesRequest

| Field Name | Type |
| ---------- | ---- |
| preferences | [TokenPreference](#TokenPreference)[] |

### Service Methods

#### getUserTokenPreference

<div><pre>getUserTokenPreference(): Promise&#60;<a href="#GetUserTokenPreferenceResponse">GetUserTokenPreferenceResponse</a>&#62;</pre></div>

##### Overview

This method returns token preferences for each currency for a particular user.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  await sdk.auth.authenticateWithSiwe({
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.tokenPreference.getUserTokenPreference();
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod } = require("@getunblock/sdk"); 

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.tokenPreference.getUserTokenPreference();
})();
```

#### updateUserTokenPreference

<div><pre>updateUserTokenPreference(params: <a href="#UpdateUserTokenPreferencesRequest">UpdateUserTokenPreferencesRequest</a>): Promise&#60;<a href="#UpdateUserTokenPreferencesResponse">UpdateUserTokenPreferencesResponse</a>&#62;</pre></div>

##### Overview

This method allows to change the token preferences by giving a currency and a token for a particular user

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Currency, OptimismToken, Chain } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.tokenPreference.updateUserTokenPreference({
    preferences: [
      {
        currency: Currency.EUR,
        chain: Chain.OPTIMISM,
        token: OptimismToken.USDC
      }
    ]
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod, Currency, Chain, OptimismToken } = require("@getunblock/sdk"); 

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.tokenPreference.updateUserTokenPreference({
    preferences: [
      {
        currency: Currency.EUR,
        chain: Chain.OPTIMISM,
        token: OptimismToken.USDC
      }
    ]
  });
})();
```

<div class="CodeMirror-gutter-filler">
<h3>Other Services Available</h3>

* [auth](AUTH.md)
* [company](COMPANY.md)
* [exchangeRates](EXCHANGE_RATES.md)
* [kyc](KYC.md)
* [offramp](OFFRAMP.md)
* [process](PROCESS.md)
* [remoteBankAccount](REMOTE_BANK_ACCOUNT.md)
* [transactionFee](TRANSACTION_FEE.md)
* [unblockBankAccount](UNBLOCK_BANK_ACCOUNT.md)
* [user](USER.md)

[Back to README](../README.md)
</div>
