import { BackendService } from './BackendService.base';

export class RealBackendService extends BackendService {
  override pullData() {
    return 'hello from real';
  }

  override me() {
    return useFetch(process.env.BACKEND_URL + '/me');
  }

  override authCheck() {
    return this.me().then((res) => !res.error.value);
  }
}
