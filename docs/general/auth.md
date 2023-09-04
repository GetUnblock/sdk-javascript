---
title: Auth Service
excerpt: Reference page for the Auth Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IAuthService {
  generateSiweSignedMessage(
    params: GenerateSiweSignedMessageRequest,
  ): Promise<GenerateSiweSignedMessageResponse>;
  siweLogin(params: SiweLoginRequest): Promise<void>;
  createSiweMessage(params: CreateSiweMessageRequest): string;
  authenticateWithSiwe(params: AuthenticateWithSiweRequest): Promise<void>;
  authenticateWithEmail(params: AuthenticateWithEmailRequest): Promise<void>;
  authenticateWithEmail(
    params: AuthenticateWithEmailRequest,
  ): Promise<void>;
  setUnblockSessionByEmailCode(params: SetUnblockSessionByEmailCodeRequest): Promise<void>;
}
```

### Structures used

#### Union types, Literal Types, Enums and Other Interfaces

<span id="IEthereumProviderSigner"></span>

```typescript
interface IEthereumProviderSigner {
  getAddress(): Promise<string>;
  signMessage(message: string): Promise<string>;
}
```

_In theory you will be using a provider that extends [this class](https://github.com/ethers-io/ethers.js/blob/5a56fc36d7bd78ed155308ec7bd0283ece2f6dbd/src.ts/providers/abstract-provider.ts#L434) from ethers. You will be able to get a signer that extends [this class](https://github.com/ethers-io/ethers.js/blob/5a56fc36d7bd78ed155308ec7bd0283ece2f6dbd/src.ts/providers/abstract-signer.ts#L60)._

#### <span id="GenerateSiweSignedMessageRequest"></span>GenerateSiweSignedMessageRequest

| Field Name     | Type                                                |
| -------------- | --------------------------------------------------- |
| providerSigner | [IEthereumProviderSigner](#IEthereumProviderSigner) |
| chainId        | string                                              |
| signingUrl     | string                                              |

#### <span id="SiweLoginRequest"></span>SiweLoginRequest

| Field Name     | Type                                                |
| -------------- | --------------------------------------------------- |
| providerSigner | [IEthereumProviderSigner](#IEthereumProviderSigner) |
| chainId        | string                                              |
| signingUrl     | string                                              |

#### <span id="CreateSiweMessageRequest"></span>CreateSiweMessageRequest

| Field Name    | Type   |
| ------------- | ------ |
| walletAddress | string |
| statement     | string |
| chainId       | number |
| signingUrl    | string |

#### <span id="AuthenticateWithSiweRequest"></span>AuthenticateWithSiweRequest

| Field Name  | Type   |
| ----------- | ------ |
| message\*   | string |
| signature\* | string |

\* to get a message and signature fields to use in a test case you can follow the following guide: <a href="https://docs.getunblock.com/docs/unblocker">https://docs.getunblock.com/docs/unblocker</a>

#### <span id="AuthenticateWithEmailRequest"></span>AuthenticateWithEmailRequest

| Field Name | Type   |
| ---------- | ------ |
| userUuid   | string |

#### <span id="SetUnblockSessionByEmailCodeRequest"></span>SetUnblockSessionByEmailCodeRequest

| Field Name | Type   |
| ---------- | ------ |
| emailCode  | string |

#### <span id="AuthenticateWithEmailResponse"></span>AuthenticateWithEmailResponse

| Field Name | Type   |
| ---------- | ------ |

\* An email is sent to the user's email with the OTP code

#### <span id="GenerateSiweSignedMessageResponse"></span>GenerateSiweSignedMessageResponse

| Field Name | Type   |
| ---------- | ------ |
| message    | string |
| signature  | string |

### Service Methods

#### authenticateWithSiwe

<div><pre>authenticateWithSiwe(params: <a href="#AuthenticateWithSiweRequest">AuthenticateWithSiweRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

This method allows you to authenticate a user using the SIWE system. This will set in the SDK the data needed to execute all of the methods related to the user.

##### Usage

###### Typescript

```typescript
import getunblockSDK from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
})();
```

###### JavaScript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
})();
```

#### <span id="authenticateWithEmail"></span>authenticateWithEmail

<div><pre>authenticateWithEmail(params: <a href="#AuthenticateWithEmailRequest">AuthenticateWithEmailRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

This method allows you to start the email login process. An email with a code will be sent to the user's email. After the user submits that code in your GUI you should call the <a href="#setUnblockSessionByEmailCode">setUnblockSessionByEmailCode</a> method to finalize the login process.

##### Usage

###### Typescript

```typescript
import getunblockSDK from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.auth.authenticateWithEmail({
    userUuid: '[user uuid value]',
  });
})();
```

###### JavaScript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.auth.authenticateWithEmail({
    userUuid: '[an user uuid value]',
  });
})();
```

#### <span id="setUnblockSessionByEmailCode"></span>setUnblockSessionByEmailCode

<div><pre>setUnblockSessionByEmailCode(params: <a href="#SetUnblockSessionByEmailCodeRequest">SetUnblockSessionByEmailCodeRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

After the user has submitted in your provided GUI the code generated by the <a href="#authenticateWithEmail">authenticateWithEmail</a> method, you should call this method to complete the Login by email process.

##### Usage

###### Typescript

```typescript
import getunblockSDK from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.auth.setUnblockSessionByEmailCode({
    emailCode: '[The code received in the email]',
  });
})();
```

###### JavaScript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.auth.setUnblockSessionByEmailCode({
    emailCode: '[The code received in the email]',
  });
})();
```

#### createSiweMessage

<div><pre>createSiweMessage(params: <a href="#CreateSiweMessageRequest">CreateSiweMessageRequest</a>): string</pre></div>

##### Overview

Will generate a message to be used in a Siwe authentication.

##### Usage

###### Typescript

```typescript
import getunblockSDK from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.auth.createSiweMessage(
    walletAddress: '0xbEFcCcFC70d97884f70b41927f6D20C511F4A36C',
    statement: 'Sign in with Ethereum',
    signingUrl: 'getunblock.com',
    chainId: 8001
  );
})();
```

###### JavaScript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.auth.createSiweMessage(
    walletAddress: '0xbEFcCcFC70d97884f70b41927f6D20C511F4A36C',
    statement: 'Sign in with Ethereum',
    signingUrl: 'getunblock.com',
    chainId: 8001
  );
})();
```

#### generateSiweSignedMessage

<div><pre>generateSiweSignedMessage(params: <a href="#GenerateSiweSignedMessageRequest">GenerateSiweSignedMessageRequest</a>): Promise&#60;<a href="#GenerateSiweSignedMessageResponse">GenerateSiweSignedMessageResponse</a>&#62;</pre></div>

##### Overview

Will generate a object with message and signature. It requires a provider signer to sign the message.

##### Usage

###### Typescript

```typescript
import getunblockSDK from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // Ideally it must be an ethereum provider signer implementation
  const yourOwnProviderSigner = YouOwnProviderSignerFactory.get();

  // SDK API call example
  const result = await sdk.auth.generateSiweSignedMessage({
    providerSigner: yourOwnProviderSigner,
    chainId: '8001',
    signingUrl: string,
  });
})();
```

###### JavaScript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // Ideally it must be an ethereum provider signer implementation
  const yourOwnProviderSigner = YouOwnProviderSignerFactory.get();

  // SDK API call example
  const result = await sdk.auth.generateSiweSignedMessage(
      providerSigner: yourOwnProviderSigner,
      chainId: '8001',
      signingUrl: string,
  );
})();
```

#### siweLogin

<div><pre>siweLogin(params: <a href="#SiweLoginRequest">SiweLoginRequest</a>): Promise&#60;<a href="#SiweLoginResponse">SiweLoginResponse</a>&#62;</pre></div>

##### Overview

When providing a provider signer this method will do the entire login process made in one run.

##### Usage

###### Typescript

```typescript
import getunblockSDK from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // Ideally it must be an ethereum provider signer implementation
  const yourOwnProviderSigner = YouOwnProviderSignerFactory.get();

  // SDK API call example
  const result = await sdk.auth.siweLogin({
    providerSigner: yourOwnProviderSigner,
    chainId: '8001',
    signingUrl: string,
  });
})();
```

###### JavaScript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
  });

  // Ideally it must be an ethereum provider signer implementation
  const yourOwnProviderSigner = YouOwnProviderSignerFactory.get();

  // SDK API call example
  const result = await sdk.auth.siweLogin(
      providerSigner: yourOwnProviderSigner,
      chainId: '8001',
      signingUrl: string,
  );
})();
```

<div class="CodeMirror-gutter-filler">

[Back to general services index](./index.md)
[Back to root index](../index.md)

</div>
