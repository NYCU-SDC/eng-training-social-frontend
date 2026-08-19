export type ReactionType = "LIKE" | "DISLIKE" | "NONE";

export type Reaction = {
  reaction: ReactionType;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  reactionMe: Reaction;
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  reactionMe: Reaction;
};
