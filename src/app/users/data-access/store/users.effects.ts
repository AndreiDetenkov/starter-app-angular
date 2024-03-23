import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs'
import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { UsersClientService } from '../services/users-client.service'
import { usersActions } from './users.actions'
import { UserInterface } from '../types/user.interface'
import { NotifyService } from '../../../shared/services/notify.service'
import { StorageService } from '../../../shared/services/storage.service'
import { Store } from '@ngrx/store'
import { usersFeature } from './users.reducer'

export const getUsersEffect = createEffect(
  (actions$ = inject(Actions), usersClientService = inject(UsersClientService)) => {
    return actions$.pipe(
      ofType(usersActions.getUsers),
      exhaustMap(() => {
        return usersClientService.fetchUsers().pipe(
          map((users: UserInterface[]) => usersActions.getUsersSuccess({ users })),
          catchError(() => {
            return of(usersActions.getUsersFailure())
          }),
        )
      }),
    )
  },
  { functional: true },
)

export const createUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    notifyService = inject(NotifyService),
    storageService = inject(StorageService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(usersActions.createUser),
      switchMap(() =>
        store
          .select(usersFeature.selectUsers)
          .pipe(map((users) => storageService.set('users', users))),
      ),
      tap(() => notifyService.success('User created!')),
    )
  },
  { functional: true, dispatch: false },
)

export const removeUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    notifyService = inject(NotifyService),
    storageService = inject(StorageService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(usersActions.removeUser),
      switchMap(() =>
        store
          .select(usersFeature.selectUsers)
          .pipe(map((users) => storageService.set('users', users))),
      ),
      tap(() => notifyService.success('User removed!')),
    )
  },
  { functional: true, dispatch: false },
)
