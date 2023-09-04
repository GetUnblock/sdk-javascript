export type GetKybDocumentsChecklistRequest = {
  corporateUuid: string;
};

export type GetKybDocumentsChecklistResponse = {
  legalName: string,
  tradingName: string,
  dateOfFormation: string,
  registeredAddress: RegisteredAddress,
  tradingdAddress: TradingAddress,
  hasParentCompany: boolean,
  parentCompanyName: string,
  parentCompanyIncDate: string,
  parentCompanyRegisteredAddress: ParentCompanyRegisteredAddress,
  parentCompanyActivities: string,
  parentCompanySourceofIncome: string,
  uboList: Ubo[],
  pscList: Psc[],
  sourceOfIncome: string

};

export type Psc = {
  firstName: string,
  lastName: string
};

export type Ubo = {
  firstName: string,
  lastName: string
};

export type ParentCompanyRegisteredAddress = {
  addressLine1: string,
  addressLine2: string,
  postCode: string,
  city: string,
  country: string
};

export type TradingAddress = {
  addressLine1: string,
  addressLine2: string,
  postCode: string,
  city: string,
  country: string
};

export type RegisteredAddress = {
  addressLine1: string,
  addressLine2: string,
  postCode: string,
  city: string,
  country: string
};
