import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Params, RouterLink } from '@angular/router';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tagList/tagList.component';
import { AddToFavoritesComponent } from '../addToFavorites/addToFavorites.component';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,
  ],
  //styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit, OnChanges {
  data$;
  baseUrl: string;
  currentPage: number = 0;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeedData),
    });
    this.baseUrl = this.router.url.split('?')[0];
  }

  limit = environment.limit;
  @Input() apiUrl: string = '';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.currentPage = Number(params['params']['page'] || '1');
      this.fetchData();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].previousValue !== changes['apiUrl'].currentValue;

    if (isApiUrlChanged) {
      this.fetchData();
    }
  }

  fetchData(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
