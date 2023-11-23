---
title: User KYC Service
excerpt: Reference page for the user kyc service interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IUserKycService {
  createKYCApplicant(params: CreateKYCApplicantRequest): Promise<CreateKYCApplicantResponse>;
  getKYCApplication(params: GetKYCApplicationRequest): Promise<GetKYCApplicationResponse>;
  getSumsubTokenForIDVCollection(): Promise<GetSumsubTokenForIDVCollectionResponse>;
  uploadKycDocument(params: UploadKycDocumentRequest): Promise<UploadKycDocumentResponse>;
  startKycVerification(): Promise<StartKycVerificationResponse>;
  patchKYCVerificationStatusSandbox(
    params: PatchKYCVerificationStatusSandboxRequest,
  ): Promise<PatchKYCVerificationStatusSandboxResponse>;
}
```

### Structures used

#### Union types, Literal types, Enums and Other Interfaces

<span id="AddressDetails"></span>AddressDetails

```typescript
type AddressDetails = {
  address_line_1: string;
  address_line_2: string;
  post_code: string;
  city: string;
  country: Country;
};
```

<span id="SourceOfFundsType"></span>

```typescript
type SourceOfFundsType = 'SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER';
```

<span id="DocumentType"></span>

```typescript
type DocumentType = 'SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD';
```

<span id="DocumentSubType"></span>

```typescript
type DocumentSubType = 'FRONT_SIDE' | 'BACK_SIDE';
```

<span id="KycStatuses"></span>

```typescript
type KycStatuses =
  | 'KYC_NEEDED'
  | 'PENDING_KYC_DATA'
  | 'KYC_PENDING'
  | 'SOFT_KYC_FAILED'
  | 'HARD_KYC_FAILED';
```

<span id="DocumentTypesResponse"></span>

```typescript
type KycStatuses = 'FRONT_SIDE' | 'BACK_SIDE';
```

<span id="UserStatusesPatchSandbox"></span>

```typescript
type UserStatusesPatchSandbox = 'FULL_USER' | 'SOFT_KYC_FAILED' | 'HARD_KYC_FAILED';
```

#### <span id="DocsMissing"></span>DocsMissing

| Field Name | Type                                |
| ---------- | ----------------------------------- |
| docType    | [DocumentType](#DocumentType)       |
| docSubtype | [DocumentSubType](#DocumentSubType) |

#### <span id="ApplicantData"></span>ApplicantData

| Field Name    | Type                                    |
| ------------- | --------------------------------------- |
| address       | [AddressDetails](#AddressDetails)       |
| dateOfBirth   | Date                                    |
| sourceOfFunds | [SourceOfFundsType](#SourceOfFundsType) |

#### <span id="CreateKYCApplicantRequest"></span>CreateKYCApplicantRequest

| Field Name    | Type                                    |
| ------------- | --------------------------------------- |
| address       | [AddressDetails](#AddressDetails)       |
| dateOfBirth   | Date                                    |
| sourceOfFunds | [SourceOfFundsType](#SourceOfFundsType) |

#### <span id="GetKYCApplicationResponse"></span>GetKYCApplicationResponse

| Field Name                | Type                          |
| ------------------------- | ----------------------------- |
| status                    | [KycStatuses](#KycStatuses)   |
| docs_missing              | [DocsMissing](#DocsMissing)[] |
| kyc_enduser_error_message | string                        |
| kyc_reject_label          | string[]                      |

#### <span id="GetSumsubTokenForIDVCollectionResponse"></span>GetSumsubTokenForIDVCollectionResponse

| Field Name | Type   |
| ---------- | ------ |
| token      | string |

#### <span id="UploadKycDocumentRequest"></span>UploadKycDocumentRequest

| Field Name       | Type                                |
| ---------------- | ----------------------------------- |
| content          | string                              |
| filename         | string                              |
| documentType     | [DocumentType](#DocumentType)       |
| documentSubType? | [DocumentSubType](#DocumentSubType) |
| country          | [Country](COMMON_TYPES.md#Country)  |

#### <span id="PatchKYCVerificationStatusSandboxRequest"></span>PatchKYCVerificationStatusSandboxRequest

| Field Name | Type                                                  |
| ---------- | ----------------------------------------------------- |
| status     | [UserStatusesPatchSandbox](#UserStatusesPatchSandbox) |

### Service Methods

#### createKYCApplicant

<div><pre>createKYCApplicant(params: <a href="#CreateKYCApplicantRequest">CreateKYCApplicantRequest</a>): Promise&#60;<a href="#CreateKYCApplicantResponse">CreateKYCApplicantResponse</a>&#62;</pre></div>

##### Overview

This method allows you to create a KYC Application for a user.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Country } from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.createKYCApplicant({
    address: {
      address_line_1: '[user address line 1]',
      address_line_2: '[user address line 2]',
      post_code: '[user postcode]',
      city: '[user city]',
      country: Country.UnitedKingdom,
    },
    dateOfBirth: new Date('[user birhday]'),
    sourceOfFunds: "['SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER']",
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;
const { AuthenticationMethod, Country } = require('@getunblock/sdk');

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  // SDK API call example
  const result = await sdk.kyc.createKYCApplicant({
    address: {
      address_line_1: '[user address line 1]',
      address_line_2: '[user address line 2]',
      post_code: '[user postcode]',
      city: '[user city]',
      country: Country.UnitedKingdom,
    },
    dateOfBirth: new Date('[user birhday]'),
    sourceOfFunds: "['SALARY' | 'BUSINESS_INCOME' | 'PENSION' | 'OTHER']",
  });
})();
```

#### GetSumsubTokenForIDVCollection

<div><pre>getSumsubTokenForIDVCollection(): Promise&#60;<a href="#GetSumsubTokenForIDVCollectionResponse">GetSumsubTokenForIDVCollectionResponse</a>&#62;</pre></div>

##### Overview

This method allows to get an access token which can be used with Sumsub's Web or Mobile SDK for easier integration

##### Usage

###### Typescript

```typescript
import getunblockSDK from '@getunblock/sdk';
import getunblockSDK, { AuthenticationMethod } from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.getSumsubTokenForIDVCollection();
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;
const { AuthenticationMethod } = require('@getunblock/sdk')(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.getSumsubTokenForIDVCollection();
})();
```

#### uploadKycDocument

<div><pre>uploadKycDocument(params: <a href="#UploadKycDocumentRequest">UploadKycDocumentRequest</a>): Promise&#60;<a href="#UploadKycDocumentResponse">UploadKycDocumentResponse</a>&#62;</pre></div>

##### Overview

This method allows to upload multiple KYC documents into Unblock. Please call required verification endpoint to obtain information on which documents are needed

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Country } from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.uploadKycDocument({
    content: '[base64 image data]',
    filename: '[filename].[file_extension]',
    documentType: "['SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' ]",
    documentSubType: "['FRONT_SIDE' | 'BACK_SIDE']",
    country: Country.UnitedKingdom,
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;
const { AuthenticationMethod, Country } = require('@getunblock/sdk');

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.uploadKycDocument({
    content: '[base64 image data]',
    filename: '[filename].[file_extension]',
    documentType: "['SELFIE' | 'PASSPORT' | 'DRIVERS' | 'ID_CARD' ]",
    documentSubType: "['FRONT_SIDE' | 'BACK_SIDE']",
    country: Country.UnitedKingdom,
  });
})();
```

#### startKycVerification

<div><pre>startKycVerification(): Promise&#60;<a href="#StartKycVerificationResponse">StartKycVerificationResponse</a>&#62;</pre></div>

##### Overview

This method starts the verification process for KYC. It should be called after the applicant has been created and all documents have been uploaded.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod } from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.startKycVerification();
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;
const { AuthenticationMethod } = require('@getunblock/sdk');

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.startKycVerification();
})();
```

#### getKYCApplication

<div><pre>getKYCApplication(): Promise&#60;<a href="#GetKYCApplicationResponse">GetKYCApplicationResponse</a>&#62;</pre></div>

##### Overview

This method returns which documents are needed to perform KYC for a particular user

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod } from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.getKYCApplication();
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;
const { AuthenticationMethod } = require('@getunblock/sdk');

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.getKYCApplication();
})();
```

#### patchKYCVerificationStatusSandbox

<div><pre>patchKYCVerificationStatusSandbox(params: <a href="#patchKYCVerificationStatusSandboxRequest">patchKYCVerificationStatusSandboxRequest</a>): Promise&#60;<a href="#patchKYCVerificationStatusSandboxResponse">patchKYCVerificationStatusSandboxResponse</a>&#62;</pre></div>

##### Overview

This method allows you to create a KYC Application for a user.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { AuthenticationMethod, Country } from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  const result = await sdk.kyc.patchKYCVerificationStatusSandbox({
    status: "['FULL_USER' | 'SOFT_KYC_FAILED' | 'HARD_KYC_FAILED']",
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;
const { AuthenticationMethod, Country } = require('@getunblock/sdk');

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  await sdk.auth.authenticateWithSiwe({
    message: '[Generated SIWE message]*',
    signature: '[Generated SIWE signature]*',
  });
  // * more info at https://docs.getunblock.com/docs/unblocker

  // SDK API call example
  const result = await sdk.kyc.patchKYCVerificationStatusSandbox({
    sourceOfFunds: "['FULL_USER' | 'SOFT_KYC_FAILED' | 'HARD_KYC_FAILED']",
  });
})();
```

<div class="CodeMirror-gutter-filler">

[Back to user services index](./index.md)
[Back to root index](../index.md)

</div>
