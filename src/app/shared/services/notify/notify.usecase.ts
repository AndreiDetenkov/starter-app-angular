export abstract class NotifyUseCase {
  abstract success(message: string, action: string): void
}
