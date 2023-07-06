# GetUnblock SDK - AUTH Service

## Interface

```typescript
interface IAuthService {
  login(data: LoginRequest): Promise<LoginResponse>;
  emailSession(data: SessionRequest): Promise<SessionResponse>;
}
```

### Structures used

#### Union types, Literal Types and Enums

<span id="AuthenticationMethod"></span>

```typescript
enum AuthenticationMethod {
  SIWE = 'SIWE',
  EMAIL = 'EMAIL',
}
```

#### <span id="LoginRequest"></span>LoginRequest

* If authenticationMethod is ```AuthenticationMethod.SIWE```

| Field Name | Type |
| ---------- | ---- |
| authenticationMethod | [AuthenticationMethod](#AuthenticationMethod).SIWE |
| message* | string |
| signature* | string |

\* to get a message and signature fields to use in a test case you can follow the following guide: <a href="https://docs.getunblock.com/docs/unblocker">https://docs.getunblock.com/docs/unblocker</a>

* If authenticationMethod is ```AuthenticationMethod.EMAIL```

| Field Name | Type |
| ---------- | ---- |
| authenticationMethod | [AuthenticationMethod](#AuthenticationMethod).Email |
| userUuid     | string |

#### <span id="SessionRequest"></span>SessionRequest

| Field Name | Type |
| ---------- | ---- |
| userUuid | string |
| code | string |

#### <span id="LoginResponse"></span>LoginResponse

* If authenticationMethod is ```AuthenticationMethod.SIWE```

| Field Name | Type |
| ---------- | ---- |
| authenticationMethod | [AuthenticationMethod](#AuthenticationMethod).SIWE |
| userUuid | string |
| unblockSessionId | string |

* If authenticationMethod is ```AuthenticationMethod.EMAIL```

| Field Name | Type |
| ---------- | ---- |
| authenticationMethod | [AuthenticationMethod](#AuthenticationMethod).Email |
| message | string |
| userUuid | string |

#### <span id="SessionResponse"></span>SessionResponse

| Field Name | Type |
| ---------- | ---- |
| sessionId | string |

### Service Methods

#### login

<div><pre>login(params: <a href="#LoginRequest">LoginRequest</a>): Promise&#60;<a href="#LoginResponse">LoginResponse</a>&#62;</pre></div>

##### Overview

This method allows you to log in as a user using SIWE or our Email system. The SIWE system returns a Getunblock Session Id necessary for some of the functionalities provided by the SDK. The Email system will generate an email with a code that must be submitted using the emailSession method to get an unblock session id as well.

##### Usage

###### Typescript using ```AuthenticationMethod.SIWE```

```typescript
import getunblockSDK, { AuthenticationMethod } from "@getunblock/sdk";

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
});

// SDK API call example
const result = await sdk.auth.login({
  authenticationMethod: AuthenticationMethod.SIWE,
  message: "[Generated SIWE message]*",
  signature: "[Generated SIWE signature]*",
});
// * more info at https://docs.getunblock.com/docs/unblocker
```

###### JavaScript using ```AuthenticationMethod.SIWE```

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod } = require("@getunblock/sdk");

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
});

// SDK API call example
const result = await sdk.auth.login({
  authenticationMethod: AuthenticationMethod.SIWE,
  message: "[Generated SIWE message]*",
  signature: "[Generated SIWE signature]*",
});
// * more info at https://docs.getunblock.com/docs/unblocker
```

###### Typescript using ```AuthenticationMethod.EMAIL```

```typescript
import getunblockSDK, { AuthenticationMethod } from "@getunblock/sdk";

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
});

// SDK API call example
const result = await sdk.auth.login({
  authenticationMethod: AuthenticationMethod.EMAIL,
  userUuid: "[user uuid value]",
});
```

###### JavaScript using ```AuthenticationMethod.EMAIL```

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod } = require("@getunblock/sdk");

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
});

// SDK API call example
const result = await sdk.auth.login({
  authenticationMethod: AuthenticationMethod.EMAIL,
  userUuid: "[an user uuid value]",
});
```

#### emailSession

<div><pre>emailSession(params: <a href="#SessionRequest">SessionRequest</a>): Promise&#60;<a href="#SessionResponse">SessionResponse</a>&#62;</pre></div>

##### Overview

If the Email login system (```AuthenticationMethod.EMAIL```) is used you will need to get the Session Id using this method. You should use the received code in the received email.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod } from "@getunblock/sdk";

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
});

// SDK API call example
const result = await sdk.auth.emailSession({
  userUuid: "[an user uuid value]",
  code: "[The code received in the email]",
});
```

###### JavaScript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod } = require("@getunblock/sdk");

// setup SDK
const sdk = getunblockSDK({
  apiKey:
    "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
  prod: false, // If true, Production environment will be used otherwise Sandbox will be used instead
});

// SDK API call example
const result = await sdk.auth.emailSession({
  userUuid: "[an user uuid value]",
  code: "[The code received in the email]",
});
```

## Other Services Available

* [company](/docs/COMPANY.md)
* [exchangeRates](/docs/EXCHANGE_RATES.md)
* [kyc](/docs/KYC.md)
* [offramp](/docs/OFFRAMP.md)
* [process](/docs/PROCESS.md)
* [remoteBankAccount](/docs/REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](/docs/TOKEN_PREFERENCES.md)
* [transactionFee](/docs/TRANSACTION_FEE.md)
* [unblockBankAccount](/docs/UNBLOCK_BANK_ACCOUNT.md)
* [user](/docs/USER.md)

[Back to README](/README.md)
