import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';
    const endpoint = `${baseUrl}/workouts`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        setWorkouts(Array.isArray(payload) ? payload : payload.workouts || payload.data || payload.results || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id || workout._id || workout.title}>
            <strong>{workout.title}</strong> — {workout.durationMinutes} min — {workout.focus}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
