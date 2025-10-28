"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Plus, Trash2, MessageCircle, User, Bot, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  confidence?: number;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

/* ------------ Mock data ---------- */
const nowIso = () => new Date().toISOString();

const initialSessions: ChatSession[] = [
  {
    id: "1",
    title: "Training Progress Discussion",
    messages: [
      {
        id: "m-1",
        text: "Hi! I'm your **AI Athlete Coach**. Ask me about your *training progress*, performance metrics, or get personalized recommendations.",
        isUser: false,
        timestamp: nowIso(),
        confidence: 92,
      },
    ],
    createdAt: nowIso(),
  },
];

const formatTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
      <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "0.12s" }} />
      <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "0.24s" }} />
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.isUser;
  const bubbleBase =
    "max-w-[82%] prose prose-sm dark:prose-invert p-3 rounded-lg break-words text-sm leading-relaxed";

  const userStyle = "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ml-auto text-white";
  const botStyle = "bg-card/70 text-foreground";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-3`}> 
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted grid place-items-center">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}

      <div className={`${bubbleBase} ${isUser ? userStyle : botStyle}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatTime(message.timestamp)}</span>
          {!isUser && message.confidence !== undefined && (
            <span className="ml-2">Confidence: <span className={
              message.confidence >= 85 ? "text-green-500" : message.confidence >= 75 ? "text-yellow-500" : "text-orange-500"
            }>{message.confidence}%</span></span>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary grid place-items-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}

function Sidebar({ sessions, current, onSelect, onNew, onDelete }: {
  sessions: ChatSession[];
  current: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <aside className="w-72 shrink-0 border-r border-border/50 bg-muted/10 p-3 flex flex-col">
      <div className="mb-3 p-1">
        <Button onClick={onNew} className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" /> New chat
        </Button>
      </div>

      <div className="text-xs font-semibold text-muted-foreground px-1 mb-2">Conversations</div>

      <div className="flex-1 space-y-2 overflow-auto"> 
        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-muted/60 ${
              current === s.id ? 'bg-primary/10 ring-1 ring-primary/20' : ''
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{s.title}</div>
              <div className="text-xs text-muted-foreground truncate">
                {new Date(s.createdAt).toLocaleDateString()}
              </div>
            </div>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                onDelete(s.id); 
              }} 
              className="opacity-0 group-hover:opacity-100 hover:bg-destructive/20 rounded p-1 transition-opacity duration-200"
              title="Delete conversation"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        Tip: Use the input box to ask about pace, recovery, strength, or nutrition.
      </div>
    </aside>
  );
}

/* ------------------------ Main Chat Component ------------------------ */
export default function ChatInterface() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const raw = localStorage.getItem("coach_sessions");
      return raw ? JSON.parse(raw) : initialSessions;
    } catch {
      return initialSessions;
    }
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(sessions[0]?.id || "1");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem("coach_sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ streamingMessage, isTyping]);

  const currentSession = sessions.find((s) => s.id === currentSessionId) || sessions[0];

function scrollToBottom() {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}

  function createNewSession() {
    const newS: ChatSession = { id: Date.now().toString(), title: "New conversation", messages: [
      { id: "welcome-" + Date.now().toString(), text: "Hi! I'm your **AI Athlete Coach**. What would you like to work on today?", isUser: false, timestamp: nowIso(), confidence: 90 }
    ], createdAt: nowIso() };
    setSessions(prev => [newS, ...prev]);
    setCurrentSessionId(newS.id);
  }

  function deleteSession(id: string) {
    if (sessions.length <= 1) return;
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) setCurrentSessionId(sessions[0].id);
  }

  function mockAIResponse(userText: string) {
    // simple keyword-based responses + a markdown example
    const lower = userText.toLowerCase();
    if (/(pace|speed|running|sprint)/.test(lower)) return { text: "**Pace improvement:** You've improved your average pace by **~5%** this week. Try these interval sessions:\n\n- 6x400m at 5k pace\n- 3x1k at threshold\n\n_Keep the long run easy and consistent._", confidence: 87 };
    if (/(recovery|sleep|rest|fatigue)/.test(lower)) return { text: "**Recovery status:** Your recovery score is high (92%). Prioritize sleep hygiene: consistent bedtime, cool room, and low screens 60 minutes before bed.", confidence: 94 };
    if (/(strength|lift|squat|bench)/.test(lower)) return { text: "**Strength update:** Bench +8%, Squat +12%. Consider adding 2 light weeks every 6 weeks to consolidate gains.", confidence: 89 };
    if (/(nutrition|calories|protein|diet)/.test(lower)) return { text: "**Nutrition:** Aim for ~1.6-2.0 g/kg protein daily. Include a post-workout meal with carbs + protein within 2 hours.", confidence: 83 };

    // fallback with a bit of markdown to show rendering
    return { text: "You're making steady progress.\n\n**Recommendation:** Focus one week on volume tolerance and the next on intensity.\n\nIf you'd like, paste a recent workout and I'll analyze it.", confidence: 80 };
  }

  async function handleSend() {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { id: `u-${Date.now()}`, text: input.trim(), isUser: true, timestamp: nowIso() };

    setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, messages: [...s.messages, userMsg] } : s));
    const userText = input.trim();
    setInput("");

    // Simulate typing + streaming output
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 600)); // small delay before bot starts

    const ai = mockAIResponse(userText);

    // streaming simulation: reveal text char-by-char in chunks
    const full = ai.text;
    let built = "";

    const streamId = `b-${Date.now()}`;
    setStreamingMessage({ id: streamId, text: "", isUser: false, timestamp: nowIso(), confidence: ai.confidence });

    const chunkSize = 8; // characters per tick
    for (let i = 0; i < full.length; i += chunkSize) {
      built += full.slice(i, i + chunkSize);
      setStreamingMessage({ id: streamId, text: built, isUser: false, timestamp: nowIso(), confidence: ai.confidence });
      // small jitter to feel natural
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 30 + Math.random() * 40));
    }

    // finalize
    setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, messages: [...s.messages, { id: streamId, text: full, isUser: false, timestamp: nowIso(), confidence: ai.confidence }] } : s));
    setStreamingMessage(null);
    setIsTyping(false);
  }

  // Keyboard handling: Ctrl+Enter for newline, Enter to send
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-[720px] w-full max-w-[1200px] mx-auto bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden" role="application" aria-label="AI Athlete Chat Interface">
      <Sidebar
        sessions={sessions}
        current={currentSessionId}
        onSelect={(id) => setCurrentSessionId(id)}
        onNew={createNewSession}
        onDelete={deleteSession}
      />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary/10 grid place-items-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-lg">Coachy </div>
              <div className="text-xs text-muted-foreground">Personal training insights & recommendations</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
  <Button 
    size="sm" 
    variant="ghost"
    onClick={() => { navigator.clipboard?.writeText(JSON.stringify(currentSession?.messages || [])); }}
    className="h-9 w-9 p-0 hover:bg-muted/50"
    title="Export conversation"
  >
    <Share2 className="h-4 w-4" />
  </Button>
</div>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-auto px-6 py-6" style={{ background: "linear-gradient(180deg, transparent, transparent)" }}>
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {(currentSession?.messages || []).map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}

            {streamingMessage && <MessageBubble message={streamingMessage} />}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted grid place-items-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-2 bg-card/80 p-3 rounded-lg">
                  <TypingIndicator />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

       <div className="px-6 py-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
  <div className="max-w-3xl mx-auto">
    <div className="relative">
      <div className="relative rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
        <textarea
          aria-label="Message input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Ask about your training, nutrition, or recovery... (e.g., 'How to improve my 5k pace?')"
          className="w-full resize-none bg-transparent py-4 pr-32 pl-6 text-sm placeholder:text-muted-foreground/70 focus:outline-none leading-relaxed"
        />
        
        <div className="absolute right-3 top-3 flex items-center gap-1">
          <Button 
            size="icon" 
            variant="ghost"
            onClick={() => { setInput((s) => s + "\n\n- My last workout: 10km @ 5:00/km\n- HR average 155"); }} 
            title="Insert sample workout"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>

          {input && (
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => setInput("")} 
              title="Clear message"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}

          <div className="w-px h-6 bg-border/50 mx-1"></div>

          <Button 
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isTyping} 
            aria-label="Send message" 
            className="h-9 w-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isTyping ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
    
    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>💡 Ask about training, nutrition, or recovery</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 text-xs bg-muted rounded border border-border/50">Enter</kbd>
        <span>to send</span>
        <kbd className="px-2 py-1 text-xs bg-muted rounded border border-border/50">Shift + Enter</kbd>
        <span>for new line</span>
      </div>
    </div>
  </div>
</div>
      </main>
    </div>
  );
}
