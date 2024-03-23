import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { UsersClientService } from '../services/users-client.service'
import { usersActions } from './users.actions'
import { UserInterface } from '../types/user.interface'
import { NotifyService } from '../../../shared/services/notify.service'

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
  (actions$ = inject(Actions), notifyService = inject(NotifyService)) => {
    return actions$.pipe(
      ofType(usersActions.createUser),
      tap(() => notifyService.success('User created!')),
    )
  },
  { functional: true, dispatch: false },
)
