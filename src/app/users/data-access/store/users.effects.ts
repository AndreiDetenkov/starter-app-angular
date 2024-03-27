import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs'
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
    storageService = inject(StorageService),
  ) =>
    actions$.pipe(
      ofType(usersActions.getUsers),
      exhaustMap(() =>
        usersClientService.fetchUsers().pipe(
          map((users: User[]) => {
            storageService.set('users', users)
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
    notifyService = inject(NotifyService),
    storageService = inject(StorageService),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(usersActions.createUser),
      switchMap(() =>
        store
          .select(usersFeature.selectUsers)
          .pipe(map((users) => storageService.set('users', users))),
      ),
      tap(() => notifyService.success('User created!')),
    ),
  { functional: true, dispatch: false },
)

export const updateUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    notifyService = inject(NotifyService),
    storageService = inject(StorageService),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(usersActions.updateUser),
      switchMap(() =>
        store
          .select(usersFeature.selectUsers)
          .pipe(map((users) => storageService.set('users', users))),
      ),
      tap(() => notifyService.success('User updated!')),
    ),
  { functional: true, dispatch: false },
)

export const removeUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    notifyService = inject(NotifyService),
    storageService = inject(StorageService),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(usersActions.removeUser),
      switchMap(() =>
        store
          .select(usersFeature.selectUsers)
          .pipe(map((users) => storageService.set('users', users))),
      ),
      tap(() => notifyService.success('User removed!')),
    ),
  { functional: true, dispatch: false },
)
