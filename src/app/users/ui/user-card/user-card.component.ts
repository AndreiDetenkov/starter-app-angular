import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  InputSignalWithTransform,
  output,
  OutputEmitterRef,
} from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'

import { UserCardInterface } from '../../data-access/types/user-card.interface'

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule, MatListModule, MatIconModule, MatTooltip],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  user: InputSignal<UserCardInterface> = input.required({
    transform: (user) => ({
      id: user.id,
      name: user.name,
      website: user.website,
      email: user.email,
      phone: user.phone,
    }),
  })

  remove = output<number>()

  edit = output<UserCardInterface>()

  onRemoveUser(): void {
    this.remove.emit(this.user().id)
  }

  onEditUser(): void {
    this.edit.emit(this.user())
  }
}
