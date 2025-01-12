import { createActionGroup, emptyProps } from '@ngrx/store';
import { props } from '@ngrx/store';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    'Get Feed': props<{ url: string }>(),
    'Get Feed Success': props<{ feed: GetFeedResponseInterface }>(),
    'Get Feed Failure': emptyProps(),
  },
});
