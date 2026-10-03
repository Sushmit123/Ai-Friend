import RobotAvatar from './RobotAvatar'

/**
 * RobotColumn — Right panel: animated robot + status + audio EQ
 */

const STATE_CONFIG = {
  idle: {
    label: 'Ready',
    labelClass: '',
    emoji: '😊',
    desc: 'Ask me anything!',
  },
  listening: {
    label: 'Listening...',
    labelClass: 'listening',
    emoji: '👂',
    desc: 'Go ahead, I\'m all ears.',
  },
  thinking: {
    label: 'Thinking...',
    labelClass: 'thinking',
    emoji: '🤔',
    desc: 'Processing your request…',
  },
  speaking: {
    label: 'Speaking...',
    labelClass: 'speaking',
    emoji: '🗣️',
    desc: 'Playing response…',
  },
  error: {
    label: 'Oops!',
    labelClass: 'error',
    emoji: '😬',
    desc: 'Something went wrong. Try again.',
  },
}

const RobotColumn = ({ robotState }) => {
  const config = STATE_CONFIG[robotState] || STATE_CONFIG.idle
  const isSpeaking = robotState === 'speaking'

  return (
    <section className="robot-column">
      <div className="robot-scene">
        {/* Robot */}
        <RobotAvatar state={robotState} />

        {/* Status area */}
        <div className="robot-status">
          <div className={`status-label ${config.labelClass}`}>
            {config.emoji} {config.label}
          </div>

          {/* Audio EQ — only while speaking */}
          {isSpeaking && (
            <div className="audio-eq" role="presentation" aria-hidden="true">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="eq-bar" style={{ animationDelay: `${i * 0.07}s` }} />
              ))}
            </div>
          )}

          <div style={{ fontSize: '0.74rem', color: '#adb5bd', marginTop: '4px' }}>
            {config.desc}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RobotColumn
