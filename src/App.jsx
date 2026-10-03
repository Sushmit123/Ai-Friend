import { useState, useCallback, useRef } from 'react'
import Header from './components/Header'
import ChatColumn from './components/ChatColumn'
import RobotColumn from './components/RobotColumn'
import { sendMessage, detectToolFromResponse, stripToolPrefix } from './services/mistral'
import useSpeech from './hooks/useSpeech'
import './App.css'

/**
 * Robot states:
 *  idle | listening | thinking | speaking | error
 */

let msgIdCounter = 0
const newId = () => ++msgIdCounter

const App = () => {
  /* ── State ───────────────────────────────────── */
  const [messages, setMessages]       = useState([])
  const [inputValue, setInputValue]   = useState('')
  const [selectedTool, setSelectedTool] = useState('auto')
  const [robotState, setRobotState]   = useState('idle')
  const [isThinking, setIsThinking]   = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  /* Keep a ref to the conversation history for the API */
  const historyRef = useRef([])

  /* Speech hook */
  const { speak, stopSpeaking, startListening, stopListening, ttsSupported, sttSupported } =
    useSpeech()

  /* ── Helpers ─────────────────────────────────── */
  const addMessage = (role, content, toolUsed = null) => {
    const msg = { id: newId(), role, content, timestamp: new Date(), toolUsed }
    setMessages((prev) => [...prev, msg])
    historyRef.current.push({ role, content })
    return msg
  }

  const handleError = (errorText = 'Something went wrong. Please try again.') => {
    setRobotState('error')
    setIsThinking(false)
    addMessage('assistant', `❌ ${errorText}`)
    /* Reset to idle after a moment */
    setTimeout(() => setRobotState('idle'), 3000)
  }

  /* ── Send a message ──────────────────────────── */
  const handleSend = useCallback(
    async (overrideText) => {
      const text = (overrideText ?? inputValue).trim()
      if (!text) return

      /* Stop any ongoing speech */
      stopSpeaking()

      /* Add user message */
      addMessage('user', text)
      setInputValue('')

      /* UI transitions */
      setIsThinking(true)
      setRobotState('thinking')

      try {
        const rawReply = await sendMessage(historyRef.current, selectedTool)

        /* Detect if a tool was invoked */
        const detectedTool = detectToolFromResponse(rawReply)
        const cleanReply = stripToolPrefix(rawReply)
        const effectiveTool = detectedTool || (selectedTool !== 'auto' ? selectedTool : null)

        setIsThinking(false)

        /* Add AI message */
        addMessage('assistant', cleanReply, effectiveTool)

        /* Speak the response */
        if (ttsSupported) {
          setRobotState('speaking')
          speak(
            cleanReply,
            () => setRobotState('speaking'),
            () => setRobotState('idle')
          )
        } else {
          setRobotState('idle')
        }
      } catch (err) {
        console.error('[AI Friend] Error:', err)
        const errMsg =
          err.message?.includes('Failed to fetch')
            ? 'Could not connect to Ollama. Make sure it\'s running at localhost:11434 with the mistral model.'
            : err.message || 'An unexpected error occurred.'
        handleError(errMsg)
      }
    },
    [inputValue, selectedTool, speak, stopSpeaking, ttsSupported]
  )

  /* ── Voice input ─────────────────────────────── */
  const handleMicToggle = useCallback(() => {
    if (isRecording) {
      stopListening()
      setIsRecording(false)
      setRobotState('idle')
      return
    }

    if (!sttSupported) {
      handleError('Voice input is not supported in this browser. Try Chrome.')
      return
    }

    setIsRecording(true)
    setRobotState('listening')
    stopSpeaking()

    startListening(
      (transcript) => {
        /* STT success */
        setIsRecording(false)
        setRobotState('thinking')
        if (transcript) {
          setInputValue(transcript)
          /* Auto-send after a brief visual delay */
          setTimeout(() => handleSend(transcript), 300)
        } else {
          setRobotState('idle')
        }
      },
      (err) => {
        setIsRecording(false)
        handleError(`Voice recognition error: ${err}`)
      }
    )
  }, [isRecording, sttSupported, startListening, stopListening, stopSpeaking, handleSend])

  /* ── Suggestion chips ────────────────────────── */
  const handleSuggestion = useCallback(
    (text) => {
      setInputValue(text)
      handleSend(text)
    },
    [handleSend]
  )

  /* ── Tool change ─────────────────────────────── */
  const handleToolChange = (tool) => {
    setSelectedTool(tool)
    stopSpeaking()
    setRobotState('idle')
  }

  /* ── Render ──────────────────────────────────── */
  return (
    <div className="app-wrapper">
      <Header selectedTool={selectedTool} onToolChange={handleToolChange} />
      <div className="main-content">
        <ChatColumn
          messages={messages}
          isThinking={isThinking}
          isRecording={isRecording}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={() => handleSend()}
          onMicToggle={handleMicToggle}
          onSuggestion={handleSuggestion}
        />
        <RobotColumn robotState={robotState} />
      </div>
    </div>
  )
}

export default App
