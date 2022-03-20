interface User {
  token?: string | null;
  authenticated?: boolean | null;
  authenticating?: boolean | null;
  error?: any;
}

export { User };
