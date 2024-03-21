import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'

import { UserInterface } from '../../data-access/types/user.interface'

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule, MatListModule, MatIconModule, MatTooltip],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  user = input.required<UserInterface>()

  remove = output<number>()

  edit = output<UserInterface>()

  onRemoveUser(): void {
    this.remove.emit(this.user().id)
  }

  onEditUser(): void {
    this.edit.emit(this.user())
  }
}
