import { createReducer, on } from '@ngrx/store';
import { createFeature } from '@ngrx/store';
import { authActions } from './actions';

import { currentUserInterface } from '../../../shared/types/currentUser.interface';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: {
  isSubmitting: boolean;
  isLoading: boolean;
  currentUser: currentUserInterface | null;
  validationErrors: any;
} = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: null,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectValidationErrors,
  selectCurrentUser,
} = authFeature;
