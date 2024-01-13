export abstract class BackendService {
  abstract pullData(): String;

  abstract me(): ReturnType<typeof useFetch> | null;

  abstract authCheck(): Promise<boolean>;
}
