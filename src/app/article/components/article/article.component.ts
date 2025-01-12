import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';
import { selectCurrentUser } from '../../../auth/components/store/reducers';
import { ErrorMessageComponent } from '../../../shared/components/errorMessage/errorMessage.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { TagListComponent } from '../../../shared/components/tagList/tagList.component';
import { currentUserInterface } from '../../../shared/types/currentUser.interface';

import { articleActions } from '../../store/actions';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TagListComponent,
    ErrorMessageComponent,
    LoadingComponent,
    RouterLink,
  ],
})
export class ArticleComponent implements OnInit {
  slug: string;
  isAuthor$;
  data$;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.isAuthor$ = combineLatest({
      article: this.store.select(selectArticleData),
      currentUser: this.store
        .select(selectCurrentUser)
        .pipe(
          filter(
            (currentUser): currentUser is currentUserInterface | null =>
              currentUser !== undefined
          )
        ),
    }).pipe(
      map(({ article, currentUser }) => {
        if (!article || !currentUser) {
          return false;
        }
        return article.author.username === currentUser.username;
      })
    );

    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticleData),
      isAuthor: this.isAuthor$,
    });
  }

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
