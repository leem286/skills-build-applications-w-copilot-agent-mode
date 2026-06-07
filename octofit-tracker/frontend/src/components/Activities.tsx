import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi('activities')
      .then(setActivities)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id || activity._id || `${activity.type}-${activity.date}`}>
            <strong>{activity.type}</strong> — {activity.durationMinutes} min — {activity.caloriesBurned} kcal
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
