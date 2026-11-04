import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import TerminalInput from '../components/TerminalInput';
import CyberButton from '../components/CyberButton';
import { authService } from '../services/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rootPin: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('> ROOT GATEWAY ARMED');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = 'ADMINISTRATOR EMAIL IS REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      errs.email = 'INVALID EMAIL FORMAT';
    }

    if (!formData.password) {
      errs.password = 'ROOT PASSCODE IS REQUIRED';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('> ERROR: ROOT ACCESS REJECTED');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setLoading(true);
    setStatus('> VALIDATING ROOT PRIVILEGES...');

    try {
      const res = await authService.loginAdmin({
        email: formData.email,
        password: formData.password,
      });
      setStatus(`> ROOT_AUTHORIZED // TOKEN: ${res.reference || 'ROOT-CH11'}`);
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 900);
    } catch (err) {
      setStatus(`> BREACH_ALERT: ${err.message || 'UNAUTHORIZED_ATTEMPT_LOGGED'}`);
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
      pageTitle="RESTRICTED ACCESS"
      pageSubtitle="Strictly authorized administrators only. Monitored terminal."
      sectionKicker="> PRIVILEGED ACCESS GATE"
      formMode="ADMIN CREDENTIALS"
      protocol="ADMIN EMAIL / PASSWORD"
      routeLabel="ADMIN-LOGIN"
    >
      <form onSubmit={handleSubmit} noValidate className={shake ? 'shake' : ''}>
        <div className="border border-[#7f1d1d]/40 bg-[#160a0a]/60 px-3 py-2 mb-4 text-[9px] text-[#fca5a5] flex items-center justify-between">
          <span>CLASSIFIED SYSTEM // AUDIT LOG ENABLED</span>
          <span className="text-[#dc2626] font-bold">LEVEL-0</span>
        </div>

        <div className="space-y-3">
          <TerminalInput
            id="email"
            name="email"
            type="email"
            label="Administrator Email"
            placeholder="admin@hypervision.org"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="username"
          />

          <TerminalInput
            id="password"
            name="password"
            type="password"
            label="Root Security Passcode"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <CyberButton loading={loading} loadingText="VERIFYING ROOT...">
            VERIFY ADMIN
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
      </form>
    </AuthLayout>
  );
}
