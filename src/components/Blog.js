import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/posts');
        const data = response.data;

        // Verifique se o dado recebido é um array e se os objetos possuem as propriedades esperadas
        if (Array.isArray(data) && data.every(post => post._id && post.title && post.createdAt)) {
          setPosts(data);
        } else {
          setError('Dados inválidos recebidos do servidor.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setError('Erro ao carregar posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>{error}</p>;
  if (!posts.length) return <p>Nenhum post encontrado.</p>;

  // Agrupar posts por ano e mês
  const postsByYearAndMonth = posts.reduce((acc, post) => {
    const date = new Date(post.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, '0'); // Garante que o dia tenha dois algarismos

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push({ ...post, day });
    return acc;
  }, {});

  // Ordenar os anos de forma decrescente
  const sortedYears = Object.keys(postsByYearAndMonth).sort((a, b) => b - a);

  return (
    <div>
      <h1 className="text-center">Artigos</h1>
      {sortedYears.map((year, yearIndex, yearArr) => (
        <div key={year}>
          <h2>{year}</h2>
          {Object.keys(postsByYearAndMonth[year]).map((month, monthIndex, monthArr) => (
            <div key={month}>
              <ul>
                {postsByYearAndMonth[year][month].map((post, index, arr) => (
                  <React.Fragment key={post._id}>
                    <li style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>
                      <Link 
                        to={`/posts/${post._id}`} 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {post.title}
                      </Link>
                      <span>{`${month} ${post.day}`}</span>
                    </li>
                    {/* Adiciona um hr entre posts de dias diferentes, exceto se for o último post */}
                    {index < arr.length - 1 && post.day !== arr[index + 1].day && <hr />}
                  </React.Fragment>
                ))}
                {/* Adiciona um hr entre meses diferentes, exceto se for o último mês */}
                {monthIndex < monthArr.length - 1 && <hr />}
              </ul>
            </div>
          ))}
          {/* Adiciona um hr entre anos diferentes, exceto se for o último ano */}
          {yearIndex < yearArr.length - 1 }
        </div>
      ))}
    </div>
  );
};

export default Blog;