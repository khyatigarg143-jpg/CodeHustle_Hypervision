import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import TerminalInput from '../components/TerminalInput';
import CyberButton from '../components/CyberButton';
import { authService } from '../services/api';

export default function Indiregi() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    sapId: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('> AWAITING RECRUIT DETAILS');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'FULL NAME IS REQUIRED';
    } else if (!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(formData.fullName.trim())) {
      errs.fullName = 'ENTER A VALID NAME (LETTERS AND SPACES ONLY)';
    }

    if (!formData.sapId.trim()) {
      errs.sapId = 'SAP ID IS REQUIRED';
    } else if (!/^[0-9]{6,12}$/.test(formData.sapId.trim())) {
      errs.sapId = 'SAP ID MUST BE 6-12 NUMERIC DIGITS';
    }

    if (!formData.email.trim()) {
      errs.email = 'EMAIL ADDRESS IS REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      errs.email = 'INVALID EMAIL FORMAT';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'PHONE NUMBER IS REQUIRED';
    } else if (!/^[6-9][0-9]{9}$/.test(formData.phone.trim())) {
      errs.phone = 'ENTER A VALID 10-DIGIT MOBILE NUMBER';
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
      setStatus('> ERROR: VERIFY FORM REQUIREMENTS');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setLoading(true);
    setStatus('> COMMITTING PARTICIPANT RECORD...');

    try {
      const res = await authService.registerIndividual(formData);
      setStatus(`> REGISTRATION_SUCCESS // ID: ${res.reference || 'CH11-REG'}`);
      setTimeout(() => {
        navigate('/userlogin');
      }, 1200);
    } catch (err) {
      setStatus(`> REJECTION_ALERT: ${err.message || 'REGISTRATION_FAILED'}`);
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
      pageTitle="REGISTER YOUR IDENTITY"
      pageSubtitle="Create an individual participant profile."
      sectionKicker="> INDIVIDUAL REGISTRATION"
      formMode="PARTICIPANT DETAILS"
      protocol="NAME / SAP ID / EMAIL"
      routeLabel="INDIREGI"
    >
      <form onSubmit={handleSubmit} noValidate className={shake ? 'shake' : ''}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3.5 gap-y-2">
          <TerminalInput
            id="fullName"
            name="fullName"
            label="Full Name"
            placeholder="As per university records"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
            autoComplete="name"
          />

          <TerminalInput
            id="sapId"
            name="sapId"
            label="SAP ID"
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
            label="Email Address"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="email"
          />

          <TerminalInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            autoComplete="tel"
            inputMode="numeric"
          />

          <TerminalInput
            id="password"
            name="password"
            type="password"
            label="Create Passcode"
            placeholder="At least 6 characters"
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
            placeholder="Repeat passcode"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
            className="sm:col-span-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <CyberButton loading={loading} loadingText="ENROLLING...">
            REGISTER
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
          <span>ALREADY REGISTERED?</span>
          <Link
            to="/userlogin"
            className="text-[#dc2626] hover:text-[#ef4444] transition-colors underline underline-offset-4 tracking-wider"
          >
            STUDENT LOGIN &gt;
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
