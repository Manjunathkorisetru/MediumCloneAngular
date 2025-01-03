import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from '../../../auth/components/store/reducers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class TopbarComponent {
  data$;
  constructor(private store: Store) {
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
    });
  }
}
