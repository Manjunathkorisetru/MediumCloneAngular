import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { authActions } from '../store/actions';
import { RouterLink } from '@angular/router';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
@Component({
  selector: 'mc-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
  //styleUrls: ["./register.component.scss"],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  data$;

  constructor(
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthService
  ) {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors),
    });
  }
  onSubmit() {
    const { email, password } = this.form.value;
    this.store.dispatch(
      authActions.login({ request: { user: { email, password } } })
    );
    this.authService
      .login({
        user: { email, password },
      })
      .subscribe((res: any) => console.log('Response:', res));
  }
}
