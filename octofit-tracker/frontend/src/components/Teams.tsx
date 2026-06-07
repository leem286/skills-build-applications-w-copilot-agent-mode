import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi('teams')
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team.id || team._id || team.name}>
            <strong>{team.name}</strong> — {team.focus} — {team.members} members
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
