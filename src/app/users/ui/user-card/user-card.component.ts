import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import { UserCardInterface } from '../../data-access/types/user-card.interface'

@Component({
	selector: 'app-user-card',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	template: `
		<div class="card">
			<ul>
				<li>{{ user.name }}</li>
				<li>{{ user.website }}</li>
				<li>{{ user.phone }}</li>
				<li>{{ user.email }}</li>
			</ul>
			<button (click)="getUserId()">Remove</button>
		</div>
	`,
	styles: [
		`
			.card {
				margin-bottom: 20px;
				padding: 10px;
				border: 1px solid #e2e2e2;
				border-radius: 10px;
				font-size: 16px;
				color: #333;
			}
		`,
	],
})
export class UserCardComponent {
	@Input({ required: true }) user!: UserCardInterface

	@Output() onClick = new EventEmitter<number>()
	getUserId() {
		this.onClick.emit(this.user.id)
	}
}
