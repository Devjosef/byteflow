// Implement Like Functionality
// Add a like button component to each comment in the `CommentList` component.
// Implement logic to handle like/unlike actions in the frontend.
// Use Supabase queries to update the likes count in the database when a like/unlike action occurs.
// Code example:
// LikeButton.tsx

import React, { useState } from 'react';
import { Like } from '@/types';

interface LikeButtonProps {
  commentId: number;
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ commentId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    // Logic to send like/unlike action to the backend and update likes count
    try {
      // Call Supabase API to increment/decrement likes for the comment
      // Update the likes count in the frontend state
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <button onClick={handleLike}>
      {likes} Likes
    </button>
  );
};

export default LikeButton;
