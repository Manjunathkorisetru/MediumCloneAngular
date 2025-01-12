import { Component } from '@angular/core';
import { FeedComponent } from '../../shared/components/feed/feed.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { PopularTagsComponent } from '../../shared/components/popularTags/popularTags.component';
import { FeedTogglerComponent } from '../../shared/components/feedToggler/feedToggler.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-global-feed',
  templateUrl: './globalFeed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
    CommonModule,
  ],
  //styleUrls: ["./globalFeed.component.scss"]
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
  constructor() {}
}
