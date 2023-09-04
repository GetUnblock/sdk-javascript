import { AxiosResponse } from 'axios';
import { BaseService } from '../../BaseService';
import { ErrorHandler } from '../../ErrorHandler';
import {
  GetKybDocumentsChecklistRequest,
  GetKybDocumentsChecklistResponse,
} from './definitions';

export interface IKybService {
  getChecklistOfDocuments(
    params: GetKybDocumentsChecklistRequest,
  ): Promise<GetKybDocumentsChecklistResponse>;
}

export class KybService
  extends BaseService
  implements IKybService
{
  async getChecklistOfDocuments(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetKybDocumentsChecklistRequest,
  ): Promise<GetKybDocumentsChecklistResponse> {
    const { apiKey } = this.props;

    try {

      const path = `/corporate/${params.corporateUuid}/kyb/checklist`;

      const config = {
        headers: {
          accept: 'application/json',
          Authorization: apiKey,
        },
      };

      const response: AxiosResponse<GetKybDocumentsChecklistResponse> = await this.axiosClient.get(
        path,
        config,
      );

      return response.data;
    } catch (e) {
      ErrorHandler.handle(e);
    }
  }
}