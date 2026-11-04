import React, { useState } from 'react';

export default function TerminalInput({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  autoComplete = 'off',
  inputMode,
  disabled = false,
  className = '',
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputId = id || `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`min-w-0 ${className}`}>
      <label
        htmlFor={inputId}
        className="block mb-2 text-[10px] tracking-[0.18em] text-[#a8a29e] uppercase font-mono select-none"
      >
        {label} {required && <span className="text-[#dc2626] font-bold">*</span>}
      </label>

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={effectiveType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full h-11 md:h-12 bg-[#0a0a0a] text-[#eee9e2] px-3.5 outline-none font-mono text-xs md:text-sm transition-all duration-150 border ${
            error
              ? 'border-[#ef4444] bg-[#120a0a]'
              : 'border-[#332e2a] hover:border-[#4d4640] focus:border-[#dc2626] focus:bg-[#0f0a0a] focus:shadow-[inset_2px_0_#dc2626,0_0_16px_rgba(220,38,38,0.12)]'
          } ${isPassword ? 'pr-16' : ''} disabled:opacity-50 disabled:cursor-not-allowed placeholder-[#57524d]`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-[#857f79] hover:text-[#dc2626] px-1 py-0.5 border border-transparent hover:border-[#dc2626]/40 transition-colors uppercase select-none"
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>

      <div className="min-h-[16px] mt-1.5">
        {error && (
          <p id={errorId} className="text-[10px] text-[#f87171] font-mono tracking-wide" role="alert">
            &gt; ERROR: {error}
          </p>
        )}
      </div>
    </div>
  );
}
