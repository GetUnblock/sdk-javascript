import { FacadeFactory, IFacadeFactory } from './FacadeFactory';
import { AuthFacade, IAuthFacade } from './auth/AuthFacade';
import { SdkSettings, SdkSettingsParams } from './definitions';

export interface ISingleton {
  auth: IAuthFacade;
  setup(props: SdkSettings): Promise<void>;
}

export class Singleton implements ISingleton {
  private static instance: Singleton;

  private authFacade: IAuthFacade;

  private constructor(private facadeFactory: IFacadeFactory, private props: SdkSettings) {
    this.authFacade = new AuthFacade(this.props);
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      const props: SdkSettings = {
        prodUrl: 'https://getunblock.com',
        sandBoxUrl: 'https://sandbox.getunblock.com',
      };
      const facadeFactory = new FacadeFactory(props);
      Singleton.instance = new Singleton(facadeFactory, props);
    }

    return Singleton.instance;
  }

  async setup(props: SdkSettingsParams) {
    if (await this.healthCheck({ ...this.props, ...props })) {
      Object.assign(this.props, props);
    } else {
      // Handle errors better in short future
      throw new Error('Error to be defined');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async healthCheck(props: SdkSettings): Promise<boolean> {
    // This is going to be an API call to check that the properties are properly setup
    throw new Error('Method not implemented.');
  }

  // For the SDK this will act like a static value... Don't you think it could be typed as AUTH instead??
  get auth(): IAuthFacade {
    // If settings are defined
    if (!this.authFacade) {
      this.authFacade = this.facadeFactory.createAuthFacade();
    }
    return this.authFacade;
    // Else thorw exception
  }
}
