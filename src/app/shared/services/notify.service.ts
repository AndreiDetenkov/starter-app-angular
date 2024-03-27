import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private snackBar = inject(MatSnackBar)

  open(message: string, action: string = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config)
  }
}
