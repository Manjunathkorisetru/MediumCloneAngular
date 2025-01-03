import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { BackendErrorsInterface } from '../../../auth/types/backendErrors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-backend-errors',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessagesComponent {
  @Input('backendErrors') backendErrors: BackendErrorsInterface = {};
  errorMessages: string[] = [];

  npOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name) => {
      const messages = this.backendErrors[name].join(', ');
      return `${name} ${messages}`;
    });
  }
}
