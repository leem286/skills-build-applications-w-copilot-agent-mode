import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi('leaderboard')
      .then(setEntries)
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
