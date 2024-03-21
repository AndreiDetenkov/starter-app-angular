export abstract class StorageUseCase {
  abstract get(key: string): unknown
  abstract set(key: string, data: unknown): void
}
