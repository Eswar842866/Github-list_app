import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    axios
      .get('https://api.github.com/users')  
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching users');
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="App">
      <h1>GitHub User List</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <h2>{user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
