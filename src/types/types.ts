export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  followMe: {
    follow: boolean;
  };
};

export type AccessToken = {
  ID: string;
  FullName: string;
  Email: string;
  iss: string;
  sub: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: string;
};

export type AuthCookie = {
  accessToken: string;
  refreshToken: string;
  expirationTime: number;
};
