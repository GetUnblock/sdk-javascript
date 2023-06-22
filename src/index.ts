import { SDK } from './SDK';
import { ServiceFactory } from './ServiceFactory';
import { SdkSettings } from './definitions';

const GetUnblock = (props: SdkSettings): SDK => {
  return new SDK(new ServiceFactory(props), props);
};

export default GetUnblock;
