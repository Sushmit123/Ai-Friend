import { useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'

/**
 * ChatColumn — Left panel: conversation history + input area
 */

const SUGGESTIONS = [
  'Hello! 👋',
  "What's the weather today?",
  'Explain React hooks',
  'Write a Python function',
  'Tell me the latest news',
  '2 + 2 × 10 = ?',
]

const ChatColumn = ({
  messages,
  isThinking,
  isRecording,
  inputValue,
  onInputChange,
  onSend,
  onMicToggle,
  onSuggestion,
}) => {
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  /* Auto-scroll to bottom when new messages arrive */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  /* Auto-resize textarea */
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }, [inputValue])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const isEmpty = messages.length === 0 && !isThinking

  return (
    <section className="chat-column">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-title">Chat with AI Friend</div>
        <div className="chat-subtitle">Ask anything using text or voice.</div>
      </div>

      {/* Messages / Empty state */}
      <div className="messages-area">
        {isEmpty ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <div className="empty-title">Start a conversation</div>
            <div className="empty-subtitle">
              Type a message or use the microphone to talk to your AI Friend.
            </div>
            <div className="empty-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="suggestion-chip"
                  onClick={() => onSuggestion(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Thinking indicator */}
            {isThinking && (
              <div className="thinking-row">
                <div className="thinking-bubble">
                  <span className="thinking-text">AI Friend is thinking</span>
                  <div className="dot-bounce">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="input-area">
        {/* Voice recording indicator */}
        {isRecording && (
          <div className="voice-indicator">
            <div className="voice-wave">
              <span /><span /><span /><span /><span />
            </div>
            <span>Listening… speak now</span>
            <button
              onClick={onMicToggle}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: '#dc3545' }}
            >
              Stop
            </button>
          </div>
        )}

        <div className="input-wrap">
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder="Type your message…"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Chat message input"
          />
          <button
            className={`mic-btn ${isRecording ? 'recording' : ''}`}
            onClick={onMicToggle}
            title={isRecording ? 'Stop recording' : 'Start voice input'}
            aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
          >
            {isRecording ? '⏹' : '🎤'}
          </button>
          <button
            className="send-btn"
            onClick={onSend}
            disabled={!inputValue.trim() && !isRecording}
            title="Send message"
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </section>
  )
}

export default ChatColumn
