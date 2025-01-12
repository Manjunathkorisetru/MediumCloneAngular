import { inject } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { feedActions } from './actions';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedService } from '../services/feed.service';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({ feed });
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
