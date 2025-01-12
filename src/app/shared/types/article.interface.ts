import { PopularTagType } from './popularTag.type';

export interface ArticleInterface {
  title: string;
  slug: string;
  body: string;
  favorited: boolean;
  favoritesCount: number;
  createdAt: string;
  updatedAt: string;
  tagList: PopularTagType[];
  description: string;
  author: {
    username: string;
    bio: string | null;
    image: string;
    following: boolean;
  };
}
