# GetUnblock SDK - TOKEN PREFERENCES Service

## Interface

```typescript
interface ITokenPreferenceService {
  getUserTokenPreference(params: GetUserTokenPreferencesRequest): Promise<GetUserTokenPreferenceResponse>
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

#### <span id="GetUserTokenPreferencesRequest"></span>GetUserTokenPreferencesRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |

### Service Methods

#### getUserTokenPreference

<div><pre>getUserTokenPreference(params: <a href="#GetUserTokenPreferencesRequest">GetUserTokenPreferencesRequest</a>): Promise&#60;<a href="#GetUserTokenPreferenceResponse">GetUserTokenPreferenceResponse</a>&#62;</pre></div>

##### Overview

This method returns token preferences for each currency for a particular user.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Chain } from "@getunblock/sdk";

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
});

const loginResult = await sdk.auth.login({
  authenticationMethod: AuthenticationMethod.SIWE,
  message: "[Generated SIWE message]*",
  signature: "[Generated SIWE signature]*",
});
// * more info at https://docs.getunblock.com/docs/unblocker

// SDK API call example
const result = await sdk.tokenPreference.getUserTokenPreference({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Chain } = require("@getunblock/sdk"); 

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
});

const loginResult = await sdk.auth.login({
  authenticationMethod: AuthenticationMethod.SIWE,
  message: "[Generated SIWE message]*",
  signature: "[Generated SIWE signature]*",
});
// * more info at https://docs.getunblock.com/docs/unblocker

// SDK API call example
const result = await sdk.tokenPreference.getUserTokenPreference({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
});
```

#### updateUserTokenPreference

<div><pre>updateUserTokenPreference(params: <a href="#UpdateUserTokenPreferencesRequest">UpdateUserTokenPreferencesRequest</a>): Promise&#60;<a href="#UpdateUserTokenPreferencesResponse">UpdateUserTokenPreferencesResponse</a>&#62;</pre></div>

##### Overview

This method allows to change the token preferences by giving a currency and a token for a particular user

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Chain } from "@getunblock/sdk";

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
});

const loginResult = await sdk.auth.login({
  authenticationMethod: AuthenticationMethod.SIWE,
  message: "[Generated SIWE message]*",
  signature: "[Generated SIWE signature]*",
});
// * more info at https://docs.getunblock.com/docs/unblocker

// SDK API call example
const result = await sdk.tokenPreference.updateUserTokenPreference({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
  preferences: [
    {
      currency: Currency.EUR,
      chain: Chain.OPTIMISM,
      token: OptimismToken.USDC
    }
  ]
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Chain } = require("@getunblock/sdk"); 

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
});

const loginResult = await sdk.auth.login({
  authenticationMethod: AuthenticationMethod.SIWE,
  message: "[Generated SIWE message]*",
  signature: "[Generated SIWE signature]*",
});
// * more info at https://docs.getunblock.com/docs/unblocker

// SDK API call example
const result = await sdk.tokenPreference.updateUserTokenPreference({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
  preferences: [
    {
      currency: Currency.EUR,
      chain: Chain.OPTIMISM,
      token: OptimismToken.USDC
    }
  ]
});
```

## Other Services Available

* [auth](/docs/AUTH.md)
* [company](/docs/COMPANY.md)
* [exchangeRates](/docs/EXCHANGE_RATES.md)
* [kyc](/docs/KYC.md)
* [offramp](/docs/OFFRAMP.md)
* [process](/docs/PROCESS.md)
* [remoteBankAccount](/docs/REMOTE_BANK_ACCOUNT.md)
* [transactionFee](/docs/TRANSACTION_FEE.md)
* [unblockBankAccount](/docs/UNBLOCK_BANK_ACCOUNT.md)
* [user](/docs/USER.md)

[Back to README](/README.md)
