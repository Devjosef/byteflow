import { Post } from '@/types';
import React from 'react';

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <div>
    <h2>Post List</h2>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {/* Render additional post details as needed */}
        </li>
      ))}
    </ul>
  </div>
);

export default PostList;
