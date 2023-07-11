import { CompanyType } from '../enums/CompanyType';
import { UserCompanyRole } from '../enums/UserCompanyRole';

/** Company details type */
export type CompanyDetails = {
  /** The name of the company */
  name: string;

  /** The type of the company */
  type: CompanyType;

  /** The registered address of the business */
  registeredAddress?: string;

  /** The city where the business is located */
  city: string;

  /**
   * The country from which the user accessed
   * Must be a valid ISO 3166-1 alpha-2 country code
   */
  country: string;

  /** The registration number of the business */
  registrationNumber: string;

  /** The contact name of the business */
  contactName: string;

  /** The contact phone number of the business */
  phone: string;

  /** The contact email of the business */
  email: string;

  /**
   * The industry sector type of the business
   * This is optional
   */
  industrySectorType?: string;

  /**
   * The industry sector value of the business
   * This is required if industrySectorType is 'OTHER'
   */
  industrySectorValue?: string;
};

/**  * The target Ethereum address type */
export type TargetAddress = {
  /** Must be a valid Ethereum address */
  targetAddress: string;
};

/** Request dto */
export type CreateCompanyRequest = CompanyDetails & TargetAddress;

/** Request dto*/
export type UpdateCompanyRequest = CompanyDetails & { companyUuid: string };

/** Request dto */
export type AddUserToCompanyRequest = {
  companyUuid: string;
  userUuid: string;
  role: UserCompanyRole;
};

/** Request dto*/
export type RemoveUserFromCompanyRequest = {
  companyUuid: string;
  companyUserUuid: string;
};

/** Response dto */
export type CreateCompanyResponse = {
  message: string;
  uuid: string;
};

/** Response dto */
export type UpdateCompanyResponse = {
  message: string;
  uuid: string;
};

/** Response dto */
export type AddUserToCompanyResponse = {
  message: string;
  uuid: string;
};

/** Response dto */
export type RemoveUserFromCompanyResponse = {
  message: string;
  uuid: string;
};

// GetUnblock API types

/** Type for GetUnblock API endpoint*/
export type CompanyDetailsApiRequest = {
  name: string;
  type: CompanyType;
  registered_address?: string;
  city: string;
  country: string;
  registration_number: string;
  contact_name: string;
  phone: string;
  email: string;
  industry_sector_type?: string;
  industry_sector_value?: string;
};

/** Request Body for GetUnblock API endpoint*/
export type CreateCompanyApiRequestBody = CompanyDetailsApiRequest & {
  target_address: string;
};

/** Request Body for GetUnblock API endpoint*/
export type UpdateCompanyApiRequestBody = CompanyDetailsApiRequest;

/** Request Body for GetUnblock API endpoint*/
export type AddUserToCompanyApiRequestBody = {
  company_uuid: string;
  user_uuid: string;
  role: UserCompanyRole;
};

/** Response data from GetUnblock Api endpoint */
export type CreateCompanyApiResponseData = {
  message: string;
  uuid: string;
};

/** Response data from GetUnblock Api endpoint */
export type UpdateCompanyApiResponseData = {
  message: string;
  uuid: string;
};

/** Response data from GetUnblock Api endpoint */
export type AddUserToCompanyApiResponseData = {
  message: string;
  uuid: string;
};

/** Response data from GetUnblock Api endpoint */
export type RemoveUserFromCompanyApiResponseData = {
  message: string;
  uuid: string;
};
