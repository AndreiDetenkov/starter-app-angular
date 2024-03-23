import { catchError, EMPTY, Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { UserResponseInterface } from './types/user-response.interface'
import { environment } from '../../../environments/environment.development'
import { UserInterface } from './types/user.interface'

@Injectable({
  providedIn: 'root',
})
export class UsersClientService {
  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<UserInterface[]> {
    const url = `${environment.apiUrl}/users`

    return this.http.get<UserResponseInterface[]>(url).pipe(
      catchError((error) => {
        console.error(error)
        return EMPTY
      }),
    )
  }
}
