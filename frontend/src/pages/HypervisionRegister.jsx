import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Code,
  GraduationCap,
  ChevronDown,
  Hash,
  Mail,
  Phone,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import CyberBackground from '../components/CyberBackground';
import { authService } from '../services/api';

const UNIVERSITIES = [
  'UPES Dehradun',
  'Indian Institute of Technology (IIT) Delhi',
  'Indian Institute of Technology (IIT) Roorkee',
  'Indian Institute of Technology (IIT) Bombay',
  'BITS Pilani',
  'Delhi Technological University (DTU)',
  'Thapar Institute of Engineering & Technology',
  'Chandigarh University',
  'Vellore Institute of Technology (VIT)',
  'Manipal Institute of Technology',
  'National Institute of Technology (NIT) Trichy',
  'Other University / Institute'
];

export default function HypervisionRegister() {
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState('');
  const [aboutSkills, setAboutSkills] = useState('');
  const [university, setUniversity] = useState('');
  const [hypervisionId, setHypervisionId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // UI State
  const [uniDropdownOpen, setUniDropdownOpen] = useState(false);
  const [uniSearch, setUniSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUniDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered universities
  const filteredUniversities = UNIVERSITIES.filter((u) =>
    u.toLowerCase().includes(uniSearch.toLowerCase())
  );

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!aboutSkills.trim()) {
      newErrors.aboutSkills = 'About & Skills is required';
    } else if (aboutSkills.length > 500) {
      newErrors.aboutSkills = 'Maximum 500 characters allowed';
    }

    if (!university) {
      newErrors.university = 'Please select your university';
    }

    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      newErrors.email = 'Invalid email address format';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(phone.trim().replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        aboutSkills: aboutSkills.trim(),
        university,
        hypervisionId: hypervisionId.trim() || undefined,
        email: email.trim(),
        phone: phone.trim().replace(/[\s-]/g, ''),
        termsAccepted: true,
      };

      const res = await authService.registerIndividual(payload);
      setSuccessData(res);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err.message || 'Registration failed. Please check your inputs.',
      }));
      setShake(true);
      setTimeout(() => setShake(false), 300);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ece9e4] font-mono selection:bg-[#991b1b] selection:text-white flex flex-col justify-center items-center py-10 px-4 sm:px-6 overflow-x-hidden scanlines-overlay">
      {/* Dynamic Cyberpunk / Geometric Background */}
      <CyberBackground />

      <div className="relative z-10 w-full max-w-[530px] mx-auto flex flex-col items-center">
        {/* Top Header */}
        <header className="w-full flex flex-col items-center mb-6 text-center select-none">
          {/* Subtle Flanked Top Label: CODE - HUSTLE . 11 . 0 */}
          <div className="flex items-center justify-center gap-3 w-full max-w-[420px] mb-2 opacity-85">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#444444] to-[#777777]" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.35em] text-[#a3a3a3] uppercase whitespace-nowrap">
              CODE · HUSTLE . 11 . 0
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#444444] to-[#777777]" />
          </div>

          {/* Main Title: HYPERVISION */}
          <h1 className="font-title text-4xl sm:text-5xl md:text-[56px] tracking-[0.14em] font-extrabold uppercase leading-none mt-1">
            <span className="text-[#ffffff] drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
              HYPER
            </span>
            <span className="text-[#ff1a24] drop-shadow-[0_0_22px_rgba(255,26,36,0.65)]">
              VISION
            </span>
          </h1>
        </header>

        {/* Centered Registration Card */}
        <section
          className={`w-full bg-[#070707]/90 backdrop-blur-md border border-[#dc2626]/70 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(220,38,38,0.22)] transition-all duration-200 ${
            shake ? 'shake-form' : ''
          }`}
          aria-label="Registration Portal"
        >
          {successData ? (
            /* Success Confirmation Screen */
            <div className="py-6 text-center flex flex-col items-center animate-fade-in">
              <div className="w-14 h-14 rounded-full border border-[#22c55e]/50 bg-[#22c55e]/10 flex items-center justify-center mb-4 text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Check className="w-7 h-7" />
              </div>
              <h2 className="font-title text-2xl font-bold uppercase text-white tracking-wider mb-2">
                TRANSMISSION CONFIRMED
              </h2>
              <p className="text-xs text-neutral-400 max-w-sm mb-6 leading-relaxed">
                Welcome to the grid, <span className="text-white font-bold">{fullName}</span>. Your registration has been accepted into Code Hustle 11.0.
              </p>

              <div className="w-full bg-[#0d0d0d] border border-[#222222] rounded-lg p-4 mb-6 text-left text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                  <span className="text-neutral-500">OPERATIVE ID:</span>
                  <span className="text-[#ff1a24] font-bold">{successData.reference || 'CH11-0941'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                  <span className="text-neutral-500">UNIVERSITY:</span>
                  <span className="text-neutral-200 truncate max-w-[200px]">{university}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">VERIFICATION:</span>
                  <span className="text-[#22c55e]">● ENCRYPTED & ACTIVE</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-full h-11 bg-gradient-to-r from-[#210606] via-[#0d0d0d] to-[#210606] border border-[#dc2626] rounded-lg text-white font-mono text-xs tracking-widest uppercase hover:border-[#ff1a24] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all"
              >
                PROCEED TO OPERATIVE DASHBOARD &gt;
              </button>
            </div>
          ) : (
            /* The Registration Form matching the reference screenshot 1:1 */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Form Global Error Banner if any */}
              {errors.form && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg border border-red-500/50 bg-red-950/30 text-xs text-red-300 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* 1. FULL NAME * */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-[3px] h-3.5 bg-[#dc2626] rounded-xs" />
                  <label
                    htmlFor="fullName"
                    className="text-[11px] font-mono font-bold tracking-[0.12em] text-neutral-200 uppercase select-none"
                  >
                    FULL NAME <span className="text-[#dc2626]">*</span>
                  </label>
                </div>

                <div
                  className={`h-11 rounded-lg border bg-[#090909] flex items-center px-3.5 transition-all focus-within:border-[#dc2626] focus-within:shadow-[0_0_12px_rgba(220,38,38,0.18)] ${
                    errors.fullName ? 'border-[#ef4444]' : 'border-[#222222] hover:border-neutral-700'
                  }`}
                >
                  <User className="w-4 h-4 text-neutral-500 mr-2.5 shrink-0" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="Enter your name..."
                    autoComplete="name"
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none font-mono"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[10px] text-[#f87171] mt-1 font-mono tracking-wide">
                    &gt; {errors.fullName}
                  </p>
                )}
              </div>

              {/* 2. ABOUT & SKILLS * */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-[3px] h-3.5 bg-[#dc2626] rounded-xs" />
                  <label
                    htmlFor="aboutSkills"
                    className="text-[11px] font-mono font-bold tracking-[0.12em] text-neutral-200 uppercase select-none"
                  >
                    ABOUT & SKILLS <span className="text-[#dc2626]">*</span>
                  </label>
                </div>

                <div
                  className={`rounded-lg border bg-[#090909] p-3 flex items-start transition-all focus-within:border-[#dc2626] focus-within:shadow-[0_0_12px_rgba(220,38,38,0.18)] ${
                    errors.aboutSkills ? 'border-[#ef4444]' : 'border-[#222222] hover:border-neutral-700'
                  }`}
                >
                  <Code className="w-4 h-4 text-neutral-500 mr-2.5 mt-0.5 shrink-0" />
                  <textarea
                    id="aboutSkills"
                    rows={3}
                    maxLength={500}
                    value={aboutSkills}
                    onChange={(e) => {
                      setAboutSkills(e.target.value);
                      if (errors.aboutSkills) setErrors((prev) => ({ ...prev, aboutSkills: '' }));
                    }}
                    placeholder="Tell us about your technical stack and skills..."
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none resize-none font-mono h-18 sm:h-20 leading-relaxed"
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  {errors.aboutSkills ? (
                    <p className="text-[10px] text-[#f87171] font-mono tracking-wide">
                      &gt; {errors.aboutSkills}
                    </p>
                  ) : (
                    <span />
                  )}
                  <div className="text-[11px] font-mono text-neutral-500 ml-auto">
                    {aboutSkills.length}/500
                  </div>
                </div>
              </div>

              {/* 3. UNIVERSITY * */}
              <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-[3px] h-3.5 bg-[#dc2626] rounded-xs" />
                  <label
                    className="text-[11px] font-mono font-bold tracking-[0.12em] text-neutral-200 uppercase select-none"
                  >
                    UNIVERSITY <span className="text-[#dc2626]">*</span>
                  </label>
                </div>

                <div
                  tabIndex={0}
                  role="button"
                  aria-expanded={uniDropdownOpen}
                  onClick={() => setUniDropdownOpen(!uniDropdownOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setUniDropdownOpen(!uniDropdownOpen);
                    }
                  }}
                  className={`h-11 rounded-lg border bg-[#090909] flex items-center justify-between px-3.5 cursor-pointer transition-all hover:border-neutral-700 focus:border-[#dc2626] focus:outline-none ${
                    errors.university ? 'border-[#ef4444]' : 'border-[#222222]'
                  }`}
                >
                  <div className="flex items-center overflow-hidden">
                    <GraduationCap className="w-4 h-4 text-neutral-500 mr-2.5 shrink-0" />
                    <span
                      className={`text-xs sm:text-sm truncate font-mono ${
                        university ? 'text-neutral-200' : 'text-neutral-600'
                      }`}
                    >
                      {university || 'Select'}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      uniDropdownOpen ? 'rotate-180 text-[#dc2626]' : ''
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {uniDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0a0a0a] border border-[#333333] rounded-lg shadow-2xl z-50 overflow-hidden font-mono">
                    <div className="p-2 border-b border-[#222222]">
                      <input
                        type="text"
                        placeholder="Search university..."
                        value={uniSearch}
                        onChange={(e) => setUniSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-[#121212] border border-[#2a2a2a] rounded px-2.5 py-1 text-xs text-neutral-200 placeholder-neutral-600 outline-none focus:border-[#dc2626]"
                      />
                    </div>
                    <ul className="max-h-48 overflow-y-auto divide-y divide-[#171717] text-xs">
                      {filteredUniversities.length > 0 ? (
                        filteredUniversities.map((item) => (
                          <li
                            key={item}
                            onClick={() => {
                              setUniversity(item);
                              setUniDropdownOpen(false);
                              setUniSearch('');
                              if (errors.university) setErrors((prev) => ({ ...prev, university: '' }));
                            }}
                            className={`px-3 py-2.5 cursor-pointer flex items-center justify-between transition-colors hover:bg-[#1a0a0a] hover:text-[#ff1a24] ${
                              university === item ? 'bg-[#1a0808] text-[#ff1a24] font-bold' : 'text-neutral-300'
                            }`}
                          >
                            <span>{item}</span>
                            {university === item && <Check className="w-3.5 h-3.5 text-[#ff1a24]" />}
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-2 text-neutral-500 text-center">No match found</li>
                      )}
                    </ul>
                  </div>
                )}

                {errors.university && (
                  <p className="text-[10px] text-[#f87171] mt-1 font-mono tracking-wide">
                    &gt; {errors.university}
                  </p>
                )}
              </div>

              {/* 4. HYPERVISION ID (Optional) */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-[3px] h-3.5 bg-[#dc2626] rounded-xs" />
                  <label
                    htmlFor="hypervisionId"
                    className="text-[11px] font-mono font-bold tracking-[0.12em] text-neutral-200 uppercase select-none"
                  >
                    HYPERVISION ID <span className="text-neutral-500 font-normal normal-case">(Optional)</span>
                  </label>
                </div>

                <div className="h-11 rounded-lg border border-[#222222] bg-[#090909] flex items-center px-3.5 transition-all hover:border-neutral-700 focus-within:border-[#dc2626] focus-within:shadow-[0_0_12px_rgba(220,38,38,0.18)]">
                  <Hash className="w-4 h-4 text-neutral-500 mr-2.5 shrink-0" />
                  <input
                    id="hypervisionId"
                    type="text"
                    value={hypervisionId}
                    onChange={(e) => setHypervisionId(e.target.value)}
                    placeholder="HYPExxx"
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none font-mono uppercase"
                  />
                </div>
              </div>

              {/* 5. CONTACT DETAILS * */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-[3px] h-3.5 bg-[#dc2626] rounded-xs" />
                  <span className="text-[11px] font-mono font-bold tracking-[0.12em] text-neutral-200 uppercase select-none">
                    CONTACT DETAILS <span className="text-[#dc2626]">*</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email Address */}
                  <div>
                    <div
                      className={`h-11 rounded-lg border bg-[#090909] flex items-center px-3.5 transition-all focus-within:border-[#dc2626] focus-within:shadow-[0_0_12px_rgba(220,38,38,0.18)] ${
                        errors.email ? 'border-[#ef4444]' : 'border-[#222222] hover:border-neutral-700'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-neutral-500 mr-2.5 shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="Email Address"
                        autoComplete="email"
                        className="w-full bg-transparent text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none font-mono"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[10px] text-[#f87171] mt-1 font-mono tracking-wide">
                        &gt; {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <div
                      className={`h-11 rounded-lg border bg-[#090909] flex items-center px-3.5 transition-all focus-within:border-[#dc2626] focus-within:shadow-[0_0_12px_rgba(220,38,38,0.18)] ${
                        errors.phone ? 'border-[#ef4444]' : 'border-[#222222] hover:border-neutral-700'
                      }`}
                    >
                      <Phone className="w-4 h-4 text-neutral-500 mr-2.5 shrink-0" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        placeholder="Phone"
                        autoComplete="tel"
                        className="w-full bg-transparent text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none font-mono"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-[#f87171] mt-1 font-mono tracking-wide">
                        &gt; {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 6. TERMS AND CONDITIONS CHECKBOX */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' }));
                    }}
                    className="w-4 h-4 rounded-xs border border-neutral-600 bg-neutral-900 accent-[#dc2626] cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] sm:text-xs font-mono tracking-wide text-neutral-300">
                    I AGREE TO ALL{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-[#00c8ff] hover:text-[#38bdf8] underline decoration-[#00c8ff]/70 font-semibold uppercase transition-colors"
                    >
                      TERMS AND CONDITIONS.
                    </button>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-[10px] text-[#f87171] mt-1 font-mono tracking-wide">
                    &gt; {errors.terms}
                  </p>
                )}
              </div>

              {/* 7. JOIN & CONNECT > SUBMIT BUTTON */}
              <div className="pt-3">
                <div className="chamfer-btn-wrapper w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    className="chamfer-btn w-full h-12 bg-gradient-to-r from-[#210606] via-[#090909] to-[#210606] border border-[#dc2626] text-white font-mono font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-200 hover:border-[#ff1a24] hover:bg-gradient-to-r hover:from-[#330808] hover:via-[#120606] hover:to-[#330808] active:scale-[0.99] disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2 select-none"
                  >
                    {loading ? (
                      <>
                        <span className="w-2 h-2 bg-[#ff1a24] animate-ping rounded-none" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <span>JOIN &amp; CONNECT &gt;</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#0b0b0b] border border-[#dc2626] rounded-xl max-w-lg w-full p-6 shadow-[0_0_50px_rgba(220,38,38,0.35)] font-mono text-xs text-neutral-300">
            <div className="flex justify-between items-center pb-3 border-b border-[#222222] mb-4">
              <span className="text-[#ff1a24] font-bold tracking-widest uppercase">
                &gt; HYPERVISION 11.0 PROTOCOLS
              </span>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-2 leading-relaxed text-neutral-400">
              <p>
                <strong className="text-white">1. PARTICIPATION ELIGIBILITY:</strong> All registered operatives must be currently enrolled university students with valid academic credentials.
              </p>
              <p>
                <strong className="text-white">2. CODE OF ETHICS:</strong> All code authored during Code Hustle 11.0 must be original work. External open-source libraries must be declared.
              </p>
              <p>
                <strong className="text-white">3. SECURITY & PRIVACY:</strong> Contact details are protected and utilized strictly for competition communications and verification.
              </p>
              <p>
                <strong className="text-white">4. FINAL SUBMISSIONS:</strong> Teams and individuals agree to submit their project repositories prior to the terminal countdown deadline.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-[#222222] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setTermsAccepted(true);
                  setShowTermsModal(false);
                }}
                className="px-5 py-2 bg-[#991b1b] hover:bg-[#dc2626] border border-[#dc2626] text-white font-mono text-xs tracking-wider uppercase rounded transition-colors"
              >
                ACCEPT &amp; CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
