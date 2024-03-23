import { createFeature, createReducer } from '@ngrx/store'
import { UserInterface } from '../types/user.interface'

const userFeatureKey = 'users'

interface State {
  users: UserInterface[]
  loading: boolean
}

const initialState = {
  users: [],
  loading: false,
}

const reducer = createReducer({
  initialState,
})

export const usersFeature = createFeature({
  name: userFeatureKey,
  reducer,
})
