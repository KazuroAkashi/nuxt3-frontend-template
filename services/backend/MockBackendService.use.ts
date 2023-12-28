import { BackendService } from './BackendService.base';

export class MockBackendService extends BackendService {
  override pullData() {
    return 'hello from mock';
  }
}
