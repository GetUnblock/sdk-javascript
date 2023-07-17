---
title: System Development Kit - Javascript
excerpt: GetUnblock SDK is a JS library for interacting with Unblock APIs
category: 64aebfcf6c645e002384ccdc
---

## Installation

```bash
npm i @getunblock/sdk
```

## Usage

### Typescript

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

  console.log(result);
})();

```

### JavaScript

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

  console.log(result);
})();
```

<div class="CodeMirror-gutter-filler">
<h3>List of Services Available</h3>

* [auth](docs/AUTH.md)
* [company](docs/COMPANY.md)
* [exchangeRates](docs/EXCHANGE_RATES.md)
* [kyc](docs/KYC.md)
* [offramp](docs/OFFRAMP.md)
* [process](docs/PROCESS.md)
* [remoteBankAccount](docs/REMOTE_BANK_ACCOUNT.md)
* [tokenPreferences](docs/TOKEN_PREFERENCES.md)
* [transactionFee](docs/TRANSACTION_FEE.md)
* [unblockBankAccount](docs/UNBLOCK_BANK_ACCOUNT.md)
* [user](docs/USER.md)

</div>
