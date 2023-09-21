## Interface

```typescript
export interface ICorporateManagementService {
  createCorporate(params: CreateCorporateRequest): Promise<CreateCorporateResponse>;
  updateCorporate(params: UpdateCorporateRequest): Promise<void>;
  getCorporateDetails(params: GetCorporateDetailsRequest): Promise<GetCorporateDetailsResponse>;
  linkUserToCorporate(params: LinkUserToCorporateRequest): Promise<LinkUserToCorporateResponse>;
  unlinkUserFromCorporate(
    params: UnlinkUserFromCorporateRequest,
  ): Promise<UnlinkUserFromCorporateResponse>;
  getCorporateTransactions(
    params: GetCorporateTransactionsRequest,
  ): Promise<GetCorporateTransactionsResponse[]>;
  getCorporateTokenPreferences(
    params: GetCorporateTokenPreferencesRequest,
  ): Promise<GetCorporateTokenPreferencesResponse[]>;
  updateCorporateTokenPreferences(params: UpdateCorporateTokenPreferencesRequest): Promise<void>;
}
```

### Structures used

#### Union types, Literal types, Enums and Other Interfaces
```typescript
enum CorporateType {
  LIMITED_LIABILITY = 'LIMITED_LIABILITY',
  SOLE_TRADER = 'SOLE_TRADER',
  PARTNERSHIP = 'PARTNERSHIP',
  PUBLIC_LIMITED_COMPANY = 'PUBLIC_LIMITED_COMPANY',
  JOINT_STOCK_COMPANY = 'JOINT_STOCK_COMPANY',
  CHARITY = 'CHARITY',
  DECENTRALISED_AUTONOMOUS_ORGANISATION = 'DECENTRALISED_AUTONOMOUS_ORGANISATION',
}

enum CorporationStatus {
  CREATED = 'CREATED',
  KYB_NEEDED = 'KYB_NEEDED',
  PENDING_KYB_DATA = 'PENDING_KYB_DATA',
  KYB_PENDING = 'KYB_PENDING',
  SOFT_KYB_FAILED = 'SOFT_KYB_FAILED',
  HARD_KYB_FAILED = 'HARD_KYB_FAILED',
  FULL_CORPORATE = 'FULL_CORPORATE',
  SUSPENDED = 'SUSPENDED',
}

enum UserCorporateRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
}

enum NewProcessDirection {
  FiatToCrypto = 'fiatToCrypto',
  CryptoToFiat = 'cryptoToFiat',
}

type CorporationAddress = {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  country?: string;
  post_code?: string;
};
```

#### <span id="CreateCorporateRequest"></span>CreateCorporateRequest
```typescript
type CreateCorporateRequest = {
  legal_name: string;
  type: CorporateType;
  registration_number?: string;
  contact_details: {
    name: string;
    phone: string;
    email: string;
  };
  registered_address: CorporationAddress;
  trading_address?: CorporationAddress;
  target_crypto_address?: string;
};
```

#### <span id="CreateCorporateResponse"></span>CreateCorporateResponse
```typescript
type CreateCorporateResponse = {
  status: string;
  corporate_uuid: string;
};
```

#### <span id="UpdateCorporateRequest"></span>UpdateCorporateRequest
```typescript
type UpdateCorporateRequest = CreateCorporateRequest & { corporate_uuid: string };
```

#### <span id="GetCorporateDetailsRequest"></span>GetCorporateDetailsRequest
```typescript
type GetCorporateDetailsRequest = {
  corporate_uuid: string;
};
```

#### <span id="GetCorporateDetailsResponse"></span>GetCorporateDetailsResponse
```typescript
type GetCorporateDetailsResponse = {
  legal_name: string;
  type: CorporateType;
  registration_number?: string;
  contact_details: {
    name: string;
    phone: string;
    email: string;
  };
  registered_address: CorporationAddress;
  trading_address?: CorporationAddress;
  target_address: string;
  status: CorporationStatus;
};
```

#### <span id="LinkUserToCorporateRequest"></span>LinkUserToCorporateRequest
```typescript
type LinkUserToCorporateRequest = {
  corporateUuid: string;
  userUuid: string;
  role: UserCorporateRole;
};
```

#### <span id="LinkUserToCorporateResponse"></span>LinkUserToCorporateResponse
```typescript
type LinkUserToCorporateResponse = {
  message: string;
  uuid: string;
};
```

#### <span id="UnlinkUserFromCorporateRequest"></span>UnlinkUserFromCorporateRequest
```typescript
type UnlinkUserFromCorporateRequest = {
  corporateUuid: string;
  corporateUserUuid: string;
};
```

#### <span id="UnlinkUserFromCorporateResponse"></span>UnlinkUserFromCorporateResponse
```typescript
type UnlinkUserFromCorporateResponse = {
  message: string;
  uuid: string;
};
```

#### <span id="GetCorporateTransactionsRequest"></span>GetCorporateTransactionsRequest
```typescript
type GetCorporateTransactionsRequest = {
  corporate_uuid: string;
};
```

#### <span id="GetCorporateTransactionsResponse"></span>GetCorporateTransactionsResponse
```typescript
type Transaction = {
  amount: number;
  currency: Currency | StableToken;
  transaction_id: string;
};

type GetCorporateTransactionsResponse = {
  status: ProcessStatus;
  user_uuid: string;
  direction: NewProcessDirection;
  input: Transaction;
  output: Transaction;
};
```

#### <span id="GetCorporateTokenPreferencesRequest"></span>GetCorporateTokenPreferencesRequest
```typescript
type GetCorporateTokenPreferencesRequest = {
  corporate_uuid: string;
};
```

#### <span id="GetCorporateTokenPreferencesResponse"></span>GetCorporateTokenPreferencesResponse
```typescript
type GetCorporateTokenPreferencesResponse = {
  currency: Currency;
  chain: Chain;
  token: StableToken;
};
```

#### <span id="UpdateCorporateTokenPreferencesRequest"></span>UpdateCorporateTokenPreferencesRequest
```typescript
type UpdateCorporateTokenPreferencesRequest = GetCorporateTokenPreferencesResponse &
  GetCorporateTokenPreferencesRequest;
```

### Service methods

#### createCorporate

<div><pre>createUser(params: <a href="#CreateCorporateRequest">CreateCorporateRequest</a>): Promise&#60;<a href="#CreateCorporateResponse">CreateCorporateResponse</a>&#62;</pre></div>

##### Overview

Creates a company

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
  const result = await sdk.corporate.management.createCorporate({
    legal_name: "Legal name",
    type: CorporateType.CHARITY,
    contact_details: {
      name: "name",
      phone: "phone number",
      email: "email",
    },
    registered_address: {},
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
  const result = await sdk.corporate.management.createCorporate({
    legal_name: "Legal name",
    type: CorporateType.CHARITY,
    contact_details: {
      name: "name",
      phone: "phone number",
      email: "email",
    },
    registered_address: {},
  });
})();
```

#### updateCorporate

<div><pre>updateCorporate(params: <a href="#UpdateCorporateRequest">UpdateCorporateRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

Updates a company

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
  const result = await sdk.corporate.management.updateCorporate({
    corporate_uuid: "uuid",
    legal_name: "Legal name",
    type: CorporateType.CHARITY,
    contact_details: {
      name: "name",
      phone: "phone number",
      email: "email",
    },
    registered_address: {},
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
  const result = await sdk.corporate.management.updateCorporate({
    corporate_uuid: "uuid",
    legal_name: "Legal name",
    type: CorporateType.CHARITY,
    contact_details: {
      name: "name",
      phone: "phone number",
      email: "email",
    },
    registered_address: {},
  });
})();
```

#### updateCorporateTokenPreferences

<div><pre>updateCorporateTokenPreferences(params: <a href="#UpdateCorporateTokenPreferencesRequest">UpdateCorporateTokenPreferencesRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

Updates a company's token preference

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
  const result = await sdk.corporate.management.updateCorporateTokenPreferences({
    corporate_uuid: "uuid",
    currency: Currency.EURO,
    chain: Chain.CELO,
    token: CeloToken.CEUR,
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
  const result = await sdk.corporate.management.updateCorporateTokenPreferences({
    corporate_uuid: "uuid",
    currency: Currency.EURO,
    chain: Chain.CELO,
    token: CeloToken.CEUR,
  });
})();
```

#### getCorporateDetails

<div><pre>getCorporateDetails(params: <a href="#GetCorporateDetailsRequest">GetCorporateDetailsRequest</a>): Promise&#60;<a href="#GetCorporateDetailsResponse">GetCorporateDetailsResponse</a>&#62;</pre></div>

##### Overview

Get a company's details

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
  const result = await sdk.corporate.management.getCorporateDetails({
    corporate_uuid: "uuid"
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
  const result = await sdk.corporate.management.getCorporateDetails({
    corporate_uuid: "uuid"
  });
})();
```

#### linkUserToCorporate

<div><pre>linkUserToCorporate(params: <a href="#LinkUserToCorporateRequest">LinkUserToCorporateRequest</a>): Promise&#60;<a href="#LinkUserToCorporateResponse">LinkUserToCorporateResponse</a>&#62;</pre></div>

##### Overview

Add a user to a company

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
  const result = await sdk.corporate.management.linkUserToCorporate({
    corporateUuid: "uuid",
    userUuid: "uuid",
    role: UserCorporateRole.ADMINISTRATOR
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
  const result = await sdk.corporate.management.linkUserToCorporate({
    corporateUuid: "uuid",
    userUuid: "user uuid",
    role: UserCorporateRole.ADMINISTRATOR
  });
})();
```

#### unlinkUserFromCorporate

<div><pre>unlinkUserFromCorporate(params: <a href="#UnlinkUserFromCorporateRequest">UnlinkUserFromCorporateRequest</a>): Promise&#60;<a href="#UnlinkUserFromCorporateResponse">UnlinkUserFromCorporateResponse</a>&#62;</pre></div>

##### Overview

Remove a user from a company

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
  const result = await sdk.corporate.management.unlinkUserFromCorporate({
    corporateUuid: "uuid",
    corporateUserUuid: "user uuid",
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
  const result = await sdk.corporate.management.unlinkUserFromCorporate({
    corporateUuid: "uuid",
    corporateUserUuid: "user uuid",
  });
})();
```

#### getCorporateTransactions

<div><pre>getCorporateTransactions(params: <a href="#GetCorporateTransactionsRequest">GetCorporateTransactionsRequest</a>): Promise&#60;<a href="#GetCorporateTransactionsResponse">GetCorporateTransactionsResponse[]</a>&#62;</pre></div>

##### Overview

Get a company's transactions

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
  const result = await sdk.corporate.management.getCorporateTransactions({
    corporate_uuid: "uuid"
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
  const result = await sdk.corporate.management.getCorporateTransactions({
    corporate_uuid: "uuid"
  });
})();
```

#### getCorporateTokenPreferences

<div><pre>getCorporateTokenPreferences(params: <a href="#GetCorporateTokenPreferencesRequest">GetCorporateTokenPreferencesRequest</a>): Promise&#60;<a href="#GetCorporateTokenPreferencesResponse">GetCorporateTokenPreferencesResponse[]</a>&#62;</pre></div>

##### Overview

Get a company's token preferences

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
  const result = await sdk.corporate.management.getCorporateTokenPreferences({
    corporate_uuid: "uuid"
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
  const result = await sdk.corporate.management.getCorporateTokenPreferences({
    corporate_uuid: "uuid"
  });
})();
```

