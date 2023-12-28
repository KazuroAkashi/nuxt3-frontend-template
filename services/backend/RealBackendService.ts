import { BackendService } from './BackendService.base';

export class RealBackendService extends BackendService {
  override pullData() {
    return 'hello from real';
  }
}
