import { currentUserInterface } from './currentUser.interface';

export interface CurrentUserRequestInterface {
  user: currentUserInterface & { password: string };
}
