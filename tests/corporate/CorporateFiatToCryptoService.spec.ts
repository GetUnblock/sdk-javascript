import axios, { AxiosError, AxiosInstance } from 'axios';
import { SdkSettings } from '../../src/SdkSettings';
import { axiosErrorMock, randomErrorMock } from '../mocks/errors.mock';
import { propsMock } from '../mocks/props.mock';

describe('CorporateFiatToCryptoService', () => {
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

  describe.skip('createCorporateUnblockBankAccount', () => undefined);

  describe.skip('getCorporateUnblockBankAccounts', () => undefined);

  describe.skip('getCorporateUnblockBankAccount', () => undefined);

  /**
   * @todo: Delete after implementing the required tests
   */
  it('Tests Not Implemented Yet', () => {
    expect(true).toBe(true);
  });
});
