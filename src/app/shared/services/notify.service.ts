import { MatSnackBar } from '@angular/material/snack-bar'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private snackBar = inject(MatSnackBar)

  success(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    })
  }
}
