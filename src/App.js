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
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repository.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <form onSubmit={handleAddRepository}>
        <span>Titulo do projeto</span>
        <input type="text" placeholder="Insira o titulo do projeto" onChange={(e)=> setTitle(e.target.value)}/>
        
        <span>Dono do projeto</span>
        <input type="text" placeholder="Insira o nome do Dono do projeto" onChange={(e)=> setOwner(e.target.value)}/>

        <span>URL do projeto</span>
        <input type="text" placeholder="Insira a URL do projeto" onChange={(e)=> setUrl(e.target.value)}/>

        <button type="submit">Adicionar</button>
      </form>
      <ul data-testid="repository-list">
        {repository && repository.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
