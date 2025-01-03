import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../app/shared/components/topBar/topBar.component';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from './auth/components/store/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent],
  templateUrl: './app.component.html',
  styles: '',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.title = 'app';
    this.store.dispatch(authActions.getCurrentUser());
  }
  title = '';
}
