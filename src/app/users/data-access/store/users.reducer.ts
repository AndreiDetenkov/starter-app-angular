import { createFeature, createReducer, on } from '@ngrx/store'

import { UserInterface } from '../types/user.interface'
import { usersActions } from './users.actions'

const userFeatureKey = 'users'

interface State {
  users: UserInterface[]
  loading: boolean
}

const initialState: State = {
  users: [],
  loading: false,
}

const reducer = createReducer(
  initialState,
  on(usersActions.getUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(usersActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(usersActions.getUsersFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(usersActions.createUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(usersActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map((currentUser) => (user.id === currentUser.id ? user : currentUser)),
  })),
  on(usersActions.removeUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),
  on(usersActions.setUsers, (state, { users }) => ({
    ...state,
    users,
  })),
)

export const usersFeature = createFeature({
  name: userFeatureKey,
  reducer,
})
