import { SDK } from './SDK';
import { ServiceFactory } from './ServiceFactory';
import { SdkSettings } from './definitions';

let createdInstanceCount = 0;
const GetUnblock = (props: SdkSettings): SDK => {
  createdInstanceCount++;
  return new SDK(createdInstanceCount, new ServiceFactory(props), props);
};
export default GetUnblock;
