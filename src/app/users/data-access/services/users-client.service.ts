import { catchError, EMPTY, map, Observable } from 'rxjs'
import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { UserResponse } from '../models/user-response'
import { User } from '../models/user'
import { API_URL } from '../../../app.config'
import { UserAdapter } from '../adapters/users.adapter'

@Injectable({
  providedIn: 'root',
})
export class UsersClientService {
  constructor(
    private http: HttpClient,
    private adapter: UserAdapter,
    @Inject(API_URL) private readonly url: string,
  ) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<UserResponse[]>(this.url + '/users').pipe(
      map((users) => users.map((user) => this.adapter.adapt(user))),
      catchError(() => EMPTY),
    )
  }
}
