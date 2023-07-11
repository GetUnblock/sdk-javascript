# GetUnblock SDK - EXCHANGE RATES Service

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
| baseCurrency | [Currency](/docs/COMMON_TYPES.md#Currency) |
| targetCurrency | [Currency](/docs/COMMON_TYPES.md#Currency) |

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
```

###### Javascript

```javascript
const getunblockSDK = require("@getunblock/sdk").default;
const { Currency } = require("@getunblock/sdk");

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
```

## Other Services Available

* [auth](/docs/AUTH.md)
* [company](/docs/COMPANY.md)
* [kyc](/docs/KYC.md)
* [offramp](/docs/OFFRAMP.md)
* [process](/docs/PROCESS.md)
* [remoteBankAccount](/docs/REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](/docs/TOKEN_PREFERENCES.md)
* [transactionFee](/docs/TRANSACTION_FEE.md)
* [unblockBankAccount](/docs/UNBLOCK_BANK_ACCOUNT.md)
* [user](/docs/USER.md)

[Back to README](/README.md)
