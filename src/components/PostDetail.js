// src/pages/PostDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError('Erro ao carregar o post.');
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <h2 className='pt-3 text-center'>Comentários</h2>
      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetail;