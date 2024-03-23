import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'

import { metaReducers, reducers } from './reducers'

import { routes } from './app.routes'

import { NotifyUseCase } from './shared/services/notify/notify.usecase'
import { NotifyService } from './shared/services/notify/notify.service'
import { GetUsersUseCase } from './users/data-access/get-users.usecase'
import { GetUsersService } from './users/data-access/get-users.service'
import { StorageService } from './shared/services/storage/storage.service'
import { StorageUseCase } from './shared/services/storage/storage.usecase'
import { provideRouterStore } from '@ngrx/router-store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: GetUsersUseCase,
      useClass: GetUsersService,
    },
    {
      provide: NotifyUseCase,
      useClass: NotifyService,
    },
    {
      provide: StorageUseCase,
      useClass: StorageService,
    },
    provideStore(reducers, { metaReducers }),
    provideEffects(),
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
