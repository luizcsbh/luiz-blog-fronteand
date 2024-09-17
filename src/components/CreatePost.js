import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importar o CSS do Quill

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está autenticado e é admin
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login'); // Redireciona para a página de login se não estiver autenticado
      return;
    }

    // Verificar se o usuário é admin (decodificar o token ou fazer requisição ao backend)
    const checkAdmin = async () => {
      try {
        const response = await axios.get('/api/auth/check-admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.data.isAdmin) {
          navigate('/unauthorized'); // Redireciona se o usuário não for admin
        }
      } catch (error) {
        console.error('Erro ao verificar perfil admin:', error);
        navigate('/login'); // Redireciona para login se houver erro na verificação
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const newPost = { title, content };

      // Enviar o token no cabeçalho para o backend
      await axios.post('http://localhost:5001/api/posts', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/blog'); // Redireciona para a página de blog após criar o post
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setError('Ocorreu um erro ao tentar criar o post. Tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Criar Novo Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label id="title" className="form-label">Título:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label id="content" className="form-label">Conteúdo:</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={CreatePost.modules}
            formats={CreatePost.formats}
            theme="snow"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Criar Post</button>
      </form>
    </div>
  );
};

CreatePost.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

CreatePost.formats = [
  'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
  'align', 'link', 'image'
];

export default CreatePost;