import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  
  const [repository, setRepository] = useState([]);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => setRepository(response.data));
  }, [])

  async function handleAddRepository(e) {
    e.preventDefault();

    const response = await api.post('repositories', {
      title,
      owner,
      url
    })

    setRepository([...repository, response.data]);
    setTitle('');
    setOwner('');
    setUrl('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repository.filter(repo => repo.id !== id));
  }

  return (
    <>
      <form id="add-product-form" onSubmit={handleAddRepository}>
        <span>Titulo do projeto</span>
        <input type="text" value={title} placeholder="Insira o titulo do projeto" required onChange={(e)=> setTitle(e.target.value)}/>
        
        <span>Dono do projeto</span>
        <input type="text" value={owner} placeholder="Insira o nome do Dono do projeto" required onChange={(e)=> setOwner(e.target.value)}/>

        <span>URL do projeto</span>
        <input type="text" value={url} placeholder="Insira a URL do projeto" required onChange={(e)=> setUrl(e.target.value)}/>

        <button type="submit">Adicionar</button>
      </form>
    
      <div id="container-repository">
        <ul data-testid="repository-list">
          {repository && repository.map(repo => (
            <li key={repo.id}>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.title}</a>

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>      
      </div>
    </>
  );
}

export default App;
