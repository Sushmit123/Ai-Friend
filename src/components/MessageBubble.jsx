import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * MessageBubble — Renders a single chat message (user or AI)
 */

const TOOL_ICONS = {
  weather_tool: "🌤",
  news_tool: "📰",
  web_search: "🔍",
  calculator: "🧮",
  code_tool: "💻",
  interview: "🎯",
  memory_tool: "🧠",
  direct: "💬",
  auto: "✨",
};

const TOOL_LABELS = {
  weather_tool: "weather_tool()",
  news_tool: "news_tool()",
  web_search: "web_search_tool()",
  calculator: "calculator_tool()",
  code_tool: "code_tool()",
  interview: "interview_tool()",
  memory_tool: "memory_tool()",
  direct: "Direct Answer",
  auto: "Auto",
};

const formatTime = (date) => {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const MessageBubble = ({ message }) => {
  const { role, content, timestamp, toolUsed } = message;
  const isUser = role === "user";
  const [visibleContent, setVisibleContent] = useState("");

  useEffect(() => {
    if (isUser) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleContent(content);
      return;
    }

    let visibleLength = 0;
    const timer = window.setInterval(() => {
      visibleLength = Math.min(content.length, visibleLength + 24);
      setVisibleContent(content.slice(0, visibleLength));

      if (visibleLength === content.length) window.clearInterval(timer);
    }, 18);

    return () => window.clearInterval(timer);
  }, [content, isUser]);

  return (
    <div className={`message-row ${isUser ? "user" : "ai"}`}>
      {/* Tool badge for AI messages */}
      {!isUser && toolUsed && toolUsed !== "auto" && (
        <div className="tool-badge">
          {TOOL_ICONS[toolUsed] || "🔧"}
          &nbsp;Using {TOOL_LABELS[toolUsed] || toolUsed}
        </div>
      )}

      {/* Bubble */}
      <div className="message-bubble">
        {isUser ? (
          content
        ) : (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {visibleContent}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Timestamp */}
      <div className="message-meta">
        {isUser ? "You" : "AI Friend"} • {formatTime(timestamp)}
      </div>
    </div>
  );
};

export default MessageBubble;
