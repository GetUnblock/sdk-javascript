export enum ProcessStatus {
  FC_INITIATED = 'FC_INITIATED',
  FC_WAITING = 'FC_WAITING',
  FC_MATCHED = 'FC_MATCHED',
  AML_CHECKS_FAILED = 'AML_CHECKS_FAILED',
  AML_CHECKS_IN_PROGRESS = 'AML_CHECKS_IN_PROGRESS',
  AML_CHECKS_COMPLETED = 'AML_CHECKS_COMPLETED',
  AML_CHECKS_REJECTED = 'AML_CHECKS_REJECTED',
  CRYPTO_TRANSFER_FAILED = 'CRYPTO_TRANSFER_FAILED',
  CRYPTO_TRANSFER_IN_PROGRESS = 'CRYPTO_TRANSFER_IN_PROGRESS',
  CRYPTO_TRANSFER_ISSUED = 'CRYPTO_TRANSFER_ISSUED',
  CRYPTO_TRANSFER_COMPLETED = 'CRYPTO_TRANSFER_COMPLETED',
  CRYPTO_TRANSFER_NOT_STARTED = 'CRYPTO_TRANSFER_NOT_STARTED',
  INTERLEDGER_TRANSFER_FAILED = 'INTERLEDGER_TRANSFER_FAILED',
  INTERLEDGER_TRANSFER_IN_PROGRESS = 'INTERLEDGER_TRANSFER_IN_PROGRESS',
  INTERLEDGER_TRANSFER_ISSUED = 'INTERLEDGER_TRANSFER_ISSUED',
  INTERLEDGER_TRANSFER_COMPLETED = 'INTERLEDGER_TRANSFER_COMPLETED',
  FIAT_TRANSFER_FAILED = 'FIAT_TRANSFER_FAILED',
  FIAT_TRANSFER_IN_PROGRESS = 'FIAT_TRANSFER_IN_PROGRESS',
  FIAT_TRANSFER_ISSUED = 'FIAT_TRANSFER_ISSUED',
  FIAT_TRANSFER_COMPLETED = 'FIAT_TRANSFER_COMPLETED',
  ON_HOLD_KYC = 'ON_HOLD_KYC',
  ON_HOLD_PROCESS = 'ON_HOLD_PROCESS',
  REFUND_LACK_KYC = 'REFUND_LACK_KYC',
  OUTSIDE_TRANSFER_IN_REVIEW = 'OUTSIDE_TRANSFER_IN_REVIEW',
  OUTSIDE_TRANSFER_REJECTED = 'OUTSIDE_TRANSFER_REJECTED',
  OUTSIDE_TRANSFER_APPROVED = 'OUTSIDE_TRANSFER_APPROVED',
  OUTSIDE_TRANSFER_RECEIVED = 'OUTSIDE_TRANSFER_RECEIVED',
  FINALIZE_PROCESS_FAILED = 'FINALIZE_PROCESS_FAILED',
  PROCESS_BLOCKED = 'PROCESS_BLOCKED',
  PROCESS_COMPLETED = 'PROCESS_COMPLETED',
  PROCESS_INITIATION_FAILED = 'PROCESS_INITIATION_FAILED',
  RETURNED_LACK_KYC = 'RETURNED_LACK_KYC',
  WAITING_FOR_FINALITY = 'WAITING_FOR_FINALITY',
  FINALITY_REACHED = 'FINALITY_REACHED',
  FINALITY_FAILED = 'FINALITY_FAILED',
}
