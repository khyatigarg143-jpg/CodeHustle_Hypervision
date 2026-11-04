import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import TerminalInput from '../components/TerminalInput';
import CyberButton from '../components/CyberButton';
import { authService } from '../services/api';

export default function TeamLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ teamId: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('> AWAITING TEAM IDENTIFIER');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.teamId.trim()) {
      errs.teamId = 'TEAM ID OR TEAM NAME IS REQUIRED';
    }
    if (!formData.password) {
      errs.password = 'TEAM PASSWORD IS REQUIRED';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('> ERROR: INVALID TEAM CREDENTIALS');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setLoading(true);
    setStatus('> VERIFYING CELL CREDENTIALS...');

    try {
      const res = await authService.loginTeam(formData);
      setStatus(`> SQUAD_CONFIRMED // NODE: ${res.reference || 'CH11-SQUAD'}`);
      setTimeout(() => {
        navigate('/team-dashboard');
      }, 900);
    } catch (err) {
      setStatus(`> BREACH_DENIED: ${err.message || 'TEAM_ACCESS_REJECTED'}`);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <AuthLayout
      pageTitle="TEAM ACCESS"
      pageSubtitle="Authenticate your registered team squad."
      sectionKicker="> TEAM AUTHENTICATION"
      formMode="TEAM CREDENTIALS"
      protocol="TEAM ID / PASSWORD"
      routeLabel="TEAM-LOGIN"
    >
      <form onSubmit={handleSubmit} noValidate className={shake ? 'shake' : ''}>
        <div className="space-y-3">
          <TerminalInput
            id="teamId"
            name="teamId"
            label="Team Identifier / Code"
            placeholder="e.g. FSOCIETY_NODE_09"
            value={formData.teamId}
            onChange={handleChange}
            error={errors.teamId}
            required
            autoComplete="username"
          />

          <TerminalInput
            id="password"
            name="password"
            type="password"
            label="Squad Security Passcode"
            placeholder="Enter squad password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <CyberButton loading={loading} loadingText="ACCESSING...">
            AUTHENTICATE
          </CyberButton>

          <div
            className="flex-1 text-[10px] tracking-wider text-[#9c958e] font-mono py-1 select-none overflow-hidden text-ellipsis whitespace-nowrap"
            role="status"
            aria-live="polite"
          >
            <span>{status}</span>
            <span className="text-[#dc2626] font-bold animate-blink">_</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-[#78716c] font-mono mt-5 pt-3 border-t border-[#292522]">
          <span>FORMING A NEW SQUAD?</span>
          <Link
            to="/create-team"
            className="text-[#dc2626] hover:text-[#ef4444] transition-colors underline underline-offset-4 tracking-wider"
          >
            INITIALIZE TEAM &gt;
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
