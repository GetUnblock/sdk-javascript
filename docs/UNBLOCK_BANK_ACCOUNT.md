# GetUnblock SDK - UNBLOCK BANK ACCOUNT Service

## Interface

```typescript
interface IUnblockBankAccountService {
  createUnblockUserBankAccount(params: CreateUnblockUserBankAccountRequest): Promise<CreateUnblockUserBankAccountResponse>;
  getAllUnblockUserBankAccounts(params: GetAllunblockUserBankAccountsRequest): Promise<GetAllunblockUserBankAccountsResponse>;
  simulateOnRamp(params: SimulateOnRampRequest): Promise<SimulateOnRampResponse>;
  getUnblockBankAccountById(params: GetUnblockBankAccountByIdRequest): Promise<GetUnblockBankAccountByIdResponse>;
}
```

### Structures used

#### Union types, Literal Types and Enums

<span id="CreateUnblockUserBankAccountResponse"></span>

```typescript
type CreateUnblockUserBankAccountResponse = UserBankAccount;
```

<span id="GetAllunblockUserBankAccountsResponse"></span>

```typescript
type GetAllunblockUserBankAccountsResponse = UserBankAccount[];
```

<span id="GetUnblockBankAccountByIdResponse"></span>

```typescript
type GetUnblockBankAccountByIdResponse = UserBankAccount & UserBankAccountDetails;
```

#### <span id="CreateUnblockUserBankAccountRequest"></span>CreateUnblockUserBankAccountRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |
| currency | [Currency](/docs/COMMON_TYPES.md#Currency) |

#### <span id="GetAllunblockUserBankAccountsRequest"></span>GetAllunblockUserBankAccountsRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |

#### <span id="SimulateOnRampRequest"></span>SimulateOnRampRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |
| currency | [Currency](/docs/COMMON_TYPES.md#Currency) |
| value | number |

#### <span id="GetUnblockBankAccountByIdRequest"></span>GetUnblockBankAccountByIdRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |
| accountUuid | string |

#### <span id="UserBankAccount"></span>UserBankAccount

| Field Name | Type |
| ---------- | ---- |
| currency | [Currency](/docs/COMMON_TYPES.md#Currency) |
| createdAt | string |
| updatedAt | string |
| uuid | string |

#### <span id="UserBankAccountDetails"></span>UserBankAccountDetails

| Field Name | Type |
| ---------- | ---- |
| bic | string |
| accountNumber | string |
| iban | string |
| holderName | string |
| currentBalance | number |
| availableBalance | number |
| sortCode | string |

#### <span id="SimulateOnRampResponse"></span>SimulateOnRampResponse

| Field Name | Type |
| ---------- | ---- |
| message | string |

### Service Methods

#### createUnblockUserBankAccount

<div><pre>createUnblockUserBankAccount(params: <a href="#CreateUnblockUserBankAccountRequest">CreateUnblockUserBankAccountRequest</a>): Promise&#60;<a href="#CreateUnblockUserBankAccountResponse">CreateUnblockUserBankAccountResponse</a>&#62;</pre></div>

##### Overview

This method allows to creates a new bank account for a user in Unblock system for specific currency

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Currency } from "@getunblock/sdk";

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
const result = await sdk.unblockBankAccount.createUnblockUserBankAccount({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
  currency: Currency.GBP
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod, Currency } = require("@getunblock/sdk"); 

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
const result = await sdk.unblockBankAccount.createUnblockUserBankAccount({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
  currency: Currency.GBP
});
```

#### getAllUnblockUserBankAccounts

<div><pre>getAllUnblockUserBankAccounts(params: <a href="#GetAllunblockUserBankAccountsRequest">GetAllunblockUserBankAccountsRequest</a>): Promise&#60;<a href="#GetAllunblockUserBankAccountsResponse">GetAllunblockUserBankAccountsResponse</a>&#62;</pre></div>

##### Overview

This method returns a list of all user account by unblock

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod } from "@getunblock/sdk";

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
const result = await sdk.unblockBankAccount.getAllUnblockUserBankAccounts({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod } = require("@getunblock/sdk"); 

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
const result = await sdk.unblockBankAccount.getAllRemoteBankAccounts({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
});
```

#### simulateOnRamp

<div><pre>simulateOnRamp(params: <a href="#SimulateOnRampRequest">SimulateOnRampRequest</a>): Promise&#60;<a href="#SimulateOnRampResponse">SimulateOnRampResponse</a>&#62;</pre></div>

##### Overview

This method simulates an on-ramp operation - Sandbox environment only

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Currency } from "@getunblock/sdk";

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
const result = await sdk.unblockBankAccount.simulateOnRamp({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
  currency: Currency.GBP,
  value: 1
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod, Currency } = require("@getunblock/sdk"); 

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
const result = await sdk.unblockBankAccount.simulateOnRamp({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
  currency: Currency.GBP,
  value: 1
});
```

#### getUnblockBankAccountById

<div><pre>getUnblockBankAccountById(params: <a href="#GetUnblockBankAccountByIdRequest">GetUnblockBankAccountByIdRequest</a>): Promise&#60;<a href="#GetUnblockBankAccountByIdResponse">GetUnblockBankAccountByIdResponse</a>&#62;</pre></div>

##### Overview

This method returns details of user bank account by unblock based on id. For GBP accounts no IBAN is returned. For EUR accounts no Bank Account and Sort Code is returned.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod } from "@getunblock/sdk";

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
const result = await sdk.unblockBankAccount.getUnblockBankAccountById({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
  accountUuid: "b89b8075-e845-48a6-9b70-123c12e0aed0",
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod } = require("@getunblock/sdk"); 

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
const result = await sdk.unblockBankAccount.getUnblockBankAccountById({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
  accountUuid: "b89b8075-e845-48a6-9b70-123c12e0aed0",
});
```

## Other Services Available

* [auth](/docs/AUTH.md)
* [company](/docs/COMPANY.md)
* [exchangeRates](/docs/EXCHANGE_RATES.md)
* [kyc](/docs/KYC.md)
* [offramp](/docs/OFFRAMP.md)
* [process](/docs/PROCESS.md)
* [remoteBankAccount](/docs/REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](/docs/TOKEN_PREFERENCES.md)
* [transactionFee](/docs/TRANSACTION_FEE.md)
* [user](/docs/USER.md)

[Back to README](/README.md)
