import React from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>Modern multi-tier fitness tracking with React 19, Vite, Express, TypeScript, and MongoDB.</p>
        <p className="api-note">API base URL: <code>{apiBaseUrl}</code></p>
        <p className="env-note">
          {codespaceName
            ? `Codespaces mode active for ${codespaceName}.`
            : 'VITE_CODESPACE_NAME is unset. Using localhost fallback. Define VITE_CODESPACE_NAME in .env.local to enable Codespaces URLs.'}
        </p>
      </header>

      <nav>
        <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>Users</NavLink>
        <NavLink to="/teams" className={({ isActive }) => (isActive ? 'active' : '')}>Teams</NavLink>
        <NavLink to="/activities" className={({ isActive }) => (isActive ? 'active' : '')}>Activities</NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')}>Leaderboard</NavLink>
        <NavLink to="/workouts" className={({ isActive }) => (isActive ? 'active' : '')}>Workouts</NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
