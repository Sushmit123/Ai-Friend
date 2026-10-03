/**
 * Header — Top navigation bar with brand, status, AI flow info, and tool selector
 */

const TOOLS = [
  { value: 'auto',          label: '✨ Auto',               group: 'mode' },
  { value: 'direct',        label: '💬 Direct Answer',      group: 'mode' },
  { value: 'weather_tool',  label: '🌤 weather_tool()',      group: 'tool' },
  { value: 'news_tool',     label: '📰 news_tool()',         group: 'tool' },
  { value: 'web_search',    label: '🔍 web_search_tool()',   group: 'tool' },
  { value: 'calculator',    label: '🧮 calculator_tool()',   group: 'tool' },
  { value: 'code_tool',     label: '💻 code_tool()',         group: 'tool' },
  { value: 'interview',     label: '🎯 interview_tool()',    group: 'tool' },
  { value: 'memory_tool',   label: '🧠 memory_tool()',       group: 'tool' },
]

const Header = ({ selectedTool, onToolChange }) => {
  return (
    <header className="app-header">
      {/* Brand */}
      <div className="header-brand">
        <div className="brand-icon">🤖</div>
        <span className="brand-name">AI Friend</span>
        <div className="status-badge">
          <span className="status-dot" />
          Mistral AI • Online
        </div>
      </div>

      {/* Right side */}
      <div className="header-right">
        {/* AI flow info */}
        <div className="ai-flow-info">
          <span>Mistral</span>
          <span className="flow-arrow">↓</span>
          <span>Understands</span>
          <span className="flow-arrow">↓</span>
          <span>Answer / Tool</span>
          <span className="flow-arrow">↓</span>
          <span>Response</span>
        </div>

        {/* Tool selector */}
        <div className="tool-selector-wrap">
          <select
            className="tool-select"
            value={selectedTool}
            onChange={(e) => onToolChange(e.target.value)}
            aria-label="Select tool or mode"
          >
            <optgroup label="Mode">
              {TOOLS.filter(t => t.group === 'mode').map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </optgroup>
            <optgroup label="Tools">
              {TOOLS.filter(t => t.group === 'tool').map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </optgroup>
          </select>
          <span className="tool-select-arrow">▾</span>
        </div>
      </div>
    </header>
  )
}

export default Header
