import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { provideRouterStore } from '@ngrx/router-store'

import { metaReducers, reducers } from './reducers'
import * as usersEffects from './users/data-access/store/users.effects'
import * as createUserEffect from './users/data-access/store/users.effects'
import * as removeUserEffect from './users/data-access/store/users.effects'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore(reducers, { metaReducers }),
    provideEffects(usersEffects, createUserEffect, removeUserEffect),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
}
