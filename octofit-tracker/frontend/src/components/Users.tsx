import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi('users')
      .then(setUsers)
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
