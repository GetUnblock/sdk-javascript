# GetUnblock SDK - TRANSACTION FEE Service

## Interface

```typescript
interface ITransactionFeeService {
  getTransactionFeeEstimation(dto: TransactionFeeEstRequest): Promise<TransactionFeeEstResponse>;
}
```

### Structures used

#### <span id="TransactionFeeEstRequest"></span>TransactionFeeEstRequest

| Field Name | Type |
| ---------- | ---- |
| paymentMethod | [PaymentMethods](/docs/COMMON_TYPES.md#PaymentMethods) |
| direction | [ProcessDirection](/docs/COMMON_TYPES.md#ProcessDirection) |
| inputCurrency | [Currency](/docs/COMMON_TYPES.md#Currency) |
| outputCurrency | [Currency](/docs/COMMON_TYPES.md#Currency) |
| amount | number |

#### <span id="TransactionFeeEstResponse"></span>TransactionFeeEstResponse

| Field Name | Type |
| ---------- | ---- |
| percentageFee | number |
| totalAmount | number |

### Service Methods

#### createRemoteUserBankAccount

<div><pre>getTransactionFeeEstimation(params: <a href="#TransactionFeeEstRequest">TransactionFeeEstRequest</a>): Promise&#60;<a href="#TransactionFeeEstResponse">TransactionFeeEstResponse</a>&#62;</pre></div>

##### Overview

This method returns the estimated transaction fee

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Currency, PaymentMethods, ProcessDirection } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.transactionFee.getTransactionFeeEstimation({
    paymentMethod: PaymentMethods.OPEN_PAYD_BANK_TRANSFER,
    direction: ProcessDirection.ONRAMP,
    inputCurrency: Currency.EUR,
    outputCurrency: Currency.USD,
    amount: 100
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Currency, PaymentMethods, ProcessDirection } = require("@getunblock/sdk"); 

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.transactionFee.getTransactionFeeEstimation({
    paymentMethod: PaymentMethods.OPEN_PAYD_BANK_TRANSFER,
    direction: ProcessDirection.ONRAMP,
    inputCurrency: Currency.EUR,
    outputCurrency: Currency.USD,
    amount: 100
  });
})();
```

## Other Services Available

* [auth](/docs/AUTH.md)
* [company](/docs/COMPANY.md)
* [exchangeRates](/docs/EXCHANGE_RATES.md)
* [kyc](/docs/KYC.md)
* [offramp](/docs/OFFRAMP.md)
* [process](/docs/PROCESS.md)
* [remoteBankAccount](/docs/REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](/docs/TOKEN_PREFERENCES.md)
* [unblockBankAccount](/docs/UNBLOCK_BANK_ACCOUNT.md)
* [user](/docs/USER.md)

[Back to README](/README.md)
