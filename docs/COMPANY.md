---
title: Company Service
excerpt: Reference page for the Company Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface ICompanyService {
  createCompany(params: CreateCompanyRequest): Promise<CreateCompanyResponse>;
  updateCompany(params: UpdateCompanyRequest): Promise<UpdateCompanyResponse>;
  addUserToCompany(params: AddUserToCompanyRequest): Promise<AddUserToCompanyResponse>;
  removeUserFromCompany(params: RemoveUserFromCompanyRequest): Promise<RemoveUserFromCompanyResponse>;
}
```

### Structures used

#### <span id="CreateCompanyRequest"></span>CreateCompanyRequest

| Field Name | Type |
| ---------- | ---- |
| name | string |
| type | [CompanyType](COMMON_TYPES.md#CompanyType) |
| registeredAddress? | string |
| city | string |
| country | [Country](COMMON_TYPES.md#Country) |
| registrationNumber | string |
| contactName | string |
| phone | string |
| email | string |
| targetAddress | string |
| companyUuid | string |
| industrySectorType? | string |
| industrySectorValue? | string |

#### <span id="UpdateCompanyRequest"></span>UpdateCompanyRequest

| Field Name | Type |
| ---------- | ---- |
| name | string |
| type | [CompanyType](COMMON_TYPES.md#CompanyType) |
| registeredAddress? | string |
| city | string |
| country | [Country](COMMON_TYPES.md#Country) |
| registrationNumber | string |
| contactName | string |
| phone | string |
| email | string |
| companyUuid | string |
| industrySectorType? | string |
| industrySectorValue? | string |

#### <span id="AddUserToCompanyRequest"></span>AddUserToCompanyRequest

| Field Name | Type |
| ---------- | ---- |
| companyUuid | string |
| userUuid | string |
| role | [UserCompanyRole](COMMON_TYPES.md#UserCompanyRole) |

#### <span id="RemoveUserFromCompanyRequest"></span>RemoveUserFromCompanyRequest

| Field Name | Type |
| ---------- | ---- |
| companyUuid | string |
| companyUserUuid | string |

#### <span id="CreateCompanyResponse"></span>CreateCompanyResponse

| Field Name | Type |
| ---------- | ---- |
| message | string |
| uuid | string |

#### <span id="UpdateCompanyResponse"></span>UpdateCompanyResponse

| Field Name | Type |
| ---------- | ---- |
| message | string |
| uuid | string |

#### <span id="AddUserToCompanyResponse"></span>AddUserToCompanyResponse

| Field Name | Type |
| ---------- | ---- |
| message | string |
| uuid | string |

#### <span id="RemoveUserFromCompanyResponse"></span>RemoveUserFromCompanyResponse

| Field Name | Type |
| ---------- | ---- |
| message | string |
| uuid | string |

### Service Methods

#### createCompany

<div><pre>createCompany(params: <a href="#CreateCompanyRequest">CreateCompanyRequest</a>): Promise&#60;<a href="#CreateCompanyResponse">CreateCompanyResponse</a>&#62;</pre></div>

##### Overview

This method allows to create a company, which can have authorised users take actions on its behalf.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Country } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.company.createCompany({
    name: "Unblock",
    type: CompanyType.LIMITED_LIABILITY,
    registeredAddress: "P.Sherman, 42 Wallaby Way, Sydney",
    city: "London",
    country: Country.UnitedKingdom,
    registrationNumber: 123,
    contactName: "Jane Doe",
    phone: "0118 999 881 999 119 725 3",
    email: "jane.doe@getunblock.com",
    targetAddress: "0xFaFe15f71861609464a4ACada29a92c5bC01637a",
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Country } = require("@getunblock/sdk");

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.company.createCompany({
    name: "Unblock",
    type: CompanyType.LIMITED_LIABILITY,
    registeredAddress: "P.Sherman, 42 Wallaby Way, Sydney",
    city: "London",
    country: Country.UnitedKingdom,
    registrationNumber: 123,
    contactName: "Jane Doe",
    phone: "0118 999 881 999 119 725 3",
    email: "jane.doe@getunblock.com",
    targetAddress: "0xFaFe15f71861609464a4ACada29a92c5bC01637a",
  });
})();
```

#### updateCompany

<div><pre>updateCompany(params: <a href="#UpdateCompanyRequest">UpdateCompanyRequest</a>): Promise&#60;<a href="#UpdateCompanyResponse">UpdateCompanyResponse</a>&#62;</pre></div>

##### Overview

This method allows to update associated company's data.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { CompanyType, Country } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.company.updateCompany({
    companyUuid: "6c0ace64-a187-4f46-bf53-069a4a178f00",
    name: "Unblock",
    type: CompanyType.LIMITED_LIABILITY,
    registeredAddress: "P.Sherman, 42 Wallaby Way, Sydney",
    city: "London",
    country: Country.UnitedKingdom,
    registrationNumber: 123,
    contactName: "Jane Doe",
    phone: "0118 999 881 999 119 725 3",
    email: "jane.doe@getunblock.com",
    targetAddress: "0xFaFe15f71861609464a4ACada29a92c5bC01637a",
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { CompanyType, Country } = require("@getunblock/sdk");

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.company.updateCompany({
    companyUuid: "6c0ace64-a187-4f46-bf53-069a4a178f00",
    name: "Unblock",
    type: CompanyType.LIMITED_LIABILITY,
    registeredAddress: "P.Sherman, 42 Wallaby Way, Sydney",
    city: "London",
    country: Country.UnitedKingdom,
    registrationNumber: 123,
    contactName: "Jane Doe",
    phone: "0118 999 881 999 119 725 3",
    email: "jane.doe@getunblock.com",
    targetAddress: "0xFaFe15f71861609464a4ACada29a92c5bC01637a",
  });
})();
```

#### addUserToCompany

<div><pre>addUserToCompany(params: <a href="#AddUserToCompanyRequest">AddUserToCompanyRequest</a>): Promise&#60;<a href="#AddUserToCompanyResponse">AddUserToCompanyResponse</a>&#62;</pre></div>

##### Overview

This method allows to add a user to the given company.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { UserCompanyRole } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.company.addUserToCompany({
    companyUuid: "6c0ace64-a187-4f46-bf53-069a4a178f00",
    userUuid: "5594401c-0072-4df2-be9c-d491c0754c21",
    role: UserCompanyRole.ADMINISTARTOR,
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { UserCompanyRole } = require("@getunblock/sdk");

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.company.addUserToCompany({
    companyUuid: "6c0ace64-a187-4f46-bf53-069a4a178f00",
    userUuid: "5594401c-0072-4df2-be9c-d491c0754c21",
    role: UserCompanyRole.ADMINISTARTOR,
  });
})();
```

#### removeUserFromCompany

<div><pre>removeUserFromCompany(params: <a href="#RemoveUserFromCompanyRequest">RemoveUserFromCompanyRequest</a>): Promise&#60;<a href="#RemoveUserFromCompanyResponse">RemoveUserFromCompanyResponse</a>&#62;</pre></div>

##### Overview

This method allows to remove a user from the given company.

##### Usage

###### Typescript

```typescript
import getunblockSDK from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.company.removeUserFromCompany({
    companyUuid: "6c0ace64-a187-4f46-bf53-069a4a178f00",
    companyUserUuid: "5594401c-0072-4df2-be9c-d491c0754c21",
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.company.removeUserFromCompany({
    companyUuid: "6c0ace64-a187-4f46-bf53-069a4a178f00",
    companyUserUuid: "5594401c-0072-4df2-be9c-d491c0754c21",
  });
})();
```

<div class="CodeMirror-gutter-filler">
<h3>Other Services Available</h3>

* [auth](AUTH.md)
* [exchangeRates](EXCHANGE_RATES.md)
* [kyc](KYC.md)
* [offramp](OFFRAMP.md)
* [process](PROCESS.md)
* [remoteBankAccount](REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](TOKEN_PREFERENCES.md)
* [transactionFee](TRANSACTION_FEE.md)
* [unblockBankAccount](UNBLOCK_BANK_ACCOUNT.md)
* [user](USER.md)

[Back to README](../README.md)
</div>
