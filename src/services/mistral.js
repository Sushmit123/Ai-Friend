/**
 * Mistral via Ollama — Chat completion service
 *
 * Expects Ollama running locally at http://localhost:11434
 * with the mistral model pulled: `ollama pull mistral`
 */

const OLLAMA_URL = 'http://localhost:11434/api/chat'
const MODEL = 'mistral'

const getCurrentDateContext = () => {
  const now = new Date()

  const dateText = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(now)

  return `Current date and time: ${dateText}. Use this exact date when answering date/time questions. Do not rely on outdated training data or past dates.`
}

/**
 * Tool system prompts — injected into the system message when a specific
 * tool is selected, guiding Mistral to respond in that context.
 */
const TOOL_PROMPTS = {
  auto: `You are AI Friend, a helpful, friendly, and knowledgeable AI assistant.
You automatically decide the best way to answer: directly from knowledge, or by simulating a tool.
When using a tool, prefix your response with [TOOL: tool_name] on a new line.
Available tools: weather_tool, news_tool, web_search_tool, calculator_tool, code_tool, interview_tool, memory_tool.
Be concise, warm, and use emojis occasionally to feel friendly.`,

  direct: `You are AI Friend. Answer directly from your knowledge.
Be concise, warm, helpful, and use emojis occasionally.`,

  weather_tool: `You are AI Friend using weather_tool().
Simulate a weather response as if you fetched real weather data.
Format: location, temperature, condition, humidity, and a friendly tip.`,

  news_tool: `You are AI Friend using news_tool().
Simulate fetching recent news headlines. Present 3–4 bullet points with brief summaries.
Add a friendly comment at the end.`,

  web_search: `You are AI Friend using web_search_tool().
Simulate a web search result with 2–3 relevant findings and source references.
Summarize clearly and concisely.`,

  calculator: `You are AI Friend using calculator_tool().
Evaluate the mathematical expression precisely.
Show the working steps clearly, then give the final answer.`,

  code_tool: `You are AI Friend using code_tool().
Write clean, well-commented code. Use appropriate language based on context.
Format code in markdown code blocks. Explain what the code does briefly.`,

  interview: `You are AI Friend using interview_tool().
Conduct a friendly mock interview. Ask questions appropriate to the topic,
provide sample answers, and give constructive feedback.`,

  memory_tool: `You are AI Friend using memory_tool().
You have access to a conversation memory. Reference previous context when relevant.
Acknowledge what you remember and help build on it.`,
}

/**
 * Detect which tool was used from the AI response text.
 * Returns tool key or null.
 */
export const detectToolFromResponse = (text) => {
  const match = text.match(/^\[TOOL:\s*(\w+)\]/m)
  return match ? match[1].toLowerCase() : null
}

/**
 * Strip the [TOOL: ...] prefix from the response text.
 */
export const stripToolPrefix = (text) => {
  return text.replace(/^\[TOOL:\s*\w+\]\s*/m, '').trim()
}

/**
 * Send a chat message to Mistral via Ollama.
 *
 * @param {Array} history  - Array of { role, content } message objects
 * @param {string} tool    - Selected tool key (default: 'auto')
 * @returns {Promise<string>} The assistant's reply text
 */
export const sendMessage = async (history, tool = 'auto') => {
  const basePrompt = TOOL_PROMPTS[tool] || TOOL_PROMPTS.auto
  const systemPrompt = `${basePrompt}\n\n${getCurrentDateContext()}`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(({ role, content }) => ({ role, content })),
  ]

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: false,
    }),
  })

  if (!response.ok) {
    const errText = await response.text().catch(() => 'Unknown error')
    throw new Error(`Ollama error ${response.status}: ${errText}`)
  }

  const data = await response.json()
  return data?.message?.content || 'Sorry, I did not receive a response.'
}
