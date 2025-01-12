import { BackendErrorsInterface } from '../../auth/types/backendErrors.interface';

export interface SettingsStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
