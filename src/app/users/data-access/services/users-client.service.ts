import { catchError, EMPTY, map, Observable } from 'rxjs'
import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { UserResponseInterface } from '../types/user-response.interface'
import { UserInterface } from '../types/user.interface'
import { API_URL } from '../../../app.config'

@Injectable({
  providedIn: 'root',
})
export class UsersClientService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private readonly url: string,
  ) {}

  fetchUsers(): Observable<UserInterface[]> {
    return this.http.get<UserResponseInterface[]>(this.url + '/users').pipe(
      map((users: Array<UserResponseInterface>) =>
        users.map((user: UserResponseInterface) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          website: user.website,
          company: user.company?.name || '',
        })),
      ),
      catchError((error) => {
        console.error(error)
        return EMPTY
      }),
    )
  }
}
