import React from 'react';
import { useRouter } from 'next/router';
import { Post } from '@/types';
import PostEditForm from '../components/PostEditForm';

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const postId = router.query.id as string;

  const post: Post = {
    id: postId,
    title: 'Sample Title',
    content: 'Sample Content',
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <PostEditForm post={post} />
    </div>
  );
};

export default EditPostPage;
