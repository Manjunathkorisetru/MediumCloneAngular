import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, Subscription } from 'rxjs';
import { authActions } from '../../../auth/components/store/actions';
import { selectCurrentUser } from '../../../auth/components/store/reducers';
import { BackendErrorMessagesComponent } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
import { currentUserInterface } from '../../../shared/types/currentUser.interface';
import { CurrentUserRequestInterface } from '../../../shared/types/currentUserRequest.interface';

import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorMessagesComponent,
    CommonModule,
  ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form;
  currentUser?: currentUserInterface;
  data$;
  currentUserSubscription?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.nonNullable.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    });
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username ?? '',
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email ?? '',
      password: '',
    });
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
