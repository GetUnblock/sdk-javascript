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

#### <span id="GetRemoteBankAccountByUuidResponse></span>GetRemoteBankAccountByUuidResponse

**Object** [RemoteBankAccount](#RemoteBankAccount)
