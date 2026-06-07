import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi('workouts')
      .then(setWorkouts)
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
