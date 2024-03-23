import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { UserInterface } from '../types/user.interface'

export const usersActions = createActionGroup({
  source: 'users',
  events: {
    getUsers: emptyProps(),
    getUsersSuccess: props<{ users: UserInterface[] }>(),
    getUsersFailure: emptyProps(),

    createUser: props<{ user: UserInterface }>(),
  },
})
