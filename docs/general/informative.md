---
title: Informative Service
excerpt: Reference page for the Informative Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IInformativeService {
  getExchangeRate(params: ExchangeRatesServiceRequest): Promise<ExchangeRatesServiceResponse>;
  getTransactionFeeEstimation(params: TransactionFeeEstRequest): Promise<TransactionFeeEstResponse>;
}
```

### Structures used

#### <span id="ExchangeRatesServiceRequest"></span>ExchangeRatesServiceRequest

| Field Name     | Type                                 |
| -------------- | ------------------------------------ |
| baseCurrency   | [Currency](COMMON_TYPES.md#Currency) |
| targetCurrency | [Currency](COMMON_TYPES.md#Currency) |

#### <span id="ExchangeRatesServiceResponse"></span>ExchangeRatesServiceResponse

| Field Name   | Type   |
| ------------ | ------ |
| exchangeRate | number |

#### <span id="TransactionFeeEstRequest"></span>TransactionFeeEstRequest

| Field Name     | Type                                                 |
| -------------- | ---------------------------------------------------- |
| paymentMethod  | [PaymentMethods](COMMON_TYPES.md#PaymentMethods)     |
| direction      | [ProcessDirection](COMMON_TYPES.md#ProcessDirection) |
| inputCurrency  | [Currency](COMMON_TYPES.md#Currency)                 |
| outputCurrency | [Currency](COMMON_TYPES.md#Currency)                 |
| amount         | number                                               |

#### <span id="TransactionFeeEstResponse"></span>TransactionFeeEstResponse

| Field Name    | Type   |
| ------------- | ------ |
| percentageFee | number |
| totalAmount   | number |

### Service Methods

#### getTransactionFeeEstimation

<div><pre>getTransactionFeeEstimation(params: <a href="#TransactionFeeEstRequest">TransactionFeeEstRequest</a>): Promise&#60;<a href="#TransactionFeeEstResponse">TransactionFeeEstResponse</a>&#62;</pre></div>

##### Overview

This method returns the estimated transaction fee

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Currency, PaymentMethods, ProcessDirection } from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.transactionFee.getTransactionFeeEstimation({
    paymentMethod: PaymentMethods.OPEN_PAYD_BANK_TRANSFER,
    direction: ProcessDirection.ONRAMP,
    inputCurrency: Currency.EUR,
    outputCurrency: Currency.USD,
    amount: 100,
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;
const { Currency, PaymentMethods, ProcessDirection } = require('@getunblock/sdk');

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.transactionFee.getTransactionFeeEstimation({
    paymentMethod: PaymentMethods.OPEN_PAYD_BANK_TRANSFER,
    direction: ProcessDirection.ONRAMP,
    inputCurrency: Currency.EUR,
    outputCurrency: Currency.USD,
    amount: 100,
  });
})();
```

#### getExchangeRate

<div><pre>getExchangeRate(params: <a href="#ExchangeRatesServiceRequest">ExchangeRatesServiceRequest</a>): Promise&#60;<a href="#ExchangeRatesServiceResponse">ExchangeRatesServiceResponse</a>&#62;</pre></div>

##### Overview

This method allows you to get a conversion rate by giving a base currency and a target currency.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Currency } from '@getunblock/sdk';

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.exchangeRates.getExchangeRate({
    baseCurrency: Currency.USD,
    targetCurrency: Currency.EURO,
  });
})();
```

###### Javascript

```javascript
const getunblockSDK = require('@getunblock/sdk').default;
const { Currency } = require('@getunblock/sdk');

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey: 'API-Key [Some merchant Key]', // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });

  // SDK API call example
  const result = await sdk.exchangeRates.getExchangeRate({
    baseCurrency: Currency.USD,
    targetCurrency: Currency.EURO,
  });
})();
```

<div class="CodeMirror-gutter-filler">

[Back to general services index](./index.md)
[Back to root index](../index.md)

</div>
