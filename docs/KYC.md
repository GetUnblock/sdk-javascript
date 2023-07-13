---
title: System Development Kit - Javascript - KYC Service
excerpt: Reference page for the KYC Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IKycService {
  createKYCApplicant(params: CreateKYCApplicantRequest): Promise<CreateKYCApplicantResponse>;
  getAccessTokenForUserApplicant(params: GetAccessTokenForUserApplicantRequest): Promise<GetAccessTokenForUserApplicantResponse>;
  uploadKycDocument(params: UploadKycDocumentRequest): Promise<UploadKycDocumentResponse>;
  getUploadedKycDocumentsForUser(params: GetUploadedKycDocumentsForUserRequest): Promise<GetUploadedKycDocumentsForUserResponse[]>;
  startKycVerification(params: StartKycVerificationRequest): Promise<StartKycVerificationResponse>;
  getRequiredKycInformation(params: GetRequiredKycInformationRequest): Promise<GetRequiredKycInformationResponse[]>;
}
```

### Structures used

#### Union types, Literal Types and Enums

<span id="SourceOfFundsType"></span>

```typescript
type SourceOfFundsType = 'SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER'
```

<span id="DocumentType"></span>

```typescript
type DocumentType = 'SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT'
```

<span id="DocumentSubType"></span>

```typescript
type DocumentSubType = 'FRONT_SIDE' | 'BACK_SIDE'
```

#### <span id="CreateKYCApplicantRequest"></span>CreateKYCApplicantRequest

| Field Name | Type |
| ---------- | ---- |
| unblockSessionId | string |
| userUuid | string |
| address | string |
| postcode | string |
| city | string |
| country | [Country](COMMON_TYPES.md#Country) |
| dateOfBirth | Date |
| sourceOfFunds | [SourceOfFundsType](#SourceOfFundsType) |
| sourceOfFundsDescription | string |

#### <span id="GetAccessTokenForUserApplicantRequest"></span>GetAccessTokenForUserApplicantRequest

| Field Name | Type |
| ---------- | ---- |
| userUuid | string |
| unblockSessionId | string |

#### <span id="UploadKycDocumentRequest"></span>UploadKycDocumentRequest

| Field Name | Type |
| ---------- | ---- |
| userUuid | string |
| unblockSessionId | string |
| content | string |
| filename | string |
| documentType | [DocumentType](#DocumentType) |
| documentSubType? | [DocumentSubType](#DocumentSubType) |
| country | [Country](COMMON_TYPES.md#Country) |

#### <span id="GetUploadedKycDocumentsForUserRequest"></span>GetUploadedKycDocumentsForUserRequest

| Field Name | Type |
| ---------- | ---- |
| userUuid | string |
| unblockSessionId | string |

#### <span id="StartKycVerificationRequest"></span>StartKycVerificationRequest

| Field Name | Type |
| ---------- | ---- |
| userUuid | string |
| unblockSessionId | string |

#### <span id="GetRequiredKycInformationRequest"></span>GetRequiredKycInformationRequest

| Field Name | Type |
| ---------- | ---- |
| userUuid | string |
| unblockSessionId | string |

#### <span id="CreateKYCApplicantResponse"></span>CreateKYCApplicantResponse

| Field Name | Type |
| ---------- | ---- |
| created | boolean |

#### <span id="GetAccessTokenForUserApplicantResponse"></span>GetAccessTokenForUserApplicantResponse

| Field Name | Type |
| ---------- | ---- |
| token | string |

#### <span id="UploadKycDocumentResponse"></span>UploadKycDocumentResponse

| Field Name | Type |
| ---------- | ---- |
| uploadUuid | string |

#### <span id="GetUploadedKycDocumentsForUserResponse"></span>GetUploadedKycDocumentsForUserResponse

| Field Name | Type |
| ---------- | ---- |
| uuid | string |
| documentType | [DocumentType](#DocumentType) |
| documentSubType? | [DocumentSubType](#DocumentSubType) |
| name | string |
| country | [Country](COMMON_TYPES.md#Country) |
| status | string |
| uploadErrors? | string |
| verificationErrors? | string |
| createdAt | string |
| updatedAt | string |
| checkUuid | string |

#### <span id="StartKycVerificationResponse"></span>StartKycVerificationResponse

| Field Name | Type |
| ---------- | ---- |
| started | boolean |

#### <span id="GetRequiredKycInformationResponse"></span>GetRequiredKycInformationResponse

| Field Name | Type |
| ---------- | ---- |
| documentClass | string |
| documentTypes | [DocumentType](#DocumentType)[] |

### Service Methods

#### createKYCApplicant

<div><pre>createKYCApplicant(params: <a href="#CreateKYCApplicantRequest">CreateKYCApplicantRequest</a>): Promise&#60;<a href="#CreateKYCApplicantResponse">CreateKYCApplicantResponse</a>&#62;</pre></div>

##### Overview

This method allows you to create a KYC Application for a user.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Country } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.createKYCApplicant({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    address: "[user address]",
    postcode: "[user postcode]",
    city: "[user city]",
    country: Country.UnitedStates,
    dateOfBirth: new Date("[user birhday]"),
    sourceOfFunds: "['SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER']",
    sourceOfFundsDescription: "[Funds Description]",
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod, Country } = require("@getunblock/sdk");

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
  const result = await sdk.kyc.createKYCApplicant({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    address: "[user address]",
    postcode: "[user postcode]",
    city: "[user city]",
    country: Country.UnitedStates,
    dateOfBirth: new Date("[user birhday]"),
    sourceOfFunds: "['SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER']",
    sourceOfFundsDescription: "[Funds Description]",
  });
})();
```

#### getAccessTokenForUserApplicant

<div><pre>getAccessTokenForUserApplicant(params: <a href="#GetAccessTokenForUserApplicantRequest">GetAccessTokenForUserApplicantRequest</a>): Promise&#60;<a href="#GetAccessTokenForUserApplicantResponse">GetAccessTokenForUserApplicantResponse</a>&#62;</pre></div>

##### Overview

This method allows to get an access token which can be used with Sumsub's Web or Mobile SDK for easier integration

##### Usage

###### Typescript

```typescript
import getunblockSDK from "@getunblock/sdk";
import getunblockSDK, { AuthenticationMethod } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getAccessTokenForUserApplicant({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod } = require("@getunblock/sdk")

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getAccessTokenForUserApplicant({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
  });
})();
```

#### uploadKycDocument

<div><pre>uploadKycDocument(params: <a href="#UploadKycDocumentRequest">UploadKycDocumentRequest</a>): Promise&#60;<a href="#UploadKycDocumentResponse">UploadKycDocumentResponse</a>&#62;</pre></div>

##### Overview

This method allows to upload multiple KYC documents into Unblock. Please call required verification endpoint to obtain information on which documents are needed

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Country } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.uploadKycDocument({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    content: "[base64 image data]",
    filename: "[filename].[file_extension]",
    documentType: "['SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT']",
    documentSubType?: "['FRONT_SIDE' | 'BACK_SIDE']",
    country: Country.Portugal,
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { AuthenticationMethod, Country } = require("@getunblock/sdk");

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.uploadKycDocument({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
    content: "[base64 image data]",
    filename: "[filename].[file_extension]",
    documentType: "['SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT']",
    documentSubType?: "['FRONT_SIDE' | 'BACK_SIDE']",
    country: Country.Portugal,
  });
})();
```

#### getUploadedKycDocumentsForUser

<div><pre>getUploadedKycDocumentsForUser(params: <a href="#GetUploadedKycDocumentsForUserRequest">GetUploadedKycDocumentsForUserRequest</a>): Promise&#60;<a href="#GetUploadedKycDocumentsForUserResponse">GetUploadedKycDocumentsForUserResponse</a>&#62;</pre></div>

##### Overview

This method returns a set of documents uploaded for particular user

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
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getUploadedKycDocumentsForUser({
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
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getUploadedKycDocumentsForUser({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
  });
})();
```

#### startKycVerification

<div><pre>startKycVerification(params: <a href="#StartKycVerificationRequest">StartKycVerificationRequest</a>): Promise&#60;<a href="#StartKycVerificationResponse">StartKycVerificationResponse</a>&#62;</pre></div>

##### Overview

This method starts the verification process for KYC. It should be called after the applicant has been created and all documents have been uploaded.

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
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.startKycVerification({
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
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.startKycVerification({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
  });
})();
```

#### getRequiredKycInformation

<div><pre>getRequiredKycInformation(params: <a href="#GetRequiredKycInformationRequest">GetRequiredKycInformationRequest</a>): Promise&#60;<a href="#GetRequiredKycInformationResponse">GetRequiredKycInformationResponse</a>&#62;</pre></div>

##### Overview

This method returns which documents are needed to perform KYC for a particular user

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
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getRequiredKycInformation({
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
  
  // SDK API call example
  const loginResult = await sdk.auth.login({
    authenticationMethod: AuthenticationMethod.SIWE,
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getRequiredKycInformation({
    unblockSessionId: loginResult.unblockSessionId,
    userUuid: loginResult.userUuid,
  });
})();
```

## Other Services Available

* [auth](AUTH.md)
* [company](COMPANY.md)
* [exchangeRates](EXCHANGE_RATES.md)
* [offramp](OFFRAMP.md)
* [process](PROCESS.md)
* [remoteBankAccount](REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](TOKEN_PREFERENCES.md)
* [transactionFee](TRANSACTION_FEE.md)
* [unblockBankAccount](UNBLOCK_BANK_ACCOUNT.md)
* [user](USER.md)

[Back to README](README.md)
