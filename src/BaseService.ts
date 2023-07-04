import axios, { AxiosInstance } from 'axios';
import { SdkSettings } from './definitions';

export class BaseService {
  protected readonly axiosClient: AxiosInstance;
  constructor(protected props: SdkSettings) {
    const { prod, prodUrl, sandBoxUrl, timeoutMs } = props;
    this.axiosClient = axios.create({
      baseURL: prod ? prodUrl : sandBoxUrl,
      timeout: timeoutMs,
    });
  }
}
