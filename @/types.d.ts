// types.d.ts
export interface Post {
  id: number | string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
  