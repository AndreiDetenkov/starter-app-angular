import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'

import { UserInterface } from '../../data-access/types/user.interface'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTooltip,
    MatIconModule,
    NgOptimizedImage,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  user = input.required<UserInterface>()

  companyName = computed<string>(() => {
    return this.user().company?.name ?? 'No company'
  })

  contentList = computed<{ icon: string; value: string }[]>(() => {
    return [
      { icon: 'mail', value: this.user().email },
      { icon: 'smartphone', value: this.user().phone },
      { icon: 'language', value: this.user().website },
    ]
  })

  @Output()
  remove = new EventEmitter<number>()

  @Output()
  edit = new EventEmitter<UserInterface>()

  onRemoveUser(): void {
    this.remove.emit(this.user().id)
  }

  onEditUser(): void {
    this.edit.emit(this.user())
  }
}
