import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';
    const endpoint = `${baseUrl}/users`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        setUsers(Array.isArray(payload) ? payload : payload.users || payload.data || payload.results || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id || user._id || `${user.email}-${user.name}`}>
            <strong>{user.name}</strong> — {user.role} — {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
