import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import CyberButton from '../components/CyberButton';

export default function Dashboard({ title = 'STUDENT OPERATIVE TERMINAL', role = 'student' }) {
  const navigate = useNavigate();
  const session = authService.getCurrentSession();

  const handleLogout = () => {
    authService.logout();
    navigate('/userlogin');
  };

  return (
    <div className="crt-overlay min-h-screen bg-[#060606] text-[#ece9e4] font-mono p-6 sm:p-12 flex flex-col justify-between selection:bg-[#991b1b] selection:text-white">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-[#282421] pb-4 mb-8">
          <div className="text-xs tracking-[0.2em] text-[#dc2626]">
            HV// CODE HUSTLE 11.0 // AUTHORIZED SESSION
          </div>
          <div className="text-[10px] text-[#22c55e]">
            ● SESSION ACTIVE [TLS 1.3]
          </div>
        </div>

        {/* Dashboard Card */}
        <div className="corner-brackets border border-[#38302b] bg-[#0c0c0c] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          <div className="text-[10px] tracking-[0.25em] text-[#dc2626] mb-2 uppercase">
            &gt; SECURE SYSTEM ACCESS GRANTED
          </div>
          <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#f0ece6] mb-6">
            {title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-[#292522] py-6 my-6 text-xs text-[#a8a29e]">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#78716c] block mb-1">
                AUTHENTICATED AS
              </span>
              <span className="text-white font-bold">{session.identity || 'OPERATIVE'}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#78716c] block mb-1">
                ASSIGNED CLEARANCE
              </span>
              <span className="text-[#dc2626] font-bold uppercase">{session.role || role}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[9px] uppercase tracking-widest text-[#78716c] block mb-1">
                SESSION TOKEN HASH
              </span>
              <span className="text-[#64748b] text-[10px] break-all">
                {session.token || 'LOCAL_SIMULATED_TOKEN_HASH_CH11'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <p className="text-[10px] text-[#716b65] tracking-wider">
              THIS IS THE AUTH REDIRECT LANDING TARGET.
            </p>
            <CyberButton onClick={handleLogout} className="!bg-[#1c1917] !border-[#44403c] hover:!bg-[#dc2626] hover:!border-[#dc2626]">
              TERMINATE SESSION
            </CyberButton>
          </div>
        </div>
      </div>

      <div className="text-[9px] text-center text-[#525252] tracking-widest uppercase mt-8">
        UPES HYPERVISION 11.0 · OPERATIVE SESSION LOGGED
      </div>
    </div>
  );
}
