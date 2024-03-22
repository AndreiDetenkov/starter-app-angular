import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { UserInterface } from './types/user.interface'

@Injectable()
export class UsersService {
  private _users$: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([])

  public readonly users$: Observable<UserInterface[]> = this._users$.asObservable()

  setUsers(users: UserInterface[]) {
    this._users$.next(users)
  }

  get getUsers(): UserInterface[] {
    return this._users$.getValue()
  }

  removeUserById(id: number): void {
    const filteredUsers: UserInterface[] = this.getUsers.filter(
      (user: UserInterface) => user.id !== id,
    )

    this._users$.next(filteredUsers)
  }

  addUser(user: UserInterface): void {
    this._users$.next([...this.getUsers, user])
  }

  updateUser(user: UserInterface): void {
    const updatedUsers: UserInterface[] = this.getUsers.map((currentUser: UserInterface) =>
      currentUser.id === user.id ? user : currentUser,
    )

    this._users$.next(updatedUsers)
  }
}
