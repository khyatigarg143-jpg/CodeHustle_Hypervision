import React from 'react';

export default function CyberButton({
  children,
  loading = false,
  loadingText = 'AUTHENTICATING...',
  disabled = false,
  type = 'submit',
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`h-11 md:h-12 min-w-[170px] px-6 border border-[#dc2626] bg-[#991b1b] text-white font-mono font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase cursor-pointer transition-all duration-150 hover:bg-[#dc2626] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(220,38,38,0.25)] active:translate-y-0 disabled:opacity-50 disabled:cursor-wait disabled:hover:translate-y-0 disabled:hover:bg-[#991b1b] disabled:hover:shadow-none select-none flex items-center justify-center gap-2 ${className}`}
    >
      {loading ? (
        <>
          <span className="inline-block w-2 h-2 bg-white rounded-none animate-ping mr-1" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
