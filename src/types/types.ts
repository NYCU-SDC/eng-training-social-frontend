export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};
