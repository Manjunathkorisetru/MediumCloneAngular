import { currentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from './backendErrors.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: currentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
