---
title: System Development Kit - Javascript - EXCHANGE RATES Service
excerpt: Reference page for the Exchange Rates Service Interface
category: 64aebfcf6c645e002384ccdc
---

## Interface

```typescript
interface IExchangeRatesService {
  getExchangeRate(params: ExchangeRatesServiceRequest): Promise<ExchangeRatesServiceResponse>;
}
```

### Structures used

#### <span id="ExchangeRatesServiceRequest"></span>ExchangeRatesServiceRequest

| Field Name | Type |
| ---------- | ---- |
| baseCurrency | [Currency](COMMON_TYPES.md#Currency) |
| targetCurrency | [Currency](COMMON_TYPES.md#Currency) |

#### <span id="ExchangeRatesServiceResponse"></span>ExchangeRatesServiceResponse

| Field Name | Type |
| ---------- | ---- |
| exchangeRate | number |

### Service Methods

#### getExchangeRate

<div><pre>getExchangeRate(params: <a href="#ExchangeRatesServiceRequest">ExchangeRatesServiceRequest</a>): Promise&#60;<a href="#ExchangeRatesServiceResponse">ExchangeRatesServiceResponse</a>&#62;</pre></div>

##### Overview

This method allows you to get a conversion rate by giving a base currency and a target currency.

##### Usage

###### Typescript

```typescript
import getunblockSDK, { Currency } from "@getunblock/sdk";

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
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
const getunblockSDK = require("@getunblock/sdk").default;
const { Currency } = require("@getunblock/sdk");

(async () => {
  // setup SDK
  const sdk = getunblockSDK({
    apiKey:
      "API-Key [Some merchant Key]", // Key generated at the moment the merchant was created in getunblock system
    prod: false, // If true Production environment will be used otherwise Sandbox will be used instead
  });
  
  // SDK API call example
  const result = await sdk.exchangeRates.getExchangeRate({
    baseCurrency: Currency.USD,
    targetCurrency: Currency.EURO,
  });
})();
```

## Other Services Available

* [auth](AUTH)
* [company](COMPANY.md)
* [kyc](KYC.md)
* [offramp](OFFRAMP.md)
* [process](PROCESS.md)
* [remoteBankAccount](REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](TOKEN_PREFERENCES.md)
* [transactionFee](TRANSACTION_FEE.md)
* [unblockBankAccount](UNBLOCK_BANK_ACCOUNT.md)
* [user](USER.md)

[Back to README](README.md)
