import { IServiceFactory, ServiceFactory } from './ServiceFactory';
import { AuthService, IAuthService } from './auth/AuthService';
import { SdkSettings, SdkSettingsParams } from './definitions';

export interface ISingleton {
  auth: IAuthService;
  setup(props: SdkSettings): Promise<void>;
}

export class Singleton implements ISingleton {
  private static instance: Singleton;

  private authService: IAuthService;

  private constructor(private ServiceFactory: IServiceFactory, private props: SdkSettings) {
    this.authService = new AuthService(this.props);
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      const props: SdkSettings = {
        timeoutMs: 10000,
        prod: false,
        apiKey: '1235',
        prodUrl: 'https://getunblock.com',
        sandBoxUrl: 'https://sandbox.getunblock.com',
      };
      const serviceFactory: IServiceFactory = new ServiceFactory(props);
      Singleton.instance = new Singleton(serviceFactory, props);
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

  get auth(): IAuthService {
    // If settings are defined
    if (!this.authService) {
      this.authService = this.ServiceFactory.createAuthService();
    }
    return this.authService;
    // Else thorw exception
  }
}
