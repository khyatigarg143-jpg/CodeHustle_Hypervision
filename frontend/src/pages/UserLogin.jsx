import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import TerminalInput from '../components/TerminalInput';
import CyberButton from '../components/CyberButton';
import { authService } from '../services/api';

export default function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ sapId: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('> AWAITING INPUT');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.sapId.trim()) {
      errs.sapId = 'REQUIRED FIELD MISSING';
    } else if (!/^[0-9]{6,12}$/.test(formData.sapId.trim())) {
      errs.sapId = 'SAP ID MUST BE 6-12 NUMERIC DIGITS';
    }

    if (!formData.password) {
      errs.password = 'PASSWORD IS REQUIRED';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('> ERROR: INVALID OPERATIVE CREDENTIALS');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setLoading(true);
    setStatus('> INITIATING HANDSHAKE...');

    try {
      const res = await authService.loginStudent(formData);
      setStatus(`> AUTH_SUCCESS // REF: ${res.reference || '0xCH11-AUTH'}`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 900);
    } catch (err) {
      setStatus(`> BREACH_DENIED: ${err.message || 'AUTHENTICATION_FAILED'}`);
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
      pageTitle="ENTER THE SYSTEM"
      pageSubtitle="Student identity verification."
      sectionKicker="> IDENTITY VERIFICATION"
      formMode="STUDENT CREDENTIALS"
      protocol="SAP ID / PASSWORD"
      routeLabel="USERLOGIN"
    >
      <form onSubmit={handleSubmit} noValidate className={shake ? 'shake' : ''}>
        <div className="space-y-3">
          <TerminalInput
            id="sapId"
            name="sapId"
            label="SAP ID"
            placeholder="e.g. 500123456"
            value={formData.sapId}
            onChange={handleChange}
            error={errors.sapId}
            required
            autoComplete="username"
            inputMode="numeric"
          />

          <TerminalInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter security passcode"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <CyberButton loading={loading} loadingText="VERIFYING...">
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
          <span>NEED AN IDENTITY?</span>
          <Link
            to="/Indiregi"
            className="text-[#dc2626] hover:text-[#ef4444] transition-colors underline underline-offset-4 tracking-wider"
          >
            ENROLL AS INDIVIDUAL &gt;
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
