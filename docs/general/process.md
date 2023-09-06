---
title: Process Service
excerpt: Reference page for the Process Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IProcessService {
  getTransactionDetails(
    params: GetTransactionDetailsRequest,
  ): Promise<GetTransactionDetailsResponse>;
}
```

### Structures used

#### Union types, Literal types, Enums and Other Interfaces

<span id="InputDetail"></span>

```typescript
type InputDetail = {
  amount: number;
  currency: Currency | Token;
  transactionId: string;
};
```

<span id="OutputDetail"></span>

```typescript
type OutputDetail = InputDetail;
```

#### <span id="GetTransactionDetailsRequest"></span>GetTransactionDetailsRequest

| Field Name  | Type   |
| ----------- | ------ |
| processUuid | string |

#### <span id="GetTransactionDetailsResponse"></span>GetTransactionDetailsResponse

| Field Name | Type                                                    |
| ---------- | ------------------------------------------------------- |
| status     | [ProcessStatus](../common-types.md#processstatus)       |
| userUuid   | string                                                  |
| direction  | [ProcessDirection](../common-types.md#processdirection) |
| input      | [InputDetail](#inputdetail)                             |
| output     | [OutputDetail](#outputdetail)                           |

### Service Methods

#### getTransactionDetails

<div><pre>getOnrampProcessStatus(params: <a href="#GetTransactionDetailsRequest">GetTransactionDetailsRequest</a>): Promise&#60;<a href="#GetTransactionDetailsResponse">GetTransactionDetailsResponse</a>&#62;</pre></div>

##### Overview

This method allows a merchant to obtain details on a specific process

##### Usage

###### Typescript

```typescript
import getunblockSDK from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.general.process.getTransactionDetails({
    processUuid: '[target process uuid]',
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.general.process.getTransactionDetails({
    processUuid: '[target process uuid]',
  });
})();
```

<div class="CodeMirror-gutter-filler">

[Back to general services index](./index.md)
[Back to root index](../index.md)

</div>
