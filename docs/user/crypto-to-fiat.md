---
title: User Crypto to Fiat Service
excerpt: Reference page for the user crypto to fiat service interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IUserCryptoToFiatService {
  getUserUnblockWallet(params: GetUserUnblockWalletRequest): Promise<GetUserUnblockWalletResponse>;
  createRemoteUserBankAccount(
    params: CreateRemoteUserBankAccountRequest,
  ): Promise<CreateRemoteUserBankAccountResponse>;

  getAllRemoteBankAccounts(): Promise<GetAllRemoteBankAccountsResponse>;

  changeMainUserRemoteBankAccount(params: ChangeMainUserRemoteBankAccountRequest): Promise<void>;

  getRemoteBankAccountByUuid(
    params: GetRemoteBankAccountByUuidRequest,
  ): Promise<GetRemoteBankAccountByUuidResponse>;
}
```

### Structures used

#### Union types, Literal types, Enums and Other Interfaces

<span id="AccountDetails"></span>AccountDetails

```typescript
type GbpAccountDetails = {
  accountNumber: string;
  sortCode: string;
};

type EurAccountDetails = {
  iban: string;
};

type AccountDetails =
  | ({ currency: Currency.EURO } & EurAccountDetails)
  | ({ currency: Currency.GBP } & GbpAccountDetails);
```

<span id="RemoteBankAccount"></span>RemoteBankAccount

```typescript
type RemoteUserBankAccount = {
  uuid: string;
  iban: string;
  bic: string;
  accountNumber: string;
  sortCode: string;
  mainBeneficiary: boolean;
  currency: Currency;
};
```

#### <span id="GetUserUnblockWalletRequest"></span>GetUserUnblockWalletRequest

| Field Name | Type                              |
| ---------- | --------------------------------- |
| chain      | [Chain](../common-types.md#chain) |

#### <span id="GetUserUnblockWalletResponse"></span>GetUserUnblockWalletResponse

**Array of**

| Field Name | Type                              |
| ---------- | --------------------------------- |
| chain      | [Chain](../common-types.md#chain) |
| address    | string                            |

#### <span id="CreateRemoteUserBankAccountRequest"></span>CreateRemoteUserBankAccountRequest

| Field Name      | Type                              |
| --------------- | --------------------------------- |
| accountName     | string                            |
| mainBeneficiary | boolean                           |
| accountDetails  | [AccountDetails](#AccountDetails) |

#### <span id="CreateRemoteUserBankAccountResponse"></span>CreateRemoteUserBankAccountResponse

| Field Name | Type   |
| ---------- | ------ |
| uuid       | string |

#### <span id="GetAllRemoteBankAccountsResponse"></span>GetAllRemoteBankAccountsResponse

**Array of** [RemoteBankAccount](#RemoteBankAccount)

#### <span id="ChangeMainUserRemoteBankAccountRequest"></span>ChangeMainUserRemoteBankAccountRequest

| Field Name            | Type   |
| --------------------- | ------ |
| remoteBankAccountUuid | string |

#### <span id="GetRemoteBankAccountByUuidRequest"></span>GetRemoteBankAccountByUuidRequest

| Field Name            | Type   |
| --------------------- | ------ |
| remoteBankAccountUuid | string |

#### <span id="GetRemoteBankAccountByUuidResponse"></span>GetRemoteBankAccountByUuidResponse

**Object** [RemoteBankAccount](#RemoteBankAccount)

### Service methods

#### getUserUnblockWallet

<div><pre>getUserUnblockWallet(params: <a href="#getuserunblockwalletrequest">GetUserUnblockWalletRequest</a>): Promise&#60;<a href="#getuserunblockwalletresponse">GetUserUnblockWalletResponse</a>&#62;</pre></div>

##### Overview

This method allows an user to obtain the unblock wallets associated with the given chain. This is required in order to obtain the address to which the user should send crypto when going from crypto to fiat

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
  const result = await sdk.user.cryptoToFiat.getUserUnblockWallet({
    corporateUuid: 'The uuid of the user',
    chain: 'The chain for which you wish to obtain the wallet address',
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
  const result = await sdk.user.cryptoToFiat.getUserUnblockWallet({
    corporateUuid: 'The uuid of the user',
    chain: 'The chain for which you wish to obtain the wallet address',
  });
})();
```

#### createRemoteUserBankAccount

<div><pre>createRemoteUserBankAccount(params: <a href="#createremoteuserbankaccountrequest">CreateRemoteUserBankAccountRequest</a>): Promise&#60;<a href="#createremoteuserbankaccountresponse">CreateRemoteUserBankAccountResponse</a>&#62;</pre></div>

##### Overview

This method allows an user to create a remote bank account, required to be able to go from crypto to fiat.

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
  const result = await sdk.user.cryptoToFiat.createRemoteUserBankAccount({
    accountName: 'Main account',
    mainBeneficiary: true,
    accountDetails: {
      currency: Currency.EURO,
      iban: 'some iban',
    },
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
  const result = await sdk.user.cryptoToFiat.createRemoteUserBankAccount({
    accountName: 'Main account',
    mainBeneficiary: true,
    accountDetails: {
      currency: Currency.EURO,
      iban: 'some iban',
    },
  });
})();
```

#### getAllRemoteBankAccounts

<div><pre>getAllRemoteBankAccounts(params: void): Promise&#60;<a href="#getallremotebankaccountsresponse">GetAllRemoteBankAccountsResponse</a>&#62;</pre></div>

##### Overview

This method allows an user to obtain all remote bank accounts registered in it's name

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
  const result = await sdk.user.cryptoToFiat.getAllRemoteBankAccounts();
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
  const result = await sdk.user.cryptoToFiat.getAllRemoteBankAccounts();
})();
```

#### changeMainUserRemoteBankAccount

<div><pre>changeMainUserRemoteBankAccount(params: <a href="#changemainuserremotebankaccountrequest">CreateRemoteUserBankAccountRequest</a>): Promise&#60;void&#62;</pre></div>

##### Overview

This method allows an user to change the remote bank account to which the money should be sent when going from crypto to fiat

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
  const result = await sdk.user.cryptoToFiat.changeMainUserRemoteBankAccount({
    remoteBankAccountUuid: 'The uuid of the bank account here',
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
  const result = await sdk.user.cryptoToFiat.changeMainUserRemoteBankAccount({
    remoteBankAccountUuid: 'The uuid of the bank account here',
  });
})();
```

#### getRemoteBankAccountByUuid

<div><pre>getRemoteBankAccountByUuid(params: <a href="#getremotebankaccountbyuuidrequest">GetRemoteBankAccountByUuidResponse</a>): Promise&#60;<a href="#getremotebankaccountbyuuidresponse">GetRemoteBankAccountByUuidResponse</a>&#62;</pre></div>

##### Overview

This method allows an user to consult a specific remote bank account, by providing its uuid

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
  const result = await sdk.user.cryptoToFiat.getRemoteBankAccountByUuid({
    remoteBankAccountUuid: 'The uuid of the bank account here',
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
  const result = await sdk.user.cryptoToFiat.getRemoteBankAccountByUuid({
    remoteBankAccountUuid: 'The uuid of the bank account here',
  });
})();
```
