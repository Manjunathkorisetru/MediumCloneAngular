import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/components/store/reducers';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class FeedTogglerComponent {
  @Input() tagName?: string;

  currentUser$;
  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }
}
