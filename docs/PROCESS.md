---
title: System Development Kit - Javascript - PROCESS Service
excerpt: Reference page for the Process Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IProcessService {
  getOnrampProcessStatus(dto: GetOnrampProcessStatusRequest): Promise<GetOnrampProcessStatusResponse>;
  getOfframpProcessStatus(dto: GetOfframpProcessStatusRequest): Promise<GetOfframpProcessStatusResponse>;
}
```

### Structures used

#### <span id="GetOnrampProcessStatusRequest"></span>GetOnrampProcessStatusRequest

| Field Name | Type |
| ---------- | ---- |
| processUuid | string |

#### <span id="GetOfframpProcessStatusRequest"></span>GetOfframpProcessStatusRequest

| Field Name | Type |
| ---------- | ---- |
| processUuid | string |

#### <span id="GetOnrampProcessStatusResponse"></span>GetOnrampProcessStatusResponse

| Field Name | Type |
| ---------- | ---- |
| status | [ProcessStatus](COMMON_TYPES.md#Processstatus) |

#### <span id="GetOfframpProcessStatusResponse"></span>GetOfframpProcessStatusResponse

| Field Name | Type |
| ---------- | ---- |
| status | [ProcessStatus](COMMON_TYPES.md#Processstatus) |

### Service Methods

#### getOnrampProcessStatus

<div><pre>getOnrampProcessStatus(params: <a href="#GetOnrampProcessStatusRequest">GetOnrampProcessStatusRequest</a>): Promise&#60;<a href="#GetOnrampProcessStatusResponse">GetOnrampProcessStatusResponse</a>&#62;</pre></div>

##### Overview

This method returns the status of an onramp process.

##### Usage

###### Typescript

```typescript
import getunblockSDK from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.process.getOnrampProcessStatus({
    processUuid: "[target process uuid]",
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.process.getOnrampProcessStatus({
    processUuid: "[target process uuid]",
  });
})();
```

#### getOfframpProcessStatus

<div><pre>getOfframpProcessStatus(params: <a href="#GetOfframpProcessStatusRequest">GetOfframpProcessStatusRequest</a>): Promise&#60;<a href="#GetOfframpProcessStatusResponse">GetOfframpProcessStatusResponse</a>&#62;</pre></div>

##### Overview

This method returns the status of an offramp process.

##### Usage

###### Typescript

```typescript
import getunblockSDK from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.process.getOfframpProcessStatus({
    processUuid: "[target process uuid]",
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.process.getOfframpProcessStatus({
    processUuid: "[target process uuid]",
  });
})();
```

## Other Services Available

* [auth](AUTH.md)
* [company](COMPANY.md)
* [exchangeRates](EXCHANGE_RATES.md)
* [kyc](KYC.md)
* [offramp](OFFRAMP.md)
* [remoteBankAccount](REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](TOKEN_PREFERENCES.md)
* [transactionFee](TRANSACTION_FEE.md)
* [unblockBankAccount](UNBLOCK_BANK_ACCOUNT.md)
* [user](USER.md)

[Back to README](README.md)
