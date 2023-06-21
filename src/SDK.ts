import { IServiceFactory } from './ServiceFactory';
import { IAuthService } from './auth/AuthService';
import { SdkSettings } from './definitions';

export class SDK {
  private authService: IAuthService;

  constructor(
    private CreatedInstanceCount: number,
    private ServiceFactory: IServiceFactory,
    private props: SdkSettings,
  ) {
    // this.healthCheck();
    this.authService = this.ServiceFactory.createAuthService();
  }

  private async healthCheck(): Promise<boolean> {
    // This is going to be an API call to check that the properties are properly setup
    throw new Error('Method not implemented.');
  }

  get auth(): IAuthService {
    return this.authService;
  }

  logInstanceNumber = () => {
    console.log(this.CreatedInstanceCount);
  };
}
