import { BaseService } from '../../BaseService';
import { GetKybDocumentsChecklistRequest, GetKybDocumentsChecklistResponse } from './definitions';

export interface IKybService {
  getKybDocumentsChecklist(
    params: GetKybDocumentsChecklistRequest,
  ): Promise<GetKybDocumentsChecklistResponse>;
}

export class KybService extends BaseService implements IKybService {
  getKybDocumentsChecklist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetKybDocumentsChecklistRequest,
  ): Promise<GetKybDocumentsChecklistResponse> {
    throw new Error('Method not implemented.');
  }
}
