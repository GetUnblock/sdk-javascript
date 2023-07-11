# GetUnblock SDK - REMOTE BANK ACCOUNT Service

## Interface

```typescript
interface IRemoteBankAccountService {
  createRemoteUserBankAccount(params: RemoteUserBankAccountRequest): Promise<RemoteUserBankAccountResponse>;
  getAllRemoteBankAccounts(params: UserSessionData): Promise<RemoteUserBankAccountResponse[]>;
  changeMainUserRemoteBankAccount(params: UserSessionData & { accountUuid: string }): Promise<void>;
  getRemoteBankAccountByUuid(params: UserSessionData & { accountUuid: string }): Promise<RemoteUserBankAccountResponse>;
}
```

### Structures used

#### <span id="GbpAccountDetails"></span>GbpAccountDetails

| Field Name | Type |
| ---------- | ---- |
| currency | [Currency](/docs/COMMON_TYPES.md#Currency) |
| accountNumber | string |
| sortCode | string |

#### <span id="EurAccountDetails"></span>EurAccountDetails

| Field Name | Type |
| ---------- | ---- |
| currency | string |
| iban | string |

#### <span id="RemoteUserBankAccountRequest"></span>RemoteUserBankAccountRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |
| processUuid | string |
| accountName | string |
| accountCountry | [Country](/docs/COMMON_TYPES.md#Country) |
| beneficiaryCountry | [Country](/docs/COMMON_TYPES.md#Country) |
| mainBeneficiary | boolean |
| accountDetails | [GbpAccountDetails](#GbpAccountDetails) \| [EurAccountDetails](#EurAccountDetails) |

#### <span id="UserSessionData"></span>UserSessionData

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |

#### <span id="RemoteUserBankAccountResponse"></span>RemoteUserBankAccountResponse

| Field Name | Type |
| ---------- | ---- |
| firstName | string |
| lastName | string |
| currency | [Currency](/docs/COMMON_TYPES.md#Currency) |
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

<div><pre>createRemoteUserBankAccount(params: <a href="#RemoteUserBankAccountRequest">RemoteUserBankAccountRequest</a>): Promise&#60;<a href="#RemoteUserBankAccountResponse">RemoteUserBankAccountResponse</a>&#62;</pre></div>

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

<div><pre>getAllRemoteBankAccounts(params: <a href="#UserSessionData">UserSessionData</a>): Promise&#60;<a href="#RemoteUserBankAccountResponse">RemoteUserBankAccountResponse</a>&#62;</pre></div>

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

<div><pre>changeMainUserRemoteBankAccount(params: <a href="#UserSessionData">UserSessionData</a> & { accountUuid: string }): Promise&#60;void&#62;</pre></div>

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

<div><pre>getRemoteBankAccountByUuid(params: <a href="#UserSessionData">UserSessionData</a> & { accountUuid: string }): Promise&#60;<a href="#RemoteUserBankAccountResponse">RemoteUserBankAccountResponse</a>&#62;</pre></div>

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

* [auth](/docs/AUTH.md)
* [company](/docs/COMPANY.md)
* [exchangeRates](/docs/EXCHANGE_RATES.md)
* [kyc](/docs/KYC.md)
* [offramp](/docs/OFFRAMP.md)
* [process](/docs/PROCESS.md)
* [tokenPreferences](/docs/TOKEN_PREFERENCES.md)
* [transactionFee](/docs/TRANSACTION_FEE.md)
* [unblockBankAccount](/docs/UNBLOCK_BANK_ACCOUNT.md)
* [user](/docs/USER.md)

[Back to README](/README.md)
