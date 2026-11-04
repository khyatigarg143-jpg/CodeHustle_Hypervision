import React from 'react';

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* 1. Base Subtle Cyber Digital Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-70" />

      {/* 2. Dark Crimson Corner Ambient Glows */}
      {/* Top Left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-950/20 rounded-full blur-[110px]" />
      {/* Top Right */}
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-red-900/15 rounded-full blur-[130px]" />
      {/* Bottom Left */}
      <div className="absolute -bottom-36 -left-36 w-[500px] h-[500px] bg-red-950/25 rounded-full blur-[140px]" />
      {/* Bottom Right */}
      <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-red-900/30 rounded-full blur-[120px]" />

      {/* 3. Left Edge Diagonal Geometric Structures & Red Lines */}
      <svg
        className="absolute left-0 top-0 h-full w-[240px] md:w-[360px] opacity-90"
        viewBox="0 0 360 900"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dark polygonal geometric blocks */}
        <path
          d="M0 260 L95 355 L55 395 L0 340 Z"
          fill="url(#left-poly-grad1)"
        />
        <path
          d="M0 320 L130 450 L100 480 L0 380 Z"
          fill="url(#left-poly-grad2)"
        />
        <path
          d="M0 620 L160 460 L195 495 L0 690 Z"
          fill="url(#left-poly-grad3)"
          opacity="0.5"
        />

        {/* Sharp diagonal crimson accent lines */}
        <line
          x1="-20"
          y1="250"
          x2="140"
          y2="410"
          stroke="#991b1b"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="-20"
          y1="315"
          x2="170"
          y2="505"
          stroke="#dc2626"
          strokeWidth="2.5"
          opacity="0.9"
          filter="url(#red-glow)"
        />
        <line
          x1="-10"
          y1="400"
          x2="130"
          y2="540"
          stroke="#ff1a24"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="-10"
          y1="560"
          x2="220"
          y2="330"
          stroke="#dc2626"
          strokeWidth="2"
          opacity="0.8"
        />
        <line
          x1="0"
          y1="640"
          x2="160"
          y2="480"
          stroke="#7f1d1d"
          strokeWidth="1"
          opacity="0.5"
        />

        <defs>
          <linearGradient id="left-poly-grad1" x1="0" y1="260" x2="95" y2="395" gradientUnits="userSpaceOnUse">
            <stop stopColor="#550a0a" stopOpacity="0.85" />
            <stop offset="1" stopColor="#1a0202" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="left-poly-grad2" x1="0" y1="320" x2="130" y2="480" gradientUnits="userSpaceOnUse">
            <stop stopColor="#660c0c" stopOpacity="0.75" />
            <stop offset="1" stopColor="#0a0000" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="left-poly-grad3" x1="0" y1="620" x2="195" y2="495" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7a0d0d" stopOpacity="0.6" />
            <stop offset="1" stopColor="#050505" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* 4. Right Edge Diagonal Layered Crimson Bands & Slash Stripes */}
      <svg
        className="absolute right-0 top-0 h-full w-[280px] md:w-[480px] opacity-95"
        viewBox="0 0 480 900"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layered diagonal crimson wedge bands */}
        <path
          d="M480 180 L220 440 L270 490 L480 280 Z"
          fill="url(#right-band-grad1)"
        />
        <path
          d="M480 290 L160 610 L210 660 L480 390 Z"
          fill="url(#right-band-grad2)"
        />
        <path
          d="M480 480 L110 850 L190 900 L480 610 Z"
          fill="url(#right-band-grad3)"
        />

        {/* Dynamic diagonal razor-sharp highlight lines */}
        <line
          x1="480"
          y1="165"
          x2="210"
          y2="435"
          stroke="#7f1d1d"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="480"
          y1="220"
          x2="180"
          y2="520"
          stroke="#ff1a24"
          strokeWidth="3.5"
          opacity="0.95"
          filter="url(#red-glow)"
        />
        <line
          x1="480"
          y1="265"
          x2="230"
          y2="515"
          stroke="#dc2626"
          strokeWidth="1.5"
          opacity="0.75"
        />
        <line
          x1="480"
          y1="340"
          x2="140"
          y2="680"
          stroke="#ff1a24"
          strokeWidth="4"
          opacity="0.9"
          filter="url(#red-glow)"
        />
        <line
          x1="480"
          y1="410"
          x2="170"
          y2="720"
          stroke="#991b1b"
          strokeWidth="2"
          opacity="0.7"
        />
        <line
          x1="480"
          y1="560"
          x2="90"
          y2="950"
          stroke="#dc2626"
          strokeWidth="2.5"
          opacity="0.85"
        />

        <defs>
          <linearGradient id="right-band-grad1" x1="480" y1="180" x2="220" y2="490" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5c0b0b" stopOpacity="0.85" />
            <stop offset="0.6" stopColor="#2e0505" stopOpacity="0.6" />
            <stop offset="1" stopColor="#050505" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="right-band-grad2" x1="480" y1="290" x2="160" y2="660" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7a0d0d" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#3d0707" stopOpacity="0.65" />
            <stop offset="1" stopColor="#050505" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="right-band-grad3" x1="480" y1="480" x2="110" y2="900" gradientUnits="userSpaceOnUse">
            <stop stopColor="#660c0c" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#2e0505" stopOpacity="0.5" />
            <stop offset="1" stopColor="#050505" stopOpacity="0.0" />
          </linearGradient>
          <filter id="red-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
