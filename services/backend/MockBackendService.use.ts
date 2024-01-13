import { BackendService } from './BackendService.base';

export class MockBackendService extends BackendService {
  override pullData() {
    return 'hello from mock';
  }

  override me() {
    return null;
  }

  override authCheck(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
