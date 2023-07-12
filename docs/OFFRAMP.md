---
title: System Development Kit - Javascript - OFFRAMP Service
excerpt: Reference page for the Offramp Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IOfframpService {
  getUserOfframpAddress(dto: GetUserOfframpAddressRequest): Promise<GetUserOfframpAddressResponse>;
}
```

### Structures used

#### <span id="GetUserOfframpAddressRequest"></span>GetUserOfframpAddressRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |
| chain | [Chain](COMMON_TYPES.md#chain) |

#### <span id="GetUserOfframpAddressResponse"></span>GetUserOfframpAddressResponse

| Field Name | Type |
| ---------- | ---- |
| message | string |
| addresses | string[] |

### Service Methods

#### getUserOfframpAddress

<div><pre>getUserOfframpAddress(params: <a href="#GetUserOfframpAddressRequest">GetUserOfframpAddressRequest</a>): Promise&#60;<a href="#GetUserOfframpAddressResponse">GetUserOfframpAddressResponse</a>&#62;</pre></div>

##### Overview

This method returns a crypto address to which user needs to transfer crypto assets on a given chain to begin offramp process.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Chain } from "@getunblock/sdk";

(async () => {
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
  const result = await sdk.offramp.getUserOfframpAddress({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    chain: Chain.POLYGON
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Chain } = require("@getunblock/sdk"); 

(async () => {
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
  const result = await sdk.offramp.getUserOfframpAddress({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    chain: Chain.POLYGON
  });
})();
```

## Other Services Available

* [auth](AUTH.md)
* [company](COMPANY.md)
* [exchangeRates](EXCHANGE_RATES.md)
* [kyc](KYC.md)
* [process](PROCESS.md)
* [remoteBankAccount](REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](TOKEN_PREFERENCES.md)
* [transactionFee](TRANSACTION_FEE.md)
* [unblockBankAccount](UNBLOCK_BANK_ACCOUNT.md)
* [user](USER.md)

[Back to README](../README.md)
