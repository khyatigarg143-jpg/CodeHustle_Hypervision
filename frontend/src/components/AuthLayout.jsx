import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/userlogin', label: 'STUDENT' },
  { path: '/team-login', label: 'TEAM' },
  { path: '/admin-login', label: 'ADMIN' },
  { path: '/create-team', label: 'NEW TEAM' },
  { path: '/Indiregi', label: 'INDIVIDUAL' },
];

export default function AuthLayout({
  children,
  pageTitle,
  pageSubtitle,
  sectionKicker = '> IDENTITY VERIFICATION',
  formMode = 'CREDENTIALS REQUIRED',
  protocol = 'STUDENT / PASSWORD',
  routeLabel = 'USERLOGIN',
}) {
  const [nodeClock, setNodeClock] = useState('--:--:--');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setNodeClock(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="crt-overlay relative min-h-screen bg-[#060606] text-[#ece9e4] flex flex-col font-mono selection:bg-[#991b1b] selection:text-white">
      <div className="w-full max-w-[1440px] mx-auto min-h-screen flex flex-col px-4 sm:px-8 lg:px-14 py-6">
        {/* Top Telemetry Bar */}
        <header className="flex justify-between items-center border-b border-[#282421] pb-4 relative z-10">
          <div className="text-[10px] md:text-xs tracking-[0.24em] text-[#b9b3ac] uppercase">
            <span className="text-[#dc2626] font-bold">HV//</span> UPES &nbsp;·&nbsp; HYPERVISION &nbsp;/&nbsp; 11.0
          </div>
          <div className="text-[9px] tracking-[0.16em] text-[#77716b] text-right leading-tight">
            <span>SYSTEM STATUS &nbsp;</span>
            <strong className="text-[#22c55e] font-normal">● ONLINE</strong>
            <br />
            <span>NODE </span>
            <strong className="text-[#d7d0c8] font-normal">{nodeClock}</strong>
            <span> &nbsp;/&nbsp; ENCRYPTION ACTIVE</span>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1.05fr_minmax(420px,0.95fr)] gap-8 lg:gap-16 items-center py-8 lg:py-14 relative z-10">
          {/* Left Narrative Column */}
          <section className="min-w-0 py-2 lg:py-6" aria-label="Code Hustle introduction">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.28em] text-[#dc2626] uppercase mb-4">
              <span className="w-8 h-[1px] bg-[#dc2626]" />
              <span>A NEW WORLD. A NEW EXPLOIT.</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider uppercase font-normal text-[#f0ece6] leading-[0.85] my-6">
              CODE
              <span className="block text-[#d8d1c9]">HUSTLE</span>
              <span className="block outline-title">11.0</span>
            </h1>

            <p className="max-w-md text-xs md:text-sm text-[#918b84] leading-relaxed tracking-wide my-6">
              THE SYSTEM IS ONLY AS SECURE AS ITS WEAKEST POINT.{' '}
              <em className="text-[#d8d0c7] not-italic">
                Find the vulnerability. Challenge the protocol. Rewrite what comes next.
              </em>{' '}
              Your operation begins here.
            </p>

            {/* Surveillance Radar Widget */}
            <div
              className="hidden lg:block relative h-36 max-w-lg mt-8 overflow-hidden border-y border-[#292421] bg-gradient-to-r from-[#070707]/20 to-[#070707]/90"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse at 72% 52%, rgba(172, 26, 23, 0.22), transparent 44%), #080808',
              }}
              aria-hidden="true"
            >
              {/* Scan grid lines */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, transparent 0 38px, rgba(255,255,255,0.035) 39px, transparent 40px), linear-gradient(0deg, transparent 49%, rgba(220,38,38,0.12) 50%, transparent 51%)',
                }}
              />

              {/* Radar target rings */}
              <div className="absolute w-48 h-48 rounded-full border border-[#dc2626]/50 right-[10%] -top-6 shadow-[0_0_0_16px_rgba(160,25,25,0.04),0_0_0_42px_rgba(160,25,25,0.03),0_0_50px_rgba(180,25,25,0.15)]" />
              <div className="absolute right-[calc(10%+96px)] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#dc2626]/60 to-transparent" />

              <span className="absolute left-4 bottom-3 text-[9px] tracking-[0.2em] text-[#9a928a]">
                SURVEILLANCE FEED // NODE 11
              </span>
              <span className="absolute right-4 bottom-3 text-[9px] tracking-[0.16em] text-[#dc2626]">
                30° 21' N / 78° 04' E
              </span>
            </div>
          </section>

          {/* Right Portal Column */}
          <section
            className="corner-brackets w-full max-w-xl justify-self-center lg:justify-self-end border border-[#38302b] bg-gradient-to-br from-[#11100f]/95 to-[#070707]/98 shadow-[0_30px_90px_rgba(0,0,0,0.75),-15px_0_60px_rgba(153,27,27,0.08)] p-6 sm:p-9"
            aria-label="Authentication portal"
          >
            {/* Portal Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start pb-5 border-b border-[#302b27]">
              <div>
                <p className="text-[9px] tracking-[0.24em] text-[#dc2626] mb-2 uppercase">
                  {sectionKicker}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#f0ece6] leading-none">
                  {pageTitle}
                </h2>
                <p className="text-xs text-[#8e8780] mt-2 leading-relaxed">
                  {pageSubtitle}
                </p>
              </div>
              <div className="text-[9px] tracking-[0.14em] text-[#716b65] sm:text-right leading-tight whitespace-nowrap">
                ACCESS NODE
                <br />
                <span className="text-[#dc2626]">CH11 / AUTH-GATE</span>
                <br />
                <span className="text-[#a8a29e]">{routeLabel}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="grid grid-cols-5 gap-1.5 my-5" aria-label="Authentication pathways">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `min-h-[38px] flex items-center justify-center text-center no-underline text-[9px] tracking-wider px-1 py-1.5 transition-all border ${
                      isActive
                        ? 'border-[#dc2626] bg-gradient-to-b from-[#210d0c] to-[#100909] text-[#f0eae3] shadow-[inset_0_-2px_#dc2626]'
                        : 'border-[#302c28] bg-[#0b0b0b] text-[#918a83] hover:border-[#991b1b] hover:text-[#ece9e4]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span>
                      {isActive && <span className="text-[#dc2626] mr-0.5">/</span>}
                      {item.label}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Form Mode Kicker */}
            <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] text-[#b5aea6] uppercase mb-4">
              <span className="w-1.5 h-1.5 bg-[#dc2626] shadow-[0_0_8px_rgba(220,38,38,0.4)]" />
              <span>{formMode}</span>
            </div>

            {/* Active Form */}
            {children}

            {/* Telemetry Footer */}
            <div className="flex justify-between gap-3 border-t border-[#302b27] mt-6 pt-3 text-[8px] tracking-[0.14em] text-[#6f6963] uppercase">
              <span>{protocol}</span>
              <span>TRACE: 0x11-CH-ACCESS</span>
            </div>
          </section>
        </main>

        {/* Global Footer */}
        <footer className="flex flex-col sm:flex-row justify-between gap-2 border-t border-[#24211f] pt-4 text-[8px] tracking-[0.18em] text-[#615b55] uppercase relative z-10 mt-auto">
          <span>CODE HUSTLE 11.0 &nbsp;/&nbsp; INTERNAL GATEWAY</span>
          <span className="sm:text-right">UPES HYPERVISION &nbsp;·&nbsp; ACCESS IS A PRIVILEGE</span>
        </footer>
      </div>

      <style>{`
        .outline-title {
          -webkit-text-stroke: 1px rgba(230, 225, 218, 0.78);
          color: transparent;
          text-shadow: none;
        }
      `}</style>
    </div>
  );
}
