---
title: System Development Kit - Javascript - REMOTE BANK ACCOUNT Service
excerpt: Reference page for the Remote Bank Account Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IRemoteBankAccountService {
  createRemoteUserBankAccount(params: CreateRemoteUserBankAccountRequest): Promise<CreateRemoteUserBankAccountRequest>;
  getAllRemoteBankAccounts(params: GetAllRemoteBankAccountsRequest): Promise<GetAllRemoteBankAccountsResponse[]>;
  changeMainUserRemoteBankAccount(params: ChangeMainUserRemoteBankAccountRequest): Promise<void>;
  getRemoteBankAccountByUuid(params: GetRemoteBankAccountByUuidRequest): Promise<GetRemoteBankAccountByUuidResponse>;
}
```

### Structures used

#### <span id="GbpAccountDetails"></span>GbpAccountDetails

| Field Name | Type |
| ---------- | ---- |
| currency | [Currency](COMMON_TYPES.md#Currency) |
| accountNumber | string |
| sortCode | string |

#### <span id="EurAccountDetails"></span>EurAccountDetails

| Field Name | Type |
| ---------- | ---- |
| currency | string |
| iban | string |

#### <span id="CreateRemoteUserBankAccountRequest"></span>CreateRemoteUserBankAccountRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |
| processUuid | string |
| accountName | string |
| accountCountry | [Country](COMMON_TYPES.md#Country) |
| beneficiaryCountry | [Country](COMMON_TYPES.md#Country) |
| mainBeneficiary | boolean |
| accountDetails | [GbpAccountDetails](#GbpAccountDetails) \| [EurAccountDetails](#EurAccountDetails) |

#### <span id="UserSessionData"></span>UserSessionData

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |

#### <span id="CreateRemoteUserBankAccountResponse"></span>CreateRemoteUserBankAccountResponse

| Field Name | Type |
| ---------- | ---- |
| firstName | string |
| lastName | string |
| currency | [Currency](COMMON_TYPES.md#Currency) |
| mainBeneficiary | boolean |
| iban | string |
| bic | string |
| accountNumber | string |
| createdAt | string |
| updatedAt | string |
| accountName | string |
| bankName | string |
| uuid | string |
| sortCode | string |

#### <span id="GetAllRemoteBankAccountsRequest"></span>GetAllRemoteBankAccountsRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |

#### <span id="GetAllRemoteBankAccountsResponse"></span>GetAllRemoteBankAccountsResponse

| Field Name | Type |
| ---------- | ---- |
| firstName | string |
| lastName | string |
| currency | [Currency](COMMON_TYPES.md#Currency) |
| mainBeneficiary | boolean |
| iban | string |
| bic | string |
| accountNumber | string |
| createdAt | string |
| updatedAt | string |
| accountName | string |
| bankName | string |
| uuid | string |
| sortCode | string |

#### <span id="ChangeMainUserRemoteBankAccountRequest"></span>ChangeMainUserRemoteBankAccountRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |
| accountUuid | string |

#### <span id="GetRemoteBankAccountByUuidRequest"></span>GetRemoteBankAccountByUuidRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |
| accountUuid | string |

#### <span id="GetRemoteBankAccountByUuidResponse"></span>GetRemoteBankAccountByUuidResponse

| Field Name | Type |
| ---------- | ---- |
| firstName | string |
| lastName | string |
| currency | [Currency](COMMON_TYPES.md#Currency) |
| mainBeneficiary | boolean |
| iban | string |
| bic | string |
| accountNumber | string |
| createdAt | string |
| updatedAt | string |
| accountName | string |
| bankName | string |
| uuid | string |
| sortCode | string |

### Service Methods

#### createRemoteUserBankAccount

<div><pre>createRemoteUserBankAccount(params: <a href="#CreateRemoteUserBankAccountRequest">CreateRemoteUserBankAccountRequest</a>): Promise&#60;<a href="#CreateRemoteUserBankAccountResponse">CreateRemoteUserBankAccountResponse</a>&#62;</pre></div>

##### Overview

This method creates an offramp bank account details for an end user. Creating the account with main_beneficiary as true will make it the default account where all offramps take place

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Country, Currency } from "@getunblock/sdk";

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
  const result = await sdk.remoteBankAccount.createRemoteUserBankAccount({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    accountName: "[User account name]",
    accountCountry: Country.UnitedKingdom,
    beneficiaryCountry: Country.UnitedKingdom,
    mainBeneficiary: false,
    accountDetails: {
      currency: Currency.GBP,
      accountNumber: 31926819,
      sortCode: 123456
    },
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod, Country, Currency } = require("@getunblock/sdk"); 

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
  const result = await sdk.remoteBankAccount.createRemoteUserBankAccount({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    accountName: "[User account name]",
    accountCountry: Country.UnitedKingdom,
    beneficiaryCountry: Country.UnitedKingdom,
    mainBeneficiary: false,
    accountDetails: {
      currency: Currency.GBP,
      accountNumber: 31926819,
      sortCode: 123456
    },
  });
})();
```

#### getAllRemoteBankAccounts

<div><pre>getAllRemoteBankAccounts(params: <a href="#GetAllRemoteBankAccountsRequest">GetAllRemoteBankAccountsRequest</a>): Promise&#60;<a href="#GetAllRemoteBankAccountsResponse">GetAllRemoteBankAccountsResponse</a>[]&#62;</pre></div>

##### Overview

This method gets all the remote bank accounts linked to a user for the offramp process

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
  
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.remoteBankAccount.getAllRemoteBankAccounts({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
  });
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
  
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.remoteBankAccount.getAllRemoteBankAccounts({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
  });
})();
```

#### changeMainUserRemoteBankAccount

<div><pre>changeMainUserRemoteBankAccount(params: <a href="#ChangeMainUserRemoteBankAccountRequest">ChangeMainUserRemoteBankAccountRequest): Promise&#60;void&#62;</pre></div>

##### Overview

This method allows to change the main user remote bank account to which all off ramps by default take place. This account can be selected based on existing ones

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
  
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.remoteBankAccount.changeMainUserRemoteBankAccount({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    accountUuid: "b89b8075-e845-48a6-9b70-123c12e0aed0",
  });
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
  
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.remoteBankAccount.changeMainUserRemoteBankAccount({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    accountUuid: "b89b8075-e845-48a6-9b70-123c12e0aed0",
  });
})();
```

#### getRemoteBankAccountByUuid

<div><pre>getRemoteBankAccountByUuid(params: <a href="#GetRemoteBankAccountByUuidRequest">GetRemoteBankAccountByUuidRequest): Promise&#60;<a href="#GetRemoteBankAccountByUuidResponse">GetRemoteBankAccountByUuidResponse</a>&#62;</pre></div>

##### Overview

This method gets a specific remote bank account by UUID

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
  
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.remoteBankAccount.getRemoteBankAccountByUuid({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    accountUuid: "b89b8075-e845-48a6-9b70-123c12e0aed0",
  });
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
  
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.remoteBankAccount.getRemoteBankAccountByUuid({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    accountUuid: "b89b8075-e845-48a6-9b70-123c12e0aed0",
  });
})();
```

## Other Services Available

* [auth](AUTH.md)
* [company](COMPANY.md)
* [exchangeRates](EXCHANGE_RATES.md)
* [kyc](KYC.md)
* [offramp](OFFRAMP.md)
* [process](PROCESS.md)
* [tokenPreferences](TOKEN_PREFERENCES.md)
* [transactionFee](TRANSACTION_FEE.md)
* [unblockBankAccount](UNBLOCK_BANK_ACCOUNT.md)
* [user](USER.md)

[Back to README](../README.md)
