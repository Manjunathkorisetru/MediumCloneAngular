import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { currentUserInterface } from '../../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { CurrentUserRequestInterface } from '../../../shared/types/currentUserRequest.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: currentUserInterface }>(),
    'Register Failure': props<{ errors: BackendErrorsInterface }>(),
    Login: props<{ request: LoginRequestInterface }>(),
    'Login Success': props<{ currentUser: currentUserInterface }>(),
    'Login Failure': props<{ errors: BackendErrorsInterface }>(),
    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ currentUser: currentUserInterface }>(),
    'Get Current User Failure': props<{ errors: BackendErrorsInterface }>(),

    'Update Current User': props<{
      currentUserRequest: CurrentUserRequestInterface;
    }>(),
    'Update Current User Success': props<{
      currentUser: currentUserInterface;
    }>(),
    'Update Current User Failure': props<{ errors: BackendErrorsInterface }>(),
    Logout: emptyProps(),
  },
});
