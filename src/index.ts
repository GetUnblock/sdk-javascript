import { SDK } from './SDK';
import { ServiceFactory } from './ServiceFactory';
import { SdkProps } from './definitions';

const GetUnblock = (props: SdkProps): SDK => {
  return new SDK(
    new ServiceFactory({
      ...props,
      sandBoxUrl: 'https://sandbox.getunblock.com',
      prodUrl: 'https://getunblock.com',
      timeoutMs: 10000,
    }),
  );
};

export default GetUnblock;
