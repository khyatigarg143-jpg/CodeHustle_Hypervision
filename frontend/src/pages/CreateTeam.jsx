import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import TerminalInput from '../components/TerminalInput';
import CyberButton from '../components/CyberButton';
import { authService } from '../services/api';

export default function CreateTeam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    sapId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('> AWAITING SQUAD MANIFEST');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.teamName.trim()) {
      errs.teamName = 'TEAM NAME IS REQUIRED';
    }

    if (!formData.leaderName.trim()) {
      errs.leaderName = 'LEADER NAME IS REQUIRED';
    } else if (!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(formData.leaderName.trim())) {
      errs.leaderName = 'ENTER A VALID NAME (LETTERS ONLY)';
    }

    if (!formData.sapId.trim()) {
      errs.sapId = 'LEADER SAP ID IS REQUIRED';
    } else if (!/^[0-9]{6,12}$/.test(formData.sapId.trim())) {
      errs.sapId = 'SAP ID MUST BE 6-12 NUMERIC DIGITS';
    }

    if (!formData.email.trim()) {
      errs.email = 'CONTACT EMAIL IS REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      errs.email = 'INVALID EMAIL FORMAT';
    }

    if (!formData.password) {
      errs.password = 'PASSWORD IS REQUIRED';
    } else if (formData.password.length < 6) {
      errs.password = 'PASSWORD MUST BE AT LEAST 6 CHARACTERS';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'PLEASE CONFIRM YOUR PASSWORD';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'PASSWORDS DO NOT MATCH';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('> ERROR: INCOMPLETE SQUAD SPECIFICATION');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setLoading(true);
    setStatus('> REGISTERING CELL CLUSTER...');

    try {
      const res = await authService.registerTeam(formData);
      setStatus(`> UNIT_DEPLOYED // ID: ${res.reference || 'CH11-TEAM'}`);
      setTimeout(() => {
        navigate('/team-login');
      }, 1200);
    } catch (err) {
      setStatus(`> REJECTION_ALERT: ${err.message || 'TEAM_INIT_FAILED'}`);
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
      pageTitle="FORM A NEW UNIT"
      pageSubtitle="Initialize a team registration request."
      sectionKicker="> NEW TEAM REGISTRATION"
      formMode="TEAM INITIALIZATION"
      protocol="TEAM / LEADER / CONTACT"
      routeLabel="CREATE-TEAM"
    >
      <form onSubmit={handleSubmit} noValidate className={shake ? 'shake' : ''}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3.5 gap-y-2">
          <TerminalInput
            id="teamName"
            name="teamName"
            label="Squad / Team Name"
            placeholder="Choose an operative unit name"
            value={formData.teamName}
            onChange={handleChange}
            error={errors.teamName}
            required
            autoComplete="off"
            className="sm:col-span-2"
          />

          <TerminalInput
            id="leaderName"
            name="leaderName"
            label="Team Leader Name"
            placeholder="Full name as per university"
            value={formData.leaderName}
            onChange={handleChange}
            error={errors.leaderName}
            required
            autoComplete="name"
          />

          <TerminalInput
            id="sapId"
            name="sapId"
            label="Leader SAP ID"
            placeholder="6–12 digit SAP ID"
            value={formData.sapId}
            onChange={handleChange}
            error={errors.sapId}
            required
            autoComplete="username"
            inputMode="numeric"
          />

          <TerminalInput
            id="email"
            name="email"
            type="email"
            label="Contact Email"
            placeholder="leader@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="email"
            className="sm:col-span-2"
          />

          <TerminalInput
            id="password"
            name="password"
            type="password"
            label="Create Squad Passcode"
            placeholder="Passcode for squad login"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="new-password"
            className="sm:col-span-2"
          />

          <TerminalInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Passcode"
            placeholder="Repeat squad passcode"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
            className="sm:col-span-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <CyberButton loading={loading} loadingText="DEPLOYING...">
            INITIALIZE TEAM
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
          <span>ALREADY HAVE A TEAM?</span>
          <Link
            to="/team-login"
            className="text-[#dc2626] hover:text-[#ef4444] transition-colors underline underline-offset-4 tracking-wider"
          >
            TEAM LOGIN &gt;
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
