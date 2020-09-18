import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepository(response.data));
  }, [])

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository && repository.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(1)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
