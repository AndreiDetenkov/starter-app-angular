import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { UserInterface } from '../../data-access/types/user.interface'

@Component({
	selector: 'app-user-card',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	template: `
		<div class="card">
			<ul>
				<li>{{ user.name }}</li>
				<li>{{ user.company.name }}</li>
				<li>{{ user.phone }}</li>
				<li>{{ user.email }}</li>
			</ul>
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
	@Input() user!: UserInterface
}
