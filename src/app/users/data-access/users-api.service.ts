import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { UserInterface } from './types/user.interface'
import { environment } from '../../../environments/environment.development'

@Injectable()
export class UsersApiService {
	constructor(private http: HttpClient) {}

	getUsers(): Observable<UserInterface[]> {
		const url = `${environment.apiUrl}/users`
		return this.http.get<UserInterface[]>(url)
	}
}
