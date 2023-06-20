import { AuthFacade, IAuthFacade } from './auth/AuthFacade';
import { SdkSettings } from './definitions';

export interface IFacadeFactory {
  createAuthFacade(): IAuthFacade;
}

export class FacadeFactory implements IFacadeFactory {
  constructor(private props: SdkSettings) {}
  createAuthFacade(): IAuthFacade {
    return new AuthFacade(this.props);
  }
}
