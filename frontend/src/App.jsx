import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HypervisionRegister from './pages/HypervisionRegister';
import UserLogin from './pages/UserLogin';
import TeamLogin from './pages/TeamLogin';
import AdminLogin from './pages/AdminLogin';
import CreateTeam from './pages/CreateTeam';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      {/* Primary Landing & Registration matches reference specification */}
      <Route path="/" element={<HypervisionRegister />} />
      <Route path="/Indiregi" element={<HypervisionRegister />} />
      <Route path="/register" element={<HypervisionRegister />} />

      {/* Authentication Portals */}
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/team-login" element={<TeamLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/create-team" element={<CreateTeam />} />

      {/* Target redirect landings */}
      <Route
        path="/dashboard"
        element={<Dashboard title="STUDENT OPERATIVE TERMINAL" role="student" />}
      />
      <Route
        path="/team-dashboard"
        element={<Dashboard title="SQUAD NODE COMMAND" role="team" />}
      />
      <Route
        path="/admin/dashboard"
        element={<Dashboard title="SYSADMIN ROOT CONTROL" role="admin" />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
