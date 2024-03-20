import React, { useState } from 'react';
import { Comment } from '@/types';
import { supabase } from '@supabase/supabase-js'

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [likedComments, setLikedComments] = useState<string[]>([]);

  const handleLike = async (commentId: string) => {
    try {
      const alreadyLiked = likedComments.includes(commentId);

      if (alreadyLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('commentId', commentId)
          .eq('userId', supabase.auth.user()?.id);
      } else {
        await supabase.from('likes').insert([
          { commentId, userId: supabase.auth.user()?.id },
        ]);
      }

      // Update likedComments state to reflect changes
      setLikedComments((prevLikedComments) =>
        alreadyLiked
          ? prevLikedComments.filter((id) => id !== commentId)
          : [...prevLikedComments, commentId]
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      // Display error message to user or handle error gracefully
    }
  };

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.content}</p>
          <p>By: {comment.author}</p>
          <p>Likes: {comment.likes.length}</p>
          <button onClick={() => handleLike(String(comment.id))}>
            {likedComments.includes(String(comment.id)) ? 'Unlike' : 'Like'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;




