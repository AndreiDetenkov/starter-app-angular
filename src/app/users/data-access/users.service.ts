import { Injectable } from '@angular/core'

import { UserInterface } from './types/user.interface'
import { UsersApiService } from './users-api.service'

@Injectable()
export class UsersService {
	users: UserInterface[] = []

	constructor(private usersApiService: UsersApiService) {}

	getUsers() {
		this.usersApiService.fetchUsers().subscribe((users: UserInterface[]) => (this.users = users))
	}
}
