---
title: User Fiat to Crypto Service
excerpt: Reference page for the user fiat to crypto service interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IUserFiatToCryptoService {
  createUnblockUserBankAccount(
    params: CreateUnblockUserBankAccountRequest,
  ): Promise<CreateUnblockUserBankAccountResponse>;

  getAllUnblockUserBankAccounts(): Promise<GetAllunblockUserBankAccountsResponse>;

  simulate(params: simulateRequest): Promise<void>;

  getUnblockBankAccountByUuid(
    params: GetUnblockBankAccountByUuidRequest,
  ): Promise<GetUnblockBankAccountByUuidResponse>;
}
```

### Structures used

#### Union types, Literal types, Enums and Other Interfaces

<span id="UnblockBankAccount"></span>UnblockBankAccount

```typescript
export type UnblockBankAccount = {
  uuid: string;
  currency: Currency;
  iban: string;
  bic: string;
  accountNumber: string;
  sortCode: string;
};
```

#### <span id="CreateUnblockUserBankAccountRequest"></span>CreateUnblockUserBankAccountRequest

| Field Name | Type                                    |
| ---------- | --------------------------------------- |
| currency   | [Currency](../common-types.md#currency) |

#### <span id="CreateUnblockUserBankAccountResponse"></span>CreateUnblockUserBankAccountResponse

**Object** [UnblockBankAccount](#UnblockBankAccount)

#### <span id="GetAllunblockUserBankAccountsResponse"></span>GetAllunblockUserBankAccountsResponse

**Array of Objects** [UnblockBankAccount](#UnblockBankAccount)

#### <span id="GetUnblockBankAccountByUuidRequest"></span>GetUnblockBankAccountByUuidRequest

| Field Name  | Type   |
| ----------- | ------ |
| accountUuid | string |

#### <span id="GetUnblockBankAccountByUuidResponse"></span>GetUnblockBankAccountByUuidResponse

**Object** [UnblockBankAccount](#UnblockBankAccount)

#### <span id="simulateRequest"></span>simulateRequest

| Field Name  | Type   |
| ----------- | ------ |
| accountUuid | string |
| value       | number |

### Service methods

#### createUnblockUserBankAccount

<div><pre>createUnblockUserBankAccount(params: <a href="#createunblockuserbankaccountrequest">CreateUnblockUserBankAccountRequest</a>): Promise&#60;<a href="#createunblockuserbankaccountresponse">CreateUnblockUserBankAccountResponse</a>&#62;</pre></div>

##### Overview

This method allows an user to create a new unblock bank account which the user can use to go from fiat to crypto

##### Usage

###### Typescript

```typescript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.user.fiatToCrypto.createUnblockUserBankAccount({
    currency: Currency.EURO,
  });
})();
```

###### Javascript

```javascript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.user.fiatToCrypto.createUnblockUserBankAccount({
    currency: Currency.EURO,
  });
})();
```

#### getAllUnblockUserBankAccounts

<div><pre>getAllUnblockUserBankAccounts(params: void): Promise&#60;<a href="#getallunblockuserbankaccountsresponse">GetAllUnblockUserBankAccountsResponse</a>&#62;</pre></div>

##### Overview

This method allows an user to obtain all the unblock bank accounts registered in its name

##### Usage

###### Typescript

```typescript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.user.fiatToCrypto.getAllUnblockUserBankAccounts();
})();
```

###### Javascript

```javascript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.user.fiatToCrypto.getAllUnblockUserBankAccounts();
})();
```

#### getUnblockBankAccountByUuid

<div><pre>getUnblockBankAccountByUuid(params: <a href="#getunblockbankaccountbyuuidrequest">GetUnblockBankAccountByUuidRequest</a>): Promise&#60;<a href="#getunblockbankaccountbyuuidresponse">GetUnblockBankAccountByUuidResponse</a>&#62;</pre></div>

##### Overview

This method allows an user to consult the details of a particular unblock bank account registered to its name, by providing the account's uuid

##### Usage

###### Typescript

```typescript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.user.fiatToCrypto.getUnblockBankAccountByUuid({
    accountUuid: 'The account uuid here',
  });
})();
```

###### Javascript

```javascript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.user.fiatToCrypto.getUnblockBankAccountByUuid({
    accountUuid: 'The account uuid here',
  });
})();
```

#### simulate

<div><pre>simulate(params: <a href="#simulaterequest">simulateRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

This method allows an user to simulate a fiat to crypto transaction.

**NOTE:** This method is only available in the sandbox. An error will be thrown if an attempt to simulate is made when using the production environment

##### Usage

###### Typescript

```typescript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.user.fiatToCrypto.simulate({
    accountUuid: 'The account uuid here',
    value: 100,
  });
})();
```

###### Javascript

```javascript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.user.fiatToCrypto.simulate({
    accountUuid: 'The account uuid here',
    value: 100,
  });
})();
```

<div class="CodeMirror-gutter-filler">

[Back to user services index](./index.md)
[Back to root index](../index.md)

</div>
