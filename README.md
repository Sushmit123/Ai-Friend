# 🤖 AI Friend

A modern, responsive AI chat application with a friendly animated robot avatar, voice input/output, and multi-tool support — powered by **Mistral AI via Ollama** running locally on your machine.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Step 1 — Install Node.js](#step-1--install-nodejs)
7. [Step 2 — Install Ollama](#step-2--install-ollama)
8. [Step 3 — Pull the Mistral Model](#step-3--pull-the-mistral-model)
9. [Step 4 — Clone or Open the Project](#step-4--clone-or-open-the-project)
10. [Step 5 — Install Dependencies](#step-5--install-dependencies)
11. [Step 6 — Start Ollama](#step-6--start-ollama)
12. [Step 7 — Run the Development Server](#step-7--run-the-development-server)
13. [Step 8 — Using the App](#step-8--using-the-app)
14. [Tool Reference](#tool-reference)
15. [Voice Features](#voice-features)
16. [Robot States](#robot-states)
17. [Build for Production](#build-for-production)
18. [Configuration](#configuration)
19. [Troubleshooting](#troubleshooting)
20. [Browser Compatibility](#browser-compatibility)
21. [Project Scripts](#project-scripts)

---

## Overview

AI Friend is a full-screen two-column dashboard:

- **Left column** — chat interface where you type or speak your messages and see the conversation history.
- **Right column** — an animated SVG robot avatar that reacts to every state: idle, listening, thinking, speaking, and error.

The robot speaks every AI response aloud using your browser's built-in text-to-speech engine, and its mouth animates while speaking. You can also press the microphone button to use voice input — your speech is transcribed and sent to Mistral automatically.

---

## Features

| Feature | Details |
|---|---|
| 💬 Chat UI | Clean bubble-style conversation with timestamps |
| 🤖 Animated Robot | SVG avatar with idle, listening, thinking, speaking, error states |
| 🎤 Voice Input | Browser Speech-to-Text (Web Speech API) |
| 🔊 Voice Output | Text-to-Speech — robot speaks every AI reply |
| 🧠 Mistral AI | Local inference via Ollama, no cloud API key needed |
| 🛠 Tool Selector | 7 tools + Auto mode + Direct Answer mode |
| 📱 Responsive | Two-column desktop layout, stacked on mobile/tablet |
| ✨ Suggestion Chips | Quick-start prompts on the empty state screen |
| 🎨 Clean Design | White theme, Inter font, Bootstrap 5, subtle shadows |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.x |
| Build Tool | Vite | 8.x |
| CSS Framework | Bootstrap | 5.3.x |
| AI Backend | Mistral (via Ollama) | latest |
| Speech | Web Speech API | Browser built-in |
| Language | JavaScript (ESM) | ES2022+ |

---

## Project Structure

```
ai-friend/
├── index.html                  # App entry point, loads Inter font
├── package.json
├── vite.config.js
├── eslint.config.js
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── main.jsx                # React root, imports Bootstrap CSS
    ├── App.jsx                 # Root component — state, logic, orchestration
    ├── App.css                 # App-level style overrides
    ├── index.css               # All global styles, animations, layout
    │
    ├── components/
    │   ├── Header.jsx          # Top bar: brand, status, AI flow, tool selector
    │   ├── ChatColumn.jsx      # Left panel: messages, input, voice indicator
    │   ├── MessageBubble.jsx   # Single chat message (user or AI)
    │   ├── RobotColumn.jsx     # Right panel: robot + status label + EQ bars
    │   └── RobotAvatar.jsx     # Animated SVG robot (all states)
    │
    ├── hooks/
    │   └── useSpeech.js        # Web Speech API hook (TTS + STT)
    │
    └── services/
        └── mistral.js          # Ollama API client + tool prompt injection
```

---

## Prerequisites

Before running the app, make sure you have the following installed on your machine:

| Requirement | Minimum Version | Check Command |
|---|---|---|
| Node.js | 18.x or higher | `node --version` |
| npm | 9.x or higher | `npm --version` |
| Ollama | latest | `ollama --version` |
| A modern browser | Chrome 90+ recommended | — |

> **Note:** Voice input (microphone) works best in **Google Chrome** or **Microsoft Edge**. Firefox has limited Web Speech API support.

---

## Step 1 — Install Node.js

If you don't have Node.js installed:

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (recommended)
3. Run the installer and follow the prompts
4. Verify the installation:

```bash
node --version
# Should output: v18.x.x or higher

npm --version
# Should output: 9.x.x or higher
```

---

## Step 2 — Install Ollama

Ollama runs Mistral (and other LLMs) locally on your machine with no API key required.

### Windows

1. Go to [https://ollama.com/download](https://ollama.com/download)
2. Click **Download for Windows**
3. Run the installer (`OllamaSetup.exe`)
4. Ollama installs as a background service automatically

### macOS

```bash
# Option 1: Download from website
# Go to https://ollama.com/download and download the .dmg

# Option 2: Homebrew
brew install ollama
```

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Verify Ollama is installed

```bash
ollama --version
# Should output something like: ollama version 0.x.x
```

---

## Step 3 — Pull the Mistral Model

After installing Ollama, download the Mistral model. This is a one-time download (~4 GB).

```bash
ollama pull mistral
```

You'll see a progress bar. Wait for it to complete.

Verify the model is available:

```bash
ollama list
# Should show: mistral   latest   ...
```

> **Optional — Test the model directly in terminal:**
> ```bash
> ollama run mistral
> # Type: Hello!
> # Press Ctrl+D to exit
> ```

---

## Step 4 — Clone or Open the Project

### If you're starting fresh (cloning)

```bash
git clone <your-repo-url> ai-friend
cd ai-friend
```

### If you already have the project folder

Open a terminal and navigate to the project directory:

```bash
# Windows (Command Prompt)
cd "C:\Users\YourName\Downloads\AI Friend\ai-friend"

# Windows (PowerShell)
cd "C:\Users\YourName\Downloads\AI Friend\ai-friend"

# macOS / Linux
cd ~/Downloads/ai-friend
```

---

## Step 5 — Install Dependencies

Inside the `ai-friend` folder, install all npm packages:

```bash
npm install
```

This installs:
- `react` + `react-dom` — UI framework
- `bootstrap` — CSS framework
- `vite` + `@vitejs/plugin-react` — dev server & build tool
- `eslint` + plugins — linting

Expected output:

```
added 138 packages, and audited 138 packages in 14s
found 0 vulnerabilities
```

> If you see vulnerabilities, run `npm audit fix` (optional — dev dependencies only).

---

## Step 6 — Start Ollama

Ollama must be running in the background before you start the app.

### Windows

Ollama typically starts automatically as a Windows service after installation. Check the system tray (bottom-right) for the Ollama icon.

If it's not running, start it manually:

```bash
ollama serve
```

Leave this terminal open.

### macOS / Linux

```bash
ollama serve
```

Leave this terminal open, or run it as a background process:

```bash
ollama serve &
```

### Verify Ollama is running

Open your browser and go to:

```
http://localhost:11434
```

You should see: `Ollama is running`

---

## Step 7 — Run the Development Server

Open a **new terminal** (keep Ollama running in the other one), navigate to the project folder, and start Vite:

```bash
npm run dev
```

Expected output:

```
  VITE v8.x.x  ready in ~2000ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open your browser and go to:

```
http://localhost:5173
```

You should see the AI Friend dashboard with the animated robot on the right. 🎉

---

## Step 8 — Using the App

### Sending a text message

1. Click the text input at the bottom of the left column ("Type your message…")
2. Type your message — for example: `Hello!`
3. Press **Enter** or click the **➤ Send** button
4. Watch the robot enter **Thinking** state
5. The AI reply appears in the chat
6. The robot enters **Speaking** state and reads the response aloud
7. The robot returns to **Idle** when done

### Using voice input

1. Click the **🎤 microphone** button
2. A red "Listening… speak now" indicator appears at the top of the input area
3. The robot enters **Listening** state (eyes scan side to side)
4. Speak your message clearly
5. Your speech is automatically transcribed and sent to Mistral
6. The recognized text appears in the chat as your message
7. The AI replies and the robot speaks it

> Voice input requires microphone permission. Your browser will ask for permission the first time.

### Selecting a Tool

Use the dropdown in the top-right corner to control how Mistral responds:

| Selection | Behavior |
|---|---|
| ✨ Auto (default) | Mistral decides the best approach automatically |
| 💬 Direct Answer | Mistral answers directly without simulating a tool |
| 🌤 weather_tool() | Simulates a weather data fetch |
| 📰 news_tool() | Simulates fetching recent news headlines |
| 🔍 web_search_tool() | Simulates a web search with source references |
| 🧮 calculator_tool() | Evaluates math expressions with step-by-step working |
| 💻 code_tool() | Writes and explains code in markdown code blocks |
| 🎯 interview_tool() | Runs a mock interview session |
| 🧠 memory_tool() | References conversation history and context |

When a tool is used, a small yellow badge appears above the AI message bubble: `🌤 Using weather_tool()`

### Using suggestion chips

On the empty state screen (before your first message), click any suggestion chip to instantly send that message:
- `Hello! 👋`
- `What's the weather today?`
- `Explain React hooks`
- `Write a Python function`
- `Tell me the latest news`
- `2 + 2 × 10 = ?`

---

## Tool Reference

### ✨ Auto Mode
Mistral reads the context and automatically decides whether to answer directly or use a tool. This is the recommended default.

**Examples:**
- "What is 45 × 89?" → uses calculator_tool
- "Hello, how are you?" → direct answer
- "What's the weather in Paris?" → uses weather_tool

### 💬 Direct Answer
Bypasses all tool simulation. Mistral answers purely from its training knowledge. Best for: science, IT, general knowledge, coding concepts, conversation.

### 🌤 weather_tool()
Simulates a weather API response. Ask: `"What's the weather in Tokyo?"`
Returns: location, temperature, conditions, humidity, and a tip.

### 📰 news_tool()
Simulates a news feed. Ask: `"What's happening in tech today?"`
Returns: 3–4 headline summaries with a friendly comment.

### 🔍 web_search_tool()
Simulates a web search. Ask: `"Search for React 19 new features"`
Returns: 2–3 findings with references.

### 🧮 calculator_tool()
Evaluates math. Ask: `"Calculate (15 + 7) × 3 / 2"`
Returns: step-by-step working and final answer.

### 💻 code_tool()
Writes code. Ask: `"Write a Python function to reverse a string"`
Returns: formatted code block with explanation.

### 🎯 interview_tool()
Mock interview. Ask: `"Interview me for a React developer role"`
Returns: questions, sample answers, and feedback.

### 🧠 memory_tool()
Conversation context awareness. Ask: `"What did I ask you earlier?"`
Returns: references to prior context in the conversation.

---

## Voice Features

### Text-to-Speech (TTS)
- Every AI reply is spoken aloud automatically
- Uses the browser's built-in `SpeechSynthesis` API
- Prefers a natural English voice if available (Google, Natural, Samantha)
- Long responses are truncated to 500 characters for comfortable listening
- Code blocks are replaced with "code block" in speech
- The robot's mouth animates while speaking
- An audio equalizer animation plays below the robot

### Speech-to-Text (STT)
- Uses the browser's built-in `SpeechRecognition` / `webkitSpeechRecognition` API
- Language: English (en-US)
- Single utterance mode — stops listening after you finish speaking
- Transcribed text is shown in the chat as your message

### Browser support for voice

| Browser | TTS | STT |
|---|---|---|
| Chrome 90+ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ |
| Safari 14.1+ | ✅ | ⚠️ Limited |
| Firefox | ✅ | ❌ Not supported |

> For the best voice experience, use **Google Chrome**.

---

## Robot States

The robot on the right reacts to every interaction:

| State | Trigger | Animation | Status Text |
|---|---|---|---|
| 😊 **Idle** | App loaded / after speaking | Gentle breathing + head bob | Ready |
| 👂 **Listening** | Mic button pressed | Eyes scan left/right, green rings pulse | Listening... |
| 🤔 **Thinking** | Message sent, waiting for Mistral | Head nods, thought bubble shows | Thinking... |
| 🗣️ **Speaking** | AI reply received | Body bounces, mouth animates, EQ bars | Speaking... |
| 😬 **Error** | API/network error | Head shakes, red eyes, sad mouth | Oops! |

---

## Build for Production

To create an optimized production build:

```bash
npm run build
```

The output goes into the `dist/` folder. To preview it locally before deploying:

```bash
npm run preview
```

Then open: `http://localhost:4173`

### Deploy to a static host

The `dist/` folder is a standard static web app. You can deploy it to:

- **Netlify** — drag and drop the `dist/` folder
- **Vercel** — `vercel --prod`
- **GitHub Pages** — push `dist/` to `gh-pages` branch
- **Any web server** — copy `dist/` to your server's public folder

> **Important:** When deploying, Ollama still needs to run locally or on a server accessible to the app. For a truly hosted version, you would need to point `OLLAMA_URL` in `src/services/mistral.js` to a remote Ollama server with CORS configured.

---

## Configuration

### Change the Ollama URL or model

Open `src/services/mistral.js` and update these two constants at the top:

```js
const OLLAMA_URL = 'http://localhost:11434/api/chat'
const MODEL = 'mistral'
```

**To use a different model** (e.g., `llama3`, `phi3`, `gemma2`):
1. Pull it first: `ollama pull llama3`
2. Change `MODEL` to `'llama3'`

**To connect to a remote Ollama server:**
```js
const OLLAMA_URL = 'http://your-server-ip:11434/api/chat'
```

> Remote Ollama requires CORS to be enabled. See the [Ollama docs](https://github.com/ollama/ollama/blob/main/docs/faq.md) for `OLLAMA_ORIGINS` configuration.

### Change the default tool

In `src/App.jsx`, find this line and change `'auto'` to any tool key:

```js
const [selectedTool, setSelectedTool] = useState('auto')
```

Valid values: `'auto'`, `'direct'`, `'weather_tool'`, `'news_tool'`, `'web_search'`, `'calculator'`, `'code_tool'`, `'interview'`, `'memory_tool'`

### Customize suggestion chips

In `src/components/ChatColumn.jsx`, edit the `SUGGESTIONS` array:

```js
const SUGGESTIONS = [
  'Hello! 👋',
  "What's the weather today?",
  'Explain React hooks',
  // Add your own suggestions here
]
```

---

## Troubleshooting

### "Could not connect to Ollama"

**Cause:** Ollama is not running, or is running on a different port.

**Fix:**
1. Open a terminal and run: `ollama serve`
2. Visit `http://localhost:11434` in your browser — you should see "Ollama is running"
3. Make sure no firewall is blocking port `11434`

---

### "Ollama error 404" or model not found

**Cause:** The `mistral` model hasn't been pulled yet.

**Fix:**
```bash
ollama pull mistral
ollama list   # Verify it appears in the list
```

---

### Voice input not working

**Cause:** Speech recognition is not supported in your browser, or mic permission was denied.

**Fix:**
1. Use **Google Chrome** or **Microsoft Edge**
2. Make sure you allow microphone access when the browser asks
3. Check: `chrome://settings/content/microphone` — the site should be in the allowed list
4. On Windows, check: Settings → Privacy → Microphone → allow browser access

---

### Robot speaks but no sound

**Cause:** Browser TTS voices may not be loaded yet, or system volume is muted.

**Fix:**
1. Check your system volume
2. Try refreshing the page (voices load asynchronously)
3. In Chrome, go to `chrome://settings/content/sound` and make sure `localhost:5173` is not muted

---

### Blank page or React errors on startup

**Cause:** Missing dependencies or broken build.

**Fix:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

On Windows (PowerShell):
```powershell
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

---

### Port 5173 already in use

**Fix:** Either stop the other process, or start Vite on a different port:
```bash
npm run dev -- --port 3000
```

---

### Ollama CORS error (when deploying remotely)

**Fix:** Set the `OLLAMA_ORIGINS` environment variable before starting Ollama:

```bash
# Linux / macOS
OLLAMA_ORIGINS="https://your-domain.com" ollama serve

# Windows PowerShell
$env:OLLAMA_ORIGINS="https://your-domain.com"; ollama serve
```

---

## Browser Compatibility

| Feature | Chrome | Edge | Firefox | Safari |
|---|---|---|---|---|
| Chat UI | ✅ | ✅ | ✅ | ✅ |
| Robot animations | ✅ | ✅ | ✅ | ✅ |
| Text-to-Speech | ✅ | ✅ | ✅ | ✅ |
| Speech-to-Text | ✅ | ✅ | ❌ | ⚠️ |
| Responsive layout | ✅ | ✅ | ✅ | ✅ |

> **Recommended browser: Google Chrome** for full voice feature support.

---

## Project Scripts

All scripts are run from inside the `ai-friend/` folder.

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server at `http://localhost:5173` |
| `npm run build` | Build optimized production files into `dist/` |
| `npm run preview` | Serve the production build locally at `http://localhost:4173` |
| `npm run lint` | Run ESLint on all source files |

---

## Quick Start Summary

```bash
# 1. Install Ollama from https://ollama.com/download

# 2. Pull the Mistral model (one-time, ~4 GB)
ollama pull mistral

# 3. Start Ollama (keep this terminal open)
ollama serve

# 4. Open a new terminal, navigate to the project
cd "path/to/ai-friend"

# 5. Install dependencies
npm install

# 6. Start the app
npm run dev

# 7. Open in browser
# http://localhost:5173
```

---

## License

This project is for educational and personal use. Mistral AI models are subject to the [Mistral AI Terms of Use](https://mistral.ai/terms/).

---

*Built with React + Vite + Bootstrap + Mistral AI via Ollama*
