import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

import { GetUsersUseCase } from './get-users.usecase'
import { UsersClientService } from './users-client.service'
import { UserInterface } from './types/user.interface'

@Injectable({
	providedIn: 'root',
})
export class GetUsersService implements GetUsersUseCase {
	constructor(private usersApiService: UsersClientService) {}

	execute(): Observable<UserInterface[]> {
		return this.usersApiService.fetchUsers()
	}
}
