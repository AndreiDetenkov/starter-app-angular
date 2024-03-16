import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { UsersService } from '../../data-access/users.service'

@Component({
	selector: 'app-users-list',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	providers: [UsersService],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
	constructor(private usersService: UsersService) {}

	ngOnInit(): void {
		this.usersService.getUsers()
	}
}
