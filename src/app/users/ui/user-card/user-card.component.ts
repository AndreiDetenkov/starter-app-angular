import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'

import { UserCardInterface } from '../../data-access/types/user-card.interface'
import { MatIconModule } from '@angular/material/icon'

@Component({
	selector: 'app-user-card',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatCardModule, MatButtonModule, MatListModule, MatIconModule],
	templateUrl: './user-card.component.html',
	styles: [
		`
			.card {
				margin-bottom: 20px;
			}
		`,
	],
})
export class UserCardComponent {
	@Input({ required: true }) user!: UserCardInterface

	@Output() onClick = new EventEmitter<number>()
	onRemove() {
		this.onClick.emit(this.user.id)
	}
}
