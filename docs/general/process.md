---
title: Process Service
excerpt: Reference page for the Process Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IProcessService {
  getOnrampProcessStatus(
    paramsGetOnrampProcessStatusRequest,
  ): Promise<GetOnrampProcessStatusResponse>;
  getOfframpProcessStatus(
    paramsGetOfframpProcessStatusRequest,
  ): Promise<GetOfframpProcessStatusResponse>;
}
```

### Structures used

#### <span id="GetOnrampProcessStatusRequest"></span>GetOnrampProcessStatusRequest

| Field Name  | Type   |
| ----------- | ------ |
| processUuid | string |

#### <span id="GetOfframpProcessStatusRequest"></span>GetOfframpProcessStatusRequest

| Field Name  | Type   |
| ----------- | ------ |
| processUuid | string |

#### <span id="GetOnrampProcessStatusResponse"></span>GetOnrampProcessStatusResponse

| Field Name | Type                                           |
| ---------- | ---------------------------------------------- |
| status     | [ProcessStatus](COMMON_TYPES.md#Processstatus) |

#### <span id="GetOfframpProcessStatusResponse"></span>GetOfframpProcessStatusResponse

| Field Name | Type                                           |
| ---------- | ---------------------------------------------- |
| status     | [ProcessStatus](COMMON_TYPES.md#Processstatus) |

### Service Methods

#### getOnrampProcessStatus

<div><pre>getOnrampProcessStatus(params: <a href="#GetOnrampProcessStatusRequest">GetOnrampProcessStatusRequest</a>): Promise&#60;<a href="#GetOnrampProcessStatusResponse">GetOnrampProcessStatusResponse</a>&#62;</pre></div>

##### Overview

This method returns the status of an onramp process.

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
  const result = await sdk.process.getOnrampProcessStatus({
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
  const result = await sdk.process.getOnrampProcessStatus({
    processUuid: '[target process uuid]',
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
import getunblockSDK from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.process.getOfframpProcessStatus({
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
  const result = await sdk.process.getOfframpProcessStatus({
    processUuid: '[target process uuid]',
  });
})();
```

<div class="CodeMirror-gutter-filler">

[Back to general services index](./index.md)
[Back to root index](../index.md)

</div>
