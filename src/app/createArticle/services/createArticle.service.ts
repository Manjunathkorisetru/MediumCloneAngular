import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';

    return this.http
      .post<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
