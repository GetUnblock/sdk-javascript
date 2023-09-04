---
title: Corporate Fiat to Crypto Service
excerpt: Reference page for the corporate fiat to crypto service interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface ICorporateFiatToCryptoService {
  createCorporateUnblockBankAccount(
    params: CreateCorporateUnblockBankAccountRequest,
  ): Promise<CreateCorporateUnblockBankAccountResponse>;
  getCorporateUnblockBankAccounts(
    params: GetCorporateUnblockBankAccountsRequest,
  ): Promise<GetCorporateUnblockBankAccountsResponse>;
  getCorporateUnblockBankAccount(
    params: GetCorporateUnblockBankAccountRequest,
  ): Promise<GetCorporateUnblockBankAccountResponse>;
  simulateFiatToCrypto(params: SimulateFiatToCryptoRequest): Promise<void>;
}
```

### Structures used

#### Union types, Literal types, Enums and Other Interfaces

<span id="UnblockBankAccount"></span>

```typescript
type UnblockBankAccount = {
  uuid: string;
  currency: Currency;
  iban: string;
  bic: string;
  accountNumber: string;
  sortCode: string;
};
```

#### <span id="CreateCorporateUnblockBankAccountRequest"></span>CreateCorporateUnblockBankAccountRequest

| Field Name    | Type                                    |
| ------------- | --------------------------------------- |
| corporateUuid | string                                  |
| currency      | [Currency](../common-types.md#currency) |

#### <span id="CreateCorporateUnblockBankAccountResponse"></span>CreateCorporateUnblockBankAccountResponse

**Object** [UnblockBankAccount](#UnblockBankAccount)

#### <span id="GetCorporateUnblockBankAccountsRequest"></span>GetCorporateUnblockBankAccountsRequest

| Field Name    | Type   |
| ------------- | ------ |
| corporateUuid | string |

#### <span id="GetCorporateUnblockBankAccountsResponse"></span>GetCorporateUnblockBankAccountsResponse

**Array of Objects** [UnblockBankAccount](#UnblockBankAccount)

#### <span id="GetCorporateUnblockBankAccountRequest"></span>GetCorporateUnblockBankAccountRequest

| Field Name    | Type   |
| ------------- | ------ |
| corporateUuid | string |
| accountUuid   | string |

#### <span id="GetCorporateUnblockBankAccountResponse"></span>GetCorporateUnblockBankAccountResponse

**Object** [UnblockBankAccount](#UnblockBankAccount)

#### <span id="SimulateFiatToCryptoRequest"></span>SimulateFiatToCryptoRequest

| Field Name    | Type   |
| ------------- | ------ |
| corporateUuid | string |
| accountUuid   | string |
| value         | number |

### Service methods

#### createCorporateUnblockBankAccount

<div><pre>createCorporateUnblockBankAccount(params: <a href="#createcorporateunblockbankaccountrequest">CreateCorporateUnblockBankAccountRequest</a>): Promise&#60;<a href="#createcorporateunblockbankaccountresponse">CreateCorporateUnblockBankAccountRequest</a>&#62;</pre></div>

##### Overview

This method allows an user that is authorized to act on behalf of a corporate entity to create a bank account for the corporate in the unblock system

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
  const result = await sdk.corporate.fiatToCrypto.createCorporateUnblockBankAccount({
    corporateUuid: 'The uuid of the corporate',
    currency: 'EUR',
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
  const result = await sdk.corporate.fiatToCrypto.createCorporateUnblockBankAccount({
    corporateUuid: 'The uuid of the corporate',
    currency: 'EUR',
  });
})();
```

#### getCorporateUnblockBankAccounts

<div><pre>getCorporateUnblockBankAccounts(params: <a href="#getcorporateunblockbankaccountsrequest">GetCorporateUnblockBankAccountsRequest</a>): Promise&#60;<a href="#getcorporateunblockbankaccountsresponse">GetCorporateUnblockBankAccountsResponse</a>&#62;</pre></div>

##### Overview

This method allows an user authorized to act on behalf of a corporate entity to consult all the bank accounts registered for the corporate in the Unblock system

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
  const result = await sdk.corporate.fiatToCrypto.getCorporateUnblockBankAccounts({
    corporateUuid: 'The uuid of the corporate',
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
  const result = await sdk.corporate.fiatToCrypto.getCorporateUnblockBankAccounts({
    corporateUuid: 'The uuid of the corporate',
  });
})();
```

#### getCorporateUnblockBankAccount

<div><pre>getCorporateUnblockBankAccount(params: <a href="#getcorporateunblockbankaccountrequest">GetCorporateUnblockBankAccountRequest</a>): Promise&#60;<a href="#getcorporateunblockbankaccountresponse">GetCorporateUnblockBankAccountResponse</a>&#62;</pre></div>

##### Overview

This method allows an user that is authorized to act on behalf of the corporate entity to consult the details of a specific bank account registered in the unblock system

##### Usage

```typescript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.corporate.fiatToCrypto.getCorporateUnblockBankAccount({
    corporateUuid: 'The uuid of the corporate',
    accountUuid: 'The uuid of the account',
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
  const result = await sdk.corporate.fiatToCrypto.getCorporateUnblockBankAccount({
    corporateUuid: 'The uuid of the corporate',
    accountUuid: 'The uuid of the account',
  });
})();
```

#### simulateFiatToCrypto

<div><pre>simulateFiatToCrypto(params: <a href="#simulatefiattocryptorequest">SimulateFiatToCryptoRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

This method allows an user authorized to act on behalf of a corporate entity to simulate a fiat to crypto operation.

**NOTE**: Taking into account it is a simulation, this method will only work in the sandbox environment. An attempt to call it in the production environment will throw an error.

##### Usage

```typescript
import getUnblockSDK from '@getunblock/sdk';

(async () => {
  //Setup SDK
  const sdk = getUnblockSDK({
    apiKey: 'API-Key [Your api key here]', // This key will be generated and provided by Unblock
    prod: false, // If true, the sdk will contact the production environment, otherwise Sandbox
  });

  // Api call
  const result = await sdk.corporate.fiatToCrypto.simulateFiatToCrypto({
    corporateUuid: 'The uuid of the corporate',
    accountUuid: 'The uuid of the account',
    value: 100, // The amount of the account's currency used for simulation
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
  const result = await sdk.corporate.fiatToCrypto.simulateFiatToCrypto({
    corporateUuid: 'The uuid of the corporate',
    accountUuid: 'The uuid of the account',
    value: 100, // The amount of the account's currency used for simulation
  });
})();
```
