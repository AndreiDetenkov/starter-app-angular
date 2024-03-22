import { NotifyUseCase } from './notify.usecase'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class NotifyService implements NotifyUseCase {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    })
  }
}
