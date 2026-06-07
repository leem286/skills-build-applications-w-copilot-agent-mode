import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams`
      : 'http://localhost:8000/api/teams';

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        setTeams(Array.isArray(payload) ? payload : payload.teams || payload.data || payload.results || []);
      })
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
