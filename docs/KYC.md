---
title: Kyc Service
excerpt: Reference page for the Kyc Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IKycService {
  createKYCApplicant(params: CreateKYCApplicantRequest): Promise<CreateKYCApplicantResponse>;
  getAccessTokenForUserApplicant(): Promise<GetAccessTokenForUserApplicantResponse>;
  uploadKycDocument(params: UploadKycDocumentRequest): Promise<UploadKycDocumentResponse>;
  getUploadedKycDocumentsForUser(): Promise<GetUploadedKycDocumentsForUserResponse[]>;
  startKycVerification(): Promise<StartKycVerificationResponse>;
  getRequiredKycInformation(): Promise<GetRequiredKycInformationResponse[]>;
  onboarding(dto: OnboardingRequest): Promise<OnboardingResponse>;
  initSumsubSdk(dto: InitSumsubSdkRequest): Promise<InitSumsubSdkResponse>;
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

#### <span id="ApplicantData"></span>ApplicantData

| Field Name | Type |
| ---------- | ---- |
| address | string |
| postcode | string |
| city | string |
| country | [Country](COMMON_TYPES.md#Country) |
| dateOfBirth | Date |
| sourceOfFunds | [SourceOfFundsType](#SourceOfFundsType) |
| sourceOfFundsDescription | string |

#### <span id="UploadDocumentData"></span>UploadDocumentData

| Field Name | Type |
| ---------- | ---- |
| content | string |
| filename | string |
| documentType | [DocumentType](#DocumentType) |
| documentSubType? | [DocumentSubType](#DocumentSubType) |
| country | [Country](COMMON_TYPES.md#Country) |

#### <span id="CreateKYCApplicantRequest"></span>CreateKYCApplicantRequest

| Field Name | Type |
| ---------- | ---- |
| address | string |
| postcode | string |
| city | string |
| country | [Country](COMMON_TYPES.md#Country) |
| dateOfBirth | Date |
| sourceOfFunds | [SourceOfFundsType](#SourceOfFundsType) |
| sourceOfFundsDescription | string |

#### <span id="UploadKycDocumentRequest"></span>UploadKycDocumentRequest

| Field Name | Type |
| ---------- | ---- |
| content | string |
| filename | string |
| documentType | [DocumentType](#DocumentType) |
| documentSubType? | [DocumentSubType](#DocumentSubType) |
| country | [Country](COMMON_TYPES.md#Country) |

#### <span id="OnboardingRequest"></span>OnboardingRequest

| Field Name | Type |
| ---------- | ---- |
| applicantData | [ApplicantData](#ApplicantData) |
| documentData | [UploadDocumentData](#UploadDocumentData) |

#### <span id="InitSumsubSdkRequest"></span>InitSumsubSdkRequest

| Field Name | Type |
| ---------- | ---- |
| applicantData | [ApplicantData](#ApplicantData) |

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

#### <span id="OnboardingResponse"></span>OnboardingResponse

| Field Name | Type |
| ---------- | ---- |
| applicantCreated | boolean |
| uploadUuid | string |
| verificationStarted | boolean |

#### <span id="InitSumsubSdkResponse"></span>InitSumsubSdkResponse

| Field Name | Type |
| ---------- | ---- |
| applicantCreated | boolean |
| token | string |

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
  await sdk.auth.authenticateWithSiwe({
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.createKYCApplicant({
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
  
  await sdk.auth.authenticateWithSiwe({
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  // SDK API call example
  const result = await sdk.kyc.createKYCApplicant({
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

<div><pre>getAccessTokenForUserApplicant(): Promise&#60;<a href="#GetAccessTokenForUserApplicantResponse">GetAccessTokenForUserApplicantResponse</a>&#62;</pre></div>

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
  await sdk.auth.authenticateWithSiwe({
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getAccessTokenForUserApplicant();
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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getAccessTokenForUserApplicant();
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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.uploadKycDocument({
    content: "[base64 image data]",
    filename: "[filename].[file_extension]",
    documentType: "['SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT']",
    documentSubType: "['FRONT_SIDE' | 'BACK_SIDE']",
    country: Country.UnitedKingdom,
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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.uploadKycDocument({
    content: "[base64 image data]",
    filename: "[filename].[file_extension]",
    documentType: "['SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT']",
    documentSubType: "['FRONT_SIDE' | 'BACK_SIDE']",
    country: Country.UnitedKingdom,
  });
})();
```

#### getUploadedKycDocumentsForUser

<div><pre>getUploadedKycDocumentsForUser(): Promise&#60;<a href="#GetUploadedKycDocumentsForUserResponse">GetUploadedKycDocumentsForUserResponse</a>&#62;</pre></div>

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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getUploadedKycDocumentsForUser();
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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getUploadedKycDocumentsForUser();
})();
```

#### startKycVerification

<div><pre>startKycVerification(): Promise&#60;<a href="#StartKycVerificationResponse">StartKycVerificationResponse</a>&#62;</pre></div>

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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.startKycVerification();
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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.startKycVerification();
})();
```

#### getRequiredKycInformation

<div><pre>getRequiredKycInformation(): Promise&#60;<a href="#GetRequiredKycInformationResponse">GetRequiredKycInformationResponse</a>&#62;</pre></div>

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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getRequiredKycInformation();
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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.getRequiredKycInformation();
})();
```

#### onboarding

<div><pre>onboarding(params: <a href="#OnboardingRequest">OnboardingRequest</a>): Promise&#60;<a href="#OnboardingResponse">OnboardingResponse</a>&#62;</pre></div>

##### Overview

This is a KYC onboarding flow. It will create a new KYC applicant, upload documents and start kyc approval porcess in one call.

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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.onboarding({
    applicantData: {
      address: "[user address]",
      postcode: "[user postcode]",
      city: "[user city]",
      country: Country.UnitedStates,
      dateOfBirth: new Date("[user birhday]"),
      sourceOfFunds: "['SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER']",
      sourceOfFundsDescription: "[Funds Description]",
    },
    documentData: {
      content: "[base64 image data]",
      filename: "[filename].[file_extension]",
      documentType: "['SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT']",
      documentSubType?: "['FRONT_SIDE' | 'BACK_SIDE']",
      country: Country.Portugal,
    },
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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.onboarding({
    applicantData: {
      address: "[user address]",
      postcode: "[user postcode]",
      city: "[user city]",
      country: Country.UnitedStates,
      dateOfBirth: new Date("[user birhday]"),
      sourceOfFunds: "['SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER']",
      sourceOfFundsDescription: "[Funds Description]",
    },
    documentData: {
      content: "[base64 image data]",
      filename: "[filename].[file_extension]",
      documentType: "['SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' | 'RESIDENCE_PERMIT']",
      documentSubType?: "['FRONT_SIDE' | 'BACK_SIDE']",
      country: Country.Portugal,
    },
  });
})();
```

#### initSumsubSdk

<div><pre>initSumsubSdk(params: <a href="#InitSumsubSdkRequest">InitSumsubSdkRequest</a>): Promise&#60;<a href="#InitSumsubSdkResponse">InitSumsubSdkResponse</a>&#62;</pre></div>

##### Overview

This is a generate SumSub SDK token flow. It will create a new KYC applicant and get a Sumsub SDK token porcess in one call.

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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.initSumsubSdk({
    applicantData: {
      address: "[user address]",
      postcode: "[user postcode]",
      city: "[user city]",
      country: Country.UnitedStates,
      dateOfBirth: new Date("[user birhday]"),
      sourceOfFunds: "['SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER']",
      sourceOfFundsDescription: "[Funds Description]",
    },
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
  await sdk.auth.authenticateWithSiwe({    
    message: "[Generated SIWE message]*",
    signature: "[Generated SIWE signature]*",
  });
  // * more info at https://docs.getunblock.com/docs/unblocker
  
  const result = await sdk.kyc.initSumsubSdk({
    applicantData: {
      address: "[user address]",
      postcode: "[user postcode]",
      city: "[user city]",
      country: Country.UnitedStates,
      dateOfBirth: new Date("[user birhday]"),
      sourceOfFunds: "['SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER']",
      sourceOfFundsDescription: "[Funds Description]",
    },
  });
})();
```

<div class="CodeMirror-gutter-filler">
<h3>Other Services Available</h3>

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

[Back to README](../README.md)
</div>
