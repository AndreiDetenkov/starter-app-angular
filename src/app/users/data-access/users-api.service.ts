import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UserInterface } from './types/user.interface'

@Injectable()
export class UsersApiService {
	constructor(private http: HttpClient) {}

	getUsers(): Observable<UserInterface[]> {
		const url = 'https://jsonplaceholder.typicode.com/users'
		return this.http.get<UserInterface[]>(url)
	}
}
