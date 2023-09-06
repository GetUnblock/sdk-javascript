## Interface

```typescript
export interface IUserManagementService {
  createUser(params: CreateUserRequest): Promise<CreateUserResponse>;
  updateUser(params: UpdateUserRequest): Promise<void>;
  getUserDetails(): Promise<GetUserResponse>;
  getUserRampTransactions(): Promise<ProcessDetails[]>;
  getUserTokenPreference(): Promise<GetUserTokenPreferenceResponse>;
  updateUserTokenPreference(params: TokenPreference): Promise<void>;
}
```

### Structures used

#### Union types, Literal types, Enums and Other Interfaces
```typescript
enum ExternalProcessDirection {
  CRYPTO_TO_FIAT = 'cryptoToFiat',
  FIAT_TO_CRYPTO = 'fiatToCrypto',
}
```


#### <span id="UpdateUserRequest"></span>UpdateUserRequest
```typescript
type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  targetAddress: string;
  country: Country; // 2 letter country code
};
```

#### <span id="CreateUserResponse"></span>CreateUserResponse
```typescript
type CreateUserResponse = {
  userUuid: string;
  status: UserStatus; //enum
};
```

#### <span id="UpdateUserRequest"></span>UpdateUserRequest
```typescript
type UpdateUserRequest = {
  target_address?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  email?: string;
  address?: {
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    country?: string;
    post_code?: string;
  };
};
```

#### <span id="GetUserResponse"></span>GetUserResponse
```typescript
type GetUserResponse = {
  uuid: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  target_address?: string;
  email: string;
  address: {
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    country?: string;
    post_code?: string;
  };
  status: string;
  linked_corporates_uuid: string[];
};
```

#### <span id="ProcessDetails"></span>ProcessDetails
```typescript
type ProcessDetails = {
  status: ProcessStatus; //enum
  user_uuid: string;
  direction: ExternalProcessDirection;
  input: {
    amount: number;
    currency: string;
    transaction_id: string;
  };
  output?: {
    amount: number | undefined;
    currency: string;
    transaction_id: string | undefined;
  };
};
```

#### <span id="GetUserTokenPreferenceResponse"></span>GetUserTokenPreferenceResponse
```typescript
type GetUserTokenPreferenceResponse = TokenPreference[];
```

#### <span id="TokenPreference"></span>TokenPreference

| Field Name | Type   |
|------------| ------ |
| token      | string |
| chain      | string |
| currency   | string |

### Service methods

#### createUser

<div><pre>createUser(params: <a href="#createuserrequest">CreateUserRequest</a>): Promise&#60;<a href="#createuserresponse">CreateUserResponse</a>&#62;</pre></div>

##### Overview

Creates a user

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
  const result = await sdk.user.management.createUser({
    firstName: "First name",
    lastName: "Last name",
    email: "email",
    targetAddress: "0x address",
    country: "2 letter country code",
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
  const result = await sdk.user.management.createUser({
    firstName: "First name",
    lastName: "Last name",
    email: "email",
    targetAddress: "0x address",
    country: "2 letter country code",
  });
})();
```

#### updateUser

<div><pre>updateUser(params: <a href="#updateuserrequest">UpdateUserRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

Updates a user

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
  const result = await sdk.user.management.updateUser({
    target_address: "0x address",
    first_name: "First name",
    last_name: "Last name",
    date_of_birth: "date of birth",
    email: "email",
    address: {
      address_line_1: "address line 1",
      address_line_2: "address line 2",
      city: "City",
      country: "Country code",
      post_code: "Postal code",
    }
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
  const result = await sdk.user.management.updateUser({
    target_address: "0x address",
    first_name: "First name",
    last_name: "Last name",
    date_of_birth: "date of birth",
    email: "email",
    address: {
      address_line_1: "address line 1",
      address_line_2: "address line 2",
      city: "City",
      country: "Country code",
      post_code: "Postal code",
    }
  });
})();
```


#### getUserDetails

<div><pre>getUserDetails(): Promise&#60;<a href="#getuserresponse">GetUserResponse</a>&#62;</pre></div>

##### Overview

Get user details

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
  const result = await sdk.user.management.getUserDetails();
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
  const result = await sdk.user.management.getUserDetails();
})();
```


#### getUserRampTransactions

<div><pre>getUserRampTransactions(): Promise&#60;<a href="#processdetails">ProcessDetails[]</a>&#62;</pre></div>

##### Overview

Get user's transactions

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
  const result = await sdk.user.management.getUserRampTransactions();
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
  const result = await sdk.user.management.getUserRampTransactions();
})();
```


#### getUserTokenPreference

<div><pre>getUserTokenPreference(): Promise&#60;<a href="#getusertokenpreferenceresponse">GetUserTokenPreferenceResponse</a>&#62;</pre></div>

##### Overview

Get user's token preference

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
  const result = await sdk.user.management.getUserTokenPreference();
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
  const result = await sdk.user.management.getUserTokenPreference();
})();
```


#### updateUserTokenPreference

<div><pre>updateUserTokenPreference(params: <a href="#tokenpreference">TokenPreference</a>): Promise&#60;void&#62;</pre></div>

##### Overview

Updates a user's token preference

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
  const result = await sdk.user.management.updateUserTokenPreference({
    token: "token",
    chain: "chain",
    currency: "currency"
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
  const result = await sdk.user.management.updateUserTokenPreference({
    token: "token",
    chain: "chain",
    currency: "currency"
  });
})();
```


