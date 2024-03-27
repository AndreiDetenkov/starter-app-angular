import { catchError, exhaustMap, map, of, tap, withLatestFrom } from 'rxjs'
import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'

import { UsersClientService } from '../services/users-client.service'
import { usersActions } from './users.actions'
import { User } from '../models/user'
import { NotifyService } from '../../../shared/services/notify.service'
import { StorageService } from '../../../shared/services/storage.service'
import { usersFeature } from './users.reducer'

export const getUsersEffect = createEffect(
  (
    actions$ = inject(Actions),
    usersClientService = inject(UsersClientService),
    storage = inject(StorageService),
  ) =>
    actions$.pipe(
      ofType(usersActions.getUsers),
      exhaustMap(() =>
        usersClientService.fetchUsers().pipe(
          map((users: User[]) => {
            storage.set('users', users)
            return usersActions.getUsersSuccess({ users })
          }),
          catchError(() => {
            return of(usersActions.getUsersFailure())
          }),
        ),
      ),
    ),
  { functional: true },
)

export const createUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    notify = inject(NotifyService),
    storage = inject(StorageService),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(usersActions.createUser),
      withLatestFrom(store.select(usersFeature.selectUsers)),
      map(([_, users]) => storage.set('users', users)),
      tap(() => notify.open('User created!', 'Close')),
    ),
  { functional: true, dispatch: false },
)

export const updateUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    notify = inject(NotifyService),
    storage = inject(StorageService),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(usersActions.updateUser),
      withLatestFrom(store.select(usersFeature.selectUsers)),
      map(([_, users]) => storage.set('users', users)),
      tap(() => notify.open('User updated!', 'Close')),
    ),
  { functional: true, dispatch: false },
)

export const removeUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    notify = inject(NotifyService),
    storage = inject(StorageService),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(usersActions.removeUser),
      withLatestFrom(store.select(usersFeature.selectUsers)),
      map(([_, users]) => storage.set('users', users)),
      tap(() => notify.open('User removed!', 'Close')),
    ),
  { functional: true, dispatch: false },
)
