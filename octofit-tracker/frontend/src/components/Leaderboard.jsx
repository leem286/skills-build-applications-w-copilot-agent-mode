import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
      : 'http://localhost:8000/api/leaderboard';

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        setEntries(Array.isArray(payload) ? payload : payload.leaderboard || payload.data || payload.results || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry.userId || entry._id || entry.name}>
            <strong>{entry.name}</strong> — {entry.score} points
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
