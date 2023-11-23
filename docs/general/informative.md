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

#### Union types, Literal types, Enums and Other Interfaces

<span id="MerchantFee"></span>MerchantFee

```typescript
type MerchantFee = {
  type: 'add' | 'remove';
  amount: number;
};
```

#### <span id="ExchangeRatesServiceRequest"></span>ExchangeRatesServiceRequest

| Field Name     | Type                                    |
| -------------- | --------------------------------------- |
| baseCurrency   | [Currency](../common_types.md#Currency) |
| targetCurrency | [Currency](../common_types.md#Currency) |

#### <span id="ExchangeRatesServiceResponse"></span>ExchangeRatesServiceResponse

| Field Name   | Type   |
| ------------ | ------ |
| exchangeRate | number |

#### <span id="TransactionFeeEstRequest"></span>TransactionFeeEstRequest

| Field Name     | Type                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| paymentMethod  | [PaymentMethods](../common-types.md#paymentmethods)                          |
| direction      | [ProcessDirection](../common_types.md#ProcessDirection)                      |
| inputCurrency  | [Currency](../common-types.md#currency) OR [Token](../common-types.md#token) |
| outputCurrency | [Currency](../common_types.md#Currency) OR [Token](../common-types.md#token) |

#### <span id="TransactionFeeEstResponse"></span>TransactionFeeEstResponse

| Field Name  | Type                        |
| ----------- | --------------------------- |
| unblockFee  | number                      |
| merchantFee | [MerchantFee](#MerchantFee) |

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
  const result = await sdk.general.informative.getTransactionFeeEstimation({
    paymentMethod: PaymentMethods.BANK_TRANSFER,
    direction: ProcessDirection.fiatToCrypto,
    inputCurrency: Currency.EUR,
    outputCurrency: Currency.USD,
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
  const result = await sdk.general.informative.getTransactionFeeEstimation({
    paymentMethod: PaymentMethods.BANK_TRANSFER,
    direction: ProcessDirection.fiatToCrypto,
    inputCurrency: Currency.EUR,
    outputCurrency: Currency.USD,
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
  const result = await sdk.general.informative.getExchangeRate({
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
  const result = await sdk.general.informative.getExchangeRate({
    baseCurrency: Currency.USD,
    targetCurrency: Currency.EURO,
  });
})();
```

<div class="CodeMirror-gutter-filler">

[Back to general services index](./index.md)
[Back to root index](../index.md)

</div>
