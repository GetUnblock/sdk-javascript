import axios, { AxiosError, AxiosInstance } from 'axios';
import {
  AddUserToCorporateApiRequestBody,
  CorporateDetails,
  CreateCorporateApiRequestBody,
  CreateCorporateApiResponseData,
  CreateCorporateResponse,
  TargetAddress,
  UpdateCorporateApiRequestBody,
} from '../../src/corporate/management/definitions';
import { KybService } from '../../src/corporate/kyb/KybService';

import { SdkSettings } from '../../src/SdkSettings';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('KybService', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let axiosClient: AxiosInstance;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let props: SdkSettings;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let axiosError: AxiosError;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let randomError: unknown;
  let corporateDetails: CorporateDetails;
  let targetAddress: TargetAddress;
  let message: string;
  let uuid: string;

  beforeAll(() => {
    axiosClient = mockedAxios.create();
  });

  beforeEach(() => {
    props = propsMock();
    axiosError = axiosErrorMock();
    randomError = randomErrorMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.skip('getKybDocumentsChecklist', () => {

    // Happy
    it('should call axiosget method of KYB required', async () => {
      // Arrange
      const expectedResult: GetKybDocumentsChecklistResponse = {
        message: message,
        uuid: uuid,
      };

      const expectedPath = '/corporate';
      const expectedBody: CreateCorporateApiRequestBody = {
        name: corporateDetails.legal_name,
        type: corporateDetails.type,
        registered_address: corporateDetails.registeredAddress,
        city: corporateDetails.city,
        country: corporateDetails.country,
        registration_number: corporateDetails.registrationNumber,
        contact_name: corporateDetails.contactName,
        phone: corporateDetails.phone,
        email: corporateDetails.email,
        industry_sector_type: corporateDetails.industrySectorType,
        industry_sector_value: corporateDetails.industrySectorValue,
        target_address: targetAddress.targetAddress,
      };
      const expectedConfig = {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: props.apiKey,
        },
      };

      const responseData: CreateCorporateApiResponseData = {
        message: message,
        uuid: uuid,
      };

      jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);
      jest.spyOn(axiosClient, 'post').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      });

      const service = new KybService(props);

      // Act
      const result = await service.getChecklistOfDocuments({corporateUuid: uuid});

      // Assert
      expect(axiosClient.post).toBeCalledTimes(1);
      expect(axiosClient.post).toHaveBeenLastCalledWith(expectedPath, expectedBody, expectedConfig);
      expect(result).toStrictEqual(expectedResult);

    });
  });

  /**
   * @todo: Delete after implementing the required tests
   */
  it('Tests Not Implemented Yet', () => {
    expect(true).toBe(true);
  });
});


