# GetUnblock SDK - USER Service

## Interface

```typescript
interface IUserService {
  createUser(params: CreateUserRequest): Promise<CreateUserResponse>;
  getUserStatus(params: GetUserStatusRequest): Promise<GetUserStatusResponse>;
  getUserRampTransactions(params: GetUserRampTransactionsRequest): Promise<GetUserRampTransactionsResponse>;
}
```

### Structures used

#### Union types, Literal Types and Enums

<span id="UserStatus"></span>

```typescript
enum UserStatus {
  CREATED = 'CREATED',
  KYC_NEEDED = 'KYC_NEEDED',
  PENDING_KYC_DATA = 'PENDING_KYC_DATA',
  KYC_PENDING = 'KYC_PENDING',
  SOFT_KYC_FAILED = 'SOFT_KYC_FAILED',
  HARD_KYC_FAILED = 'HARD_KYC_FAILED',
  FULL_USER = 'FULL_USER',
}
```

#### <span id="RampTransactionProcess"></span>RampTransactionProcess

| Field Name | Type |
| ---------- | ---- |
| uuid | string |
| status | [ProcessStatus](/docs/COMMON_TYPES.md#Processstatus) |
| amount | number |
| createdAt | string |
| updatedAt | string |

#### <span id="ProcessesData"></span>ProcessesData

| Field Name | Type |
| ---------- | ---- |
| onramp | [RampTransactionProcess](#RampTransactionProcess)[] |
| offramp | [RampTransactionProcess](#RampTransactionProcess)[] |

#### <span id="CreateUserRequest"></span>CreateUserRequest

| Field Name | Type |
| ---------- | ---- |
| firstName | string |
| lastName | string |
| email | string |
| targetAddress | string |
| country | [Country](/docs/COMMON_TYPES.md#Country) |

#### <span id="GetUserStatusRequest"></span>GetUserStatusRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |

#### <span id="GetUserRampTransactionsRequest"></span>GetUserRampTransactionsRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionID | string |
| userUuid | string |

#### <span id="CreateUserResponse"></span>CreateUserResponse

| Field Name | Type |
| ---------- | ---- |
| message | string |
| userUuid | string |
| status | [UserStatus](#UserStatus) |

#### <span id="GetUserStatusResponse"></span>GetUserStatusResponse

| Field Name | Type |
| ---------- | ---- |
| status | [UserStatus](#UserStatus) |

#### <span id="GetUserRampTransactionsResponse"></span>GetUserRampTransactionsResponse

| Field Name | Type |
| ---------- | ---- |
| message | string |
| processes | [ProcessesData](#ProcessesData) |

### Service Methods

#### createUser

<div><pre>createUser(params: <a href="#CreateUserRequest">CreateUserRequest</a>): Promise&#60;<a href="#CreateUserResponse">CreateUserResponse</a>&#62;</pre></div>

##### Overview

This method allows to create a user. This endpoint doesn't require SIWE authorization. Private key for the address provided by creation of the user is used to authorize in SIWE.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Country } from "@getunblock/sdk";

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
});

// SDK API call example
const result = await sdk.exchangeRates.createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@getunblock.com",
  targetAddress: "0xFaFe15f71861609464a4ACada29a92c5bC01637a",
  country: Country.UnitedKingdom,
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Country } = require("@getunblock/sdk");

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
});

// SDK API call example
const result = await sdk.exchangeRates.createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@getunblock.com",
  targetAddress: "0xFaFe15f71861609464a4ACada29a92c5bC01637a",
  country: Country.UnitedKingdom,
});
```

#### getUserStatus

<div><pre>getUserStatus(params: <a href="#GetUserStatusRequest">GetUserStatusRequest</a>): Promise&#60;<a href="#GetUserStatusResponse">GetUserStatusResponse</a>&#62;</pre></div>

##### Overview

This method returns current status of the user during creation.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Country } from "@getunblock/sdk";

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
const result = await sdk.exchangeRates.getUserStatus({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Country } = require("@getunblock/sdk");

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
const result = await sdk.exchangeRates.getUserStatus({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
});
```

#### getUserRampTransactions

<div><pre>getUserRampTransactions(params: <a href="#GetUserRampTransactionsRequest">GetUserRampTransactionsRequest</a>): Promise&#60;<a href="#GetUserRampTransactionsResponse">GetUserRampTransactionsResponse</a>&#62;</pre></div>

##### Overview

This method returns a list of all on/off ramp transactions for a given user.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Country } from "@getunblock/sdk";

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
const result = await sdk.exchangeRates.getUserRampTransactions({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
});
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Country } = require("@getunblock/sdk");

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
const result = await sdk.exchangeRates.getUserRampTransactions({
  unblockSessionId: loginResult.unblockSessionId,
  userUuid: loginResult.userUuid,
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
* [unblockBankAccount](/docs/UNBLOCK_BANK_ACCOUNT.md)

[Back to README](/README.md)
