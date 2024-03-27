import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { User } from '../models/user'

export const usersActions = createActionGroup({
  source: 'users',
  events: {
    getUsers: emptyProps(),
    getUsersSuccess: props<{ users: User[] }>(),
    getUsersFailure: emptyProps(),

    createUser: props<{ user: User }>(),

    updateUser: props<{ user: User }>(),

    removeUser: props<{ id: number }>(),

    setUsers: props<{ users: User[] }>(),
  },
})
