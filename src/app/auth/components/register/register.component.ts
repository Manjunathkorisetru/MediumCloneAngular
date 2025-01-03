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
  selector: 'mc-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
  //styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
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
    const { username, email, password } = this.form.value;
    this.store.dispatch(
      authActions.register({ request: { user: { username, email, password } } })
    );
    this.authService
      .register({
        user: { username, email, password },
      })
      .subscribe((res: any) => console.log('Response:', res));
  }
}
