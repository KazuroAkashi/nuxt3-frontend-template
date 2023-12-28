import { HelloService } from '@/services/HelloService';
import { MockBackendService } from '@/services/backend/MockBackendService.use';

import Store from './store';

const store = new Store();

export default defineNuxtPlugin(() => {
  return {
    provide: {
      HelloService: store.service('HelloService', () => new HelloService()),
      BackendService: store.service('BackendService', () => new MockBackendService()),
    },
  };
});