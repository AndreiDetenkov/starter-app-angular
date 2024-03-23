import { catchError, exhaustMap, map, of } from 'rxjs'
import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { UsersClientService } from '../users-client.service'
import { usersActions } from './users.actions'
import { UserInterface } from '../types/user.interface'

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
