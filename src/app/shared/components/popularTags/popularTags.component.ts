import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$;
  constructor(private store: Store) {
    this.data$ = combineLatest({
      popularTags: this.store.select(selectPopularTagsData),
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
