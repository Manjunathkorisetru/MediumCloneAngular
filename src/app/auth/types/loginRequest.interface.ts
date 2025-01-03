export interface LoginRequestInterface {
  user: {
    email: string | null | undefined;
    password: string | null | undefined;
    username?: string | null | undefined;
  };
}
