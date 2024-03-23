import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { usersFeature } from '../users/data-access/store/users.reducer'

export interface State {}

export const reducers: ActionReducerMap<State> = {
  users: usersFeature.reducer,
}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : []
