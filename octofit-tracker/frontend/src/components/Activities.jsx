import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';
    const endpoint = `${baseUrl}/activities`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => {
        setActivities(Array.isArray(payload) ? payload : payload.activities || payload.data || payload.results || []);
      })
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
