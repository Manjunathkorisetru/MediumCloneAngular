export interface RegisterRequestInterface {
  user: {
    username: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
  };
}
