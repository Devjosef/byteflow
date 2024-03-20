// Define a type for a single comment
export interface Comment {
  id: number | string;
  postId: number | string; // ID of the post this comment belongs to
  author: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes: Likes; // Array of likes for the comment
}

// Define a type for an array of comments
export type Comments = Comment[];

// Define a type for a single like on a post or comment
export interface Like {
  id: number | string;
  postId?: number | string; // ID of the post this like belongs to (optional, for likes on posts)
  commentId?: number | string; // ID of the comment this like belongs to (optional, for likes on comments)
  userId: number | string; // ID of the user who liked the post/comment
  createdAt?: Date;
}

// Define a type for an array of likes
export type Likes = Like[];
