import { Observable } from 'rxjs'

import { UserInterface } from './types/user.interface'

export abstract class GetUsersUseCase {
	abstract execute(): Observable<UserInterface[]>
}
