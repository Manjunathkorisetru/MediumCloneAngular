import {Route} from '@angular/router'
import {provideState} from '@ngrx/store'
import {SettingsComponent} from './components/settings/settings.component'
import {settingsFeatureKey, settingsReducer} from './store/reducers'

export const routes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)],
  },
]
