import { PopularTagType } from '../../../types/popularTag.type';

export interface PopularTagStateInterface {
  isLoading: boolean;
  error: string | null;
  data: PopularTagType[] | null;
}
