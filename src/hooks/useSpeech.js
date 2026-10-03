import { useRef, useCallback, useEffect } from 'react'

/**
 * useSpeech — Web Speech API hook for TTS (Text-to-Speech) and STT (Speech-to-Text)
 *
 * Returns:
 *  speak(text, onStart, onEnd)  — speaks text aloud
 *  stopSpeaking()               — cancels TTS
 *  startListening(onResult, onError) — starts STT
 *  stopListening()              — stops STT
 *  ttsSupported                 — boolean
 *  sttSupported                 — boolean
 */
const useSpeech = () => {
  const synthRef = useRef(window.speechSynthesis)
  const recognitionRef = useRef(null)

  const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const sttSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  /* Clean up on unmount */
  useEffect(() => {
    return () => {
      synthRef.current?.cancel()
      recognitionRef.current?.abort()
    }
  }, [])

  /**
   * TTS — speak a string of text
   */
  const speak = useCallback(
    (text, onStart, onEnd) => {
      if (!ttsSupported || !text) return

      /* Cancel any ongoing speech */
      synthRef.current.cancel()

      /* Strip markdown artifacts for cleaner TTS */
      const clean = text
        .replace(/```[\s\S]*?```/g, 'code block')
        .replace(/[*_`#>]/g, '')
        .replace(/\[TOOL:\s*\w+\]\s*/i, '')
        .slice(0, 500) /* Limit length for reasonable TTS duration */

      const utterance = new SpeechSynthesisUtterance(clean)
      utterance.rate = 1.05
      utterance.pitch = 1.0
      utterance.volume = 1.0

      /* Prefer a pleasant English voice if available */
      const voices = synthRef.current.getVoices()
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.toLowerCase().includes('google') ||
            v.name.toLowerCase().includes('natural') ||
            v.name.toLowerCase().includes('samantha'))
      )
      if (preferred) utterance.voice = preferred

      utterance.onstart = () => onStart?.()
      utterance.onend = () => onEnd?.()
      utterance.onerror = () => onEnd?.()

      synthRef.current.speak(utterance)
    },
    [ttsSupported]
  )

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel()
  }, [])

  /**
   * STT — start listening for voice input
   */
  const startListening = useCallback(
    (onResult, onError) => {
      if (!sttSupported) {
        onError?.('Speech recognition not supported in this browser.')
        return
      }

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition

      const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      recognition.continuous = false

      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript || ''
        onResult?.(transcript)
      }

      recognition.onerror = (event) => {
        onError?.(event.error || 'Speech recognition error')
      }

      recognition.onend = () => {
        /* Fired when recognition ends naturally */
      }

      recognitionRef.current = recognition
      recognition.start()
    },
    [sttSupported]
  )

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  return {
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    ttsSupported,
    sttSupported,
  }
}

export default useSpeech
