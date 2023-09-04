---
title: Corporate KYB Service
excerpt: Reference page for the corporate kyb service interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface ICorporateKYBService {
  getChecklistOfDocuments(
    params: getChecklistOfDocumentsRequest,
  ): Promise<getChecklistOfDocumentsResponse>;
}
```

### Structures used


#### <span id ="getChecklistOfDocumentsRequest"></span>getChecklistOfDocumentsRequest

| Field Name    | Type                              |
| ------------- | --------------------------------- |
| corporateUuid | string                            |

### Service Methods

#### getChecklistOfDocuments

<div><pre>getChecklistOfDocumentsRequest(params: <a href="#getchecklistofdocumentsrequest">GetChecklistOfDocumentsRequest</a>): Promise&#60;<a href="#getchecklistofdocumentsresponse">getChecklistOfDocumentsResponse</a>&#62;</pre></div>

##### Overview

This method allows an user that is authorized to act on behalf of a corporate entity to get the details of KYB documents required

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
  const result = await sdk.corporate.kyb.getChecklistOfDocuments({
    corporateUuid: 'The uuid of the corporate'
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
  const result = await sdk.corporate.cryptoToFiat.getChecklistOfDocuments({
    corporateUuid: 'The uuid of the corporate',
  });
})();
```

<div class="CodeMirror-gutter-filler">

[Back to corporate services index](./index.md)
[Back to root index](../index.md)

</div>
