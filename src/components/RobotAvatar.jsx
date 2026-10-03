/**
 * RobotAvatar — Friendly animated SVG robot
 * States: idle | listening | thinking | speaking | error
 */

const RobotAvatar = ({ state = 'idle' }) => {
  const isSpeaking = state === 'speaking'
  const isListening = state === 'listening'
  const isThinking = state === 'thinking'
  const isError = state === 'error'

  /* Eye color based on state */
  const eyeColor = isError ? '#dc3545' : isThinking ? '#fd7e14' : '#4f8ef7'
  const eyeGlow = isListening ? '#28a745' : eyeColor

  return (
    <div className={`robot-container robot-state-${state}`}>
      {/* Listening rings */}
      {isListening && (
        <div className="listening-rings">
          <div className="listen-ring" />
          <div className="listen-ring" />
          <div className="listen-ring" />
        </div>
      )}

      {/* Thinking bubble */}
      {isThinking && (
        <div className="thinking-dots-ring">
          <div className="thought-bubble">
            <span style={{ fontSize: '0.7rem' }}>🤔</span>
            <div className="dot-bounce">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}

      <svg
        className="robot-svg"
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Definitions ── */}
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8efff" />
            <stop offset="100%" stopColor="#d1defa" />
          </linearGradient>
          <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f4ff" />
            <stop offset="100%" stopColor="#dce8ff" />
          </linearGradient>
          <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={eyeGlow} />
            <stop offset="100%" stopColor={eyeGlow + 'bb'} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(79,142,247,0.15)" />
          </filter>
        </defs>

        {/* ── Body Group ── */}
        <g className="robot-body-group">
          {/* Shadow ellipse */}
          <ellipse cx="100" cy="278" rx="55" ry="8" fill="rgba(0,0,0,0.07)" />

          {/* Torso */}
          <rect
            x="42" y="160" width="116" height="100"
            rx="18" ry="18"
            fill="url(#bodyGrad)"
            stroke="#c5d5f5"
            strokeWidth="1.5"
            filter="url(#softShadow)"
          />

          {/* Chest panel */}
          <rect
            x="62" y="178" width="76" height="50"
            rx="10" ry="10"
            fill="#fff"
            stroke="#dce8ff"
            strokeWidth="1"
            opacity="0.8"
          />

          {/* Chest LED indicators */}
          <circle cx="78" cy="193" r="5" fill={isError ? '#fee2e2' : '#e8f5e9'} stroke={isError ? '#dc3545' : '#28a745'} strokeWidth="1" />
          <circle cx="78" cy="193" r="2.5" fill={isError ? '#dc3545' : '#28a745'} opacity="0.9" />

          <circle cx="100" cy="193" r="5" fill="#e8f0fe" stroke="#4f8ef7" strokeWidth="1" />
          <circle cx="100" cy="193" r="2.5" fill="#4f8ef7" opacity="0.9">
            {isSpeaking && (
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.5s" repeatCount="indefinite" />
            )}
          </circle>

          <circle cx="122" cy="193" r="5" fill="#fef9e7" stroke="#ffc107" strokeWidth="1" />
          <circle cx="122" cy="193" r="2.5" fill="#ffc107" opacity="0.9" />

          {/* Chest arc decoration */}
          <path d="M 68 215 Q 100 228 132 215" stroke="#c5d5f5" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Left arm */}
          <rect x="18" y="162" width="26" height="70" rx="13" fill="url(#bodyGrad)" stroke="#c5d5f5" strokeWidth="1.5" />
          <circle cx="31" cy="240" r="12" fill="url(#bodyGrad)" stroke="#c5d5f5" strokeWidth="1.5" />

          {/* Right arm */}
          <rect x="156" y="162" width="26" height="70" rx="13" fill="url(#bodyGrad)" stroke="#c5d5f5" strokeWidth="1.5" />
          <circle cx="169" cy="240" r="12" fill="url(#bodyGrad)" stroke="#c5d5f5" strokeWidth="1.5" />

          {/* Shoulder joints */}
          <circle cx="45" cy="168" r="8" fill="#dce8ff" stroke="#b8cef5" strokeWidth="1" />
          <circle cx="155" cy="168" r="8" fill="#dce8ff" stroke="#b8cef5" strokeWidth="1" />

          {/* Neck */}
          <rect x="85" y="148" width="30" height="18" rx="6" fill="url(#bodyGrad)" stroke="#c5d5f5" strokeWidth="1.5" />
        </g>

        {/* ── Head Group ── */}
        <g className="robot-head-group">
          {/* Antenna */}
          <line x1="100" y1="18" x2="100" y2="38" stroke="#b8cef5" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="14" r="7" fill="#fff" stroke="#4f8ef7" strokeWidth="1.5">
            {(isSpeaking || isListening) && (
              <animate attributeName="fill" values="#4f8ef7;#fff;#4f8ef7" dur="1s" repeatCount="indefinite" />
            )}
          </circle>
          <circle cx="100" cy="14" r="3.5" fill={eyeColor} />

          {/* Head */}
          <rect
            x="30" y="38" width="140" height="114"
            rx="28" ry="28"
            fill="url(#headGrad)"
            stroke="#c5d5f5"
            strokeWidth="1.5"
            filter="url(#softShadow)"
          />

          {/* Forehead highlight */}
          <ellipse cx="100" cy="52" rx="45" ry="12" fill="rgba(255,255,255,0.5)" />

          {/* ── Eyes ── */}
          {/* Left eye socket */}
          <ellipse cx="72" cy="90" rx="22" ry="22" fill="#fff" stroke="#dce8ff" strokeWidth="1" />
          <ellipse
            className="robot-eye-left"
            cx="72" cy="90" rx="16" ry="16"
            fill="url(#eyeGrad)"
            filter="url(#glow)"
          />
          {/* Left pupil */}
          <ellipse
            className="eye-pupil"
            cx="72" cy="90" rx="8" ry="8"
            fill="#fff"
            opacity="0.9"
          />
          {/* Left inner detail */}
          <ellipse
            className="eye-inner"
            cx="72" cy="90" rx="4" ry="4"
            fill={eyeColor}
            opacity="0.7"
          />
          {/* Left eye shine */}
          <ellipse cx="77" cy="85" rx="3" ry="3" fill="rgba(255,255,255,0.8)" />

          {/* Right eye socket */}
          <ellipse cx="128" cy="90" rx="22" ry="22" fill="#fff" stroke="#dce8ff" strokeWidth="1" />
          <ellipse
            className="robot-eye-right"
            cx="128" cy="90" rx="16" ry="16"
            fill="url(#eyeGrad)"
            filter="url(#glow)"
          />
          {/* Right pupil */}
          <ellipse
            className="eye-pupil"
            cx="128" cy="90" rx="8" ry="8"
            fill="#fff"
            opacity="0.9"
          />
          {/* Right inner detail */}
          <ellipse
            className="eye-inner"
            cx="128" cy="90" rx="4" ry="4"
            fill={eyeColor}
            opacity="0.7"
          />
          {/* Right eye shine */}
          <ellipse cx="133" cy="85" rx="3" ry="3" fill="rgba(255,255,255,0.8)" />

          {/* Eyebrows */}
          {isError ? (
            <>
              <path d="M 54 70 Q 72 64 82 68" stroke="#dc3545" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 118 68 Q 128 64 146 70" stroke="#dc3545" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          ) : isThinking ? (
            <>
              <path d="M 54 68 Q 72 62 82 66" stroke="#fd7e14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 118 62 Q 128 58 146 66" stroke="#fd7e14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <path d="M 54 72 Q 72 66 82 70" stroke="#b8cef5" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 118 70 Q 128 66 146 72" stroke="#b8cef5" strokeWidth="2" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="112" rx="4" ry="3" fill="#dce8ff" stroke="#b8cef5" strokeWidth="1" />

          {/* ── Mouth ── */}
          <g style={{ transformOrigin: '100px 130px' }} className={isSpeaking ? 'robot-mouth-speaking' : ''}>
            {isError ? (
              /* Sad/error mouth */
              <path
                d="M 76 136 Q 100 126 124 136"
                stroke="#dc3545" strokeWidth="3" strokeLinecap="round" fill="none"
              />
            ) : isSpeaking ? (
              /* Open speaking mouth */
              <ellipse cx="100" cy="130" rx="20" ry="10" fill="#4f8ef7" stroke="#3b7de8" strokeWidth="1" opacity="0.9" />
            ) : (
              /* Happy smile */
              <path
                d="M 76 124 Q 100 140 124 124"
                stroke="#4f8ef7" strokeWidth="2.5" strokeLinecap="round" fill="none"
              />
            )}
          </g>

          {/* Ear panels */}
          <rect x="19" y="75" width="14" height="32" rx="7" fill="url(#headGrad)" stroke="#c5d5f5" strokeWidth="1.5" />
          <rect x="167" y="75" width="14" height="32" rx="7" fill="url(#headGrad)" stroke="#c5d5f5" strokeWidth="1.5" />
          {/* Ear detail */}
          <line x1="26" y1="83" x2="26" y2="99" stroke="#b8cef5" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="174" y1="83" x2="174" y2="99" stroke="#b8cef5" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cheek blush */}
          <ellipse cx="52" cy="110" rx="10" ry="6" fill="rgba(255,182,193,0.3)" />
          <ellipse cx="148" cy="110" rx="10" ry="6" fill="rgba(255,182,193,0.3)" />
        </g>
      </svg>
    </div>
  )
}

export default RobotAvatar
