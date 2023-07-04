export enum ProcessStatus {
  OUTSIDE_TRANSFER_IN_REVIEW = 'OUTSIDE_TRANSFER_IN_REVIEW',
  OUTSIDE_TRANSFER_REJECTED = 'OUTSIDE_TRANSFER_REJECTED',
  OUTSIDE_TRANSFER_APPROVED = 'OUTSIDE_TRANSFER_APPROVED',
  OUTSIDE_TRANSFER_RECEIVED = 'OUTSIDE_TRANSFER_RECEIVED',
  FINALIZE_PROCESS_FAILED = 'FINALIZE_PROCESS_FAILED',
  PROCESS_BLOCKED = 'PROCESS_BLOCKED',
  PROCESS_COMPLETED = 'PROCESS_COMPLETED',
  PROCESS_INITIATION_FAILED = 'PROCESS_INITIATION_FAILED',
  CRYPTO_TRANSFER_FAILED = 'CRYPTO_TRANSFER_FAILED',
  CRYPTO_TRANSFER_IN_PROGRESS = 'CRYPTO_TRANSFER_IN_PROGRESS',
  CRYPTO_TRANSFER_ISSUED = 'CRYPTO_TRANSFER_ISSUED',
  CRYPTO_TRANSFER_COMPLETED = 'CRYPTO_TRANSFER_COMPLETED',
  INTERLEDGER_TRANSFER_FAILED = 'INTERLEDGER_TRANSFER_FAILED',
  INTERLEDGER_TRANSFER_IN_PROGRESS = 'INTERLEDGER_TRANSFER_IN_PROGRESS',
  INTERLEDGER_TRANSFER_ISSUED = 'INTERLEDGER_TRANSFER_ISSUED',
  INTERLEDGER_TRANSFER_COMPLETED = 'INTERLEDGER_TRANSFER_COMPLETED',
  IBAN_TRANSFER_FAILED = 'IBAN_TRANSFER_FAILED',
  IBAN_TRANSFER_IN_PROGRESS = 'IBAN_TRANSFER_IN_PROGRESS',
  IBAN_TRANSFER_ISSUED = 'IBAN_TRANSFER_ISSUED',
  IBAN_TRANSFER_COMPLETED = 'IBAN_TRANSFER_COMPLETED',
  AML_CHECKS_FAILED = 'AML_CHECKS_FAILED',
  AML_CHECKS_IN_PROGRESS = 'AML_CHECKS_IN_PROGRESS',
  AML_CHECKS_COMPLETED = 'AML_CHECKS_COMPLETED',
}
