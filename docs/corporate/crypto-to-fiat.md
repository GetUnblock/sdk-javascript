---
title: Corporate Crypto to Fiat Service
excerpt: Reference page for the corporate crypto to fiat service interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface ICorporateCryptoToFiatService {
  getCorporateUnblockWallet(
    params: GetCorporateUnblockWalletRequest,
  ): Promise<GetCorporateUnblockWalletResponse>;
  createCorporateRemoteBankAccount(
    params: CreateCorporateRemoteBankAccountRequest,
  ): Promise<CreateCorporateRemoteBankAccountResponse>;
  getCorporateRemoteBankAccounts(
    params: GetCorporateRemoteBankAccountsRequest,
  ): Promise<GetCorporateRemoteBankAccountsResponse>;
  updateCorporateMainRemoteBankAccount(
    params: UpdateCorporateMainRemoteBankAccountRequest,
  ): Promise<void>;
  getCorporateRemoteBankAccountDetails(
    params: GetCorporateRemoteBankAccountDetailsRequest,
  ): Promise<GetCorporateRemoteBankAccountDetailsResponse>;
}
```

### Structures used

#### Union types, Literal types, Enums and Other Interfaces

<span id="AccountDetails"></span>

```typescript
type EURAccountDetails = {
  iban: string;
};

type GBPAccountDetails = {
  accountNumber: string;
  sortCode: string;
};

type AccountDetails =
  | ({ currency: Currency.EURO } & EURAccountDetails)
  | ({ currency: Currency.GBP } & GBPAccountDetails);
```

<span id="RemoteBankAccount"></span>

```typescript
type RemoteBankAccount = {
  uuid: string;
  iban: string;
  bic: string;
  accountNumber: string;
  sortCode: string;
  mainBeneficiary: boolean;
  currency: Currency;
};
```

#### <span id ="GetCorporateUnblockWalletRequest"></span>GetCorporateUnblockWalletRequest

| Field Name    | Type                              |
| ------------- | --------------------------------- |
| corporateUuid | string                            |
| chain         | [Chain](../common-types.md#chain) |

#### <span id ="GetCorporateUnblockWalletResponse"></span>GetCorporateUnblockWalletResponse

| Field Name | Type                              |
| ---------- | --------------------------------- |
| chain      | [Chain](../common-types.md#chain) |
| address    | string                            |

#### <span id ="CreateCorporateRemoteBankAccountRequest"></span>CreateCorporateRemoteBankAccountRequest

| Field Name            | Type                              |
| --------------------- | --------------------------------- |
| corporateUuid         | string                            |
| accountName           | string                            |
| mainRemoteBankAccount | boolean                           |
| accountDetails        | [AccountDetails](#AccountDetails) |

#### <span id ="CreateCorporateRemoteBankAccountResponse"></span>CreateCorporateRemoteBankAccountResponse

| Field Name | Type   |
| ---------- | ------ |
| uuid       | string |

#### <span id ="GetCorporateRemoteBankAccountsRequest"></span>GetCorporateRemoteBankAccountsRequest

| Field Name    | Type   |
| ------------- | ------ |
| corporateUuid | string |

#### <span id ="GetCorporateRemoteBankAccountsResponse"></span>GetCorporateRemoteBankAccountsResponse

**Array of Objects** [Remote Bank Account](#RemoteBankAccount)

#### <span id ="GetCorporateRemoteBankAccountDetailsRequest"></span>GetCorporateRemoteBankAccountDetailsRequest

| Field Name            | Type   |
| --------------------- | ------ |
| corporateUuid         | string |
| remoteBankAccountUuid | string |

#### <span id ="GetCorporateRemoteBankAccountDetailsResponse"></span>GetCorporateRemoteBankAccountDetailsResponse

**Object** [Remote Bank Account](#RemoteBankAccount)

#### <span id ="UpdateCorporateMainRemoteBankAccountRequest"></span>UpdateCorporateMainRemoteBankAccountRequest

| Field Name            | Type   |
| --------------------- | ------ |
| corporateUuid         | string |
| remoteBankAccountUuid | string |

### Service Methods

#### getCorporateUnblockWallet

<div><pre>getCorporateUnblockWallet(params: <a href="#getcorporateunblockwalletrequest">GetCorporateUnblockWalletRequest</a>): Promise&#60;<a href="#getcorporateunblockwalletresponse">GetCorporateUnblockWalletResponse</a>&#62;</pre></div>

##### Overview

This method allows an user that is authorized to act on behalf of a corporate entity to consult details on the wallet

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
  const result = await sdk.corporate.cryptoToFiat.getCorporateUnblockWallet({
    corporateUuid: 'The uuid of the corporate',
    chain: 'The chain for which you wish to obtain the wallet address',
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
  const result = await sdk.corporate.cryptoToFiat.getCorporateUnblockWallet({
    corporateUuid: 'The uuid of the corporate',
    chain: 'The chain for which you wish to obtain the wallet address',
  });
})();
```

#### createCorporateRemoteBankAccount

<div><pre>createCorporateRemoteBankAccount(params: <a href="#createcorporateremotebankaccountrequest">CreateCorporateRemoteBankAccountRequest</a>): Promise&#60;<a href="#createcorporateremotebankaccountresponse">CreateCorporateRemoteBankAccountResponse</a>&#62;</pre></div>

##### Overview

This method allows an user that is authorized to act on behalf of a corporate entity to create a remote bank account in the Unblock system

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
  const result = await sdk.corporate.cryptoToFiat.createCorporateRemoteBankAccount({
    corporateUuid: 'The corporate uuid here',
    accountName: 'Bank account 1',
    mainBeneficiary: true,
    accountDetails: {
      currency: 'EUR',
      iban: 'The iban here',
    },
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
  const result = await sdk.corporate.cryptoToFiat.createCorporateRemoteBankAccount({
    corporateUuid: 'The corporate uuid here',
    accountName: 'Bank account 1',
    mainBeneficiary: true,
    accountDetails: {
      currency: 'EUR',
      iban: 'The iban here',
    },
  });
})();
```

#### getCorporateRemoteBankAccounts

<div><pre>getCorporateRemoteBankAccounts(params: <a href="#getcorporateremotebankaccountsrequest">GetCorporateRemoteBankAccountsRequest</a>): Promise&#60;<a href="#getcorporateremotebankaccountsresponse">GetCorporateRemoteBankAccountResponse</a>&#62;</pre></div>

##### Overview

This method allows an user authorized to act on behalf of a corporate entity to get all the remote bank accounts registered for that entity

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
  const result = await sdk.corporate.cryptoToFiat.getCorporateRemoteBankAccounts({
    corporateUuid: 'The corporate uuid here',
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
  const result = await sdk.corporate.cryptoToFiat.getCorporateRemoteBankAccounts({
    corporateUuid: 'The corporate uuid here',
  });
})();
```

#### getCorporateRemoteBankAccountDetails

<div><pre>getCorporateRemoteBankAccountDetails(params: <a href="#getcorporateremotebankaccountdetailsrequest">GetCorporateRemoteBankAccountDetailsRequest</a>): Promise&#60;<a href="#getcorporateremotebankaccountdetailsresponse">GetCorporateRemoteBankAccountDetailsResponse</a>&#62;</pre></div>

##### Overview

This method allows an user authorized to act on behalf of a corporate entity to get details of a specific remote bank account

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
  const result = await sdk.corporate.cryptoToFiat.getCorporateRemoteBankAccountDetails({
    corporateUuid: 'The corporate uuid here',
    remoteBankAccountUuid: 'The remote bank account uuid here',
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
  const result = await sdk.corporate.cryptoToFiat.getCorporateRemoteBankAccountDetails({
    corporateUuid: 'The corporate uuid here',
    remoteBankAccountUuid: 'The remote bank account uuid here',
  });
})();
```

#### updateCorporateMainRemoteBankAccount

<div><pre>updateCorporateMainRemoteBankAccount(params: <a href="#updatecorporatemainremotebankaccountrequest">AuthenticateWithSiweRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

This method allows an user authorizer to act on behalf of a corporate entity to change the main remote bank account of the entity

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
  await sdk.corporate.cryptoToFiat.updateCorporateMainRemoteBankAccount({
    corporateUuid: 'The corporate uuid here',
    remoteBankAccountUuid: 'The remote bank account uuid here',
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
  await sdk.corporate.cryptoToFiat.updateCorporateMainRemoteBankAccount({
    corporateUuid: 'The corporate uuid here',
    remoteBankAccountUuid: 'The remote bank account uuid here',
  });
})();
```

<div class="CodeMirror-gutter-filler">

[Back to corporate services index](./index.md)
[Back to root index](../index.md)

</div>
