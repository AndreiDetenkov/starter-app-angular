import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { take } from 'rxjs'

import { UsersService } from '../../data-access/users.service'
import { GetUsersUseCase } from '../../data-access/get-users.usecase'
import { GetUsersService } from '../../data-access/get-users.service'
import { UserInterface } from '../../data-access/types/user.interface'
import { UserCardComponent } from '../../ui/user-card/user-card.component'
@Component({
	selector: 'app-users-list',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, UserCardComponent],
	providers: [
		{
			provide: GetUsersUseCase,
			useClass: GetUsersService,
		},
		UsersService,
	],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
	users = this.usersService.users$

	constructor(
		private getUsersUseCase: GetUsersUseCase,
		private usersService: UsersService,
	) {}

	ngOnInit(): void {
		this.getUsersUseCase
			.execute()
			.pipe(take(1))
			.subscribe((users: UserInterface[]) => (this.usersService.setUsers = users))
	}

	handleClick(id: number): void {
		console.log(id)
	}
}
