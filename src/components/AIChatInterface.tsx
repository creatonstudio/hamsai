/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquarePlus,
  Compass,
  Library,
  Clock,
  Image as ImageIcon,
  Video,
  Globe,
  Send,
  Paperclip,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

const navItems = [
  { icon: MessageSquarePlus, label: "New Chat" },
  { icon: Compass, label: "Explore" },
  { icon: Library, label: "Library" },
  { icon: Clock, label: "Chat History" },
];

interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  timestamp: Date;
}

export default function AIChatInterface() {
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileAttach = (type: "image" | "video") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "image" ? "image/*" : "video/*";
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        setAttachedFiles(prev => [...prev, ...Array.from(files)]);
      }
    };
    
    input.click();
  };

  const handleFetchFromAPI = () => {
    console.log("Fetch from API triggered");
  };

  const handleSendMessage = () => {
    if (message.trim() || attachedFiles.length > 0) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        text: message.trim(),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Reset input
      const currentMessage = message;
      setMessage("");
      setAttachedFiles([]);
      
      // Simulate AI response after 1 second
      setTimeout(() => {
        const aiResponses = [
          "I understand. Let me help you with that.",
          "That's an interesting question. Here's what I think...",
          "Based on your input, I can provide the following insights.",
          "Great! I'm processing your request now.",
          "I see what you mean. Let me elaborate on that.",
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          text: randomResponse,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Left Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full w-52 border-r border-gray-200/50 bg-white/60 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 p-3 space-y-1.5">
          {/* Logo/Brand with Close Button */}
          <div className="mb-6 px-2 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Aura AI
              </h1>
              <p className="text-[10px] text-muted-foreground mt-0.5">Cognition & Connection</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="h-6 w-6 hover:bg-purple-50"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-0.5">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 group h-9 text-xs"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="p-3 border-t border-gray-200/50">
          <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-purple-50/50 transition-all duration-200 cursor-pointer group">
            <Avatar className="w-8 h-8 ring-2 ring-purple-200/50 group-hover:ring-purple-300 transition-all">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-xs">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                John Doe
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                john.doe@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col p-6 overflow-hidden transition-all duration-300 ${
        isSidebarOpen ? 'ml-52' : 'ml-0'
      }`}>
        {/* Toggle Button (when sidebar is closed) */}
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-3 left-3 z-30 h-8 w-8 rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:bg-purple-50 shadow-md"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </Button>
        )}

        <div className="flex-1 flex flex-col items-center w-[80%] mx-auto">
          {/* Show greeting only when no messages */}
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-2 w-full">
              {/* Greeting Section */}
              <div className="text-center space-y-2 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  {getCurrentGreeting()}, John
                </h2>
                <p className="text-base text-muted-foreground">
                  How can I assist you today?
                </p>
              </div>

              {/* Chat Input Section - MOVED UP */}
              <div className="w-full max-w-2xl pt-4">
                {/* Single Unified Input Block with Rainbow Shadow */}
                <div className="relative floating floating-hover rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200/50 p-5 rainbow-shadow">
                  {/* Attached Files Preview */}
                  {attachedFiles.length > 0 && (
                    <div className="mb-3 pb-3 border-b border-gray-200/50">
                      <div className="flex flex-wrap gap-1.5">
                        {attachedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-purple-50/50 text-[10px]"
                          >
                            <Paperclip className="w-2.5 h-2.5 text-purple-500" />
                            <span className="max-w-[120px] truncate">{file.name}</span>
                            <button
                              onClick={() => setAttachedFiles(files => files.filter((_, i) => i !== index))}
                              className="text-gray-400 hover:text-red-500 text-sm"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main text area */}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message or command to the AI..."
                    className="w-full min-h-[96px] resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-sm placeholder:text-muted-foreground/60 mb-3"
                  />

                  {/* Bottom section with chips and send button */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-200/50">
                    {/* Quick Action Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      <Button
                        onClick={() => handleFileAttach("image")}
                        variant="ghost"
                        size="sm"
                        className="rounded-full gap-1.5 h-7 px-2.5 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span className="text-[10px]">Image</span>
                      </Button>
                      
                      <Button
                        onClick={() => handleFileAttach("video")}
                        variant="ghost"
                        size="sm"
                        className="rounded-full gap-1.5 h-7 px-2.5 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                      >
                        <Video className="w-3 h-3" />
                        <span className="text-[10px]">Video</span>
                      </Button>
                      
                      <Button
                        onClick={handleFetchFromAPI}
                        variant="ghost"
                        size="sm"
                        className="rounded-full gap-1.5 h-7 px-2.5 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
                      >
                        <Globe className="w-3 h-3" />
                        <span className="text-[10px]">API</span>
                      </Button>
                    </div>

                    {/* Send Button */}
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0 h-8 w-8"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Suggested Prompts - MOVED DOWN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-2xl pt-3">
                {[
                  "Generate a creative story",
                  "Analyze this image",
                  "Help me write code",
                  "Explain a complex topic"
                ].map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(prompt)}
                    className="p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-gray-200/50 hover:bg-white/60 hover:border-purple-200 text-left text-xs text-muted-foreground hover:text-foreground transition-all duration-200 floating-hover"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chat Messages Area */
            <div className="flex-1 w-full overflow-y-auto py-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.type === "user" ? (
                    /* User message with clean white bubble, thin border, and subtle gradient */
                    <div className="max-w-[75%] px-4 py-3 rounded-2xl bg-white dark:bg-card border border-gray-200/60 dark:border-gray-700/50 text-foreground shadow-sm relative overflow-hidden">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/20 dark:from-purple-900/10 dark:to-blue-900/5 pointer-events-none" />
                      <p className="text-sm leading-relaxed relative z-10">{msg.text}</p>
                    </div>
                  ) : (
                    /* AI message without bubble */
                    <div className="max-w-[75%]">
                      <p className="text-sm leading-relaxed text-foreground">{msg.text}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Chat Input Section - For Active Chat */}
          {messages.length > 0 && (
            <div className="w-full max-w-2xl space-y-3 pb-2">
              {/* Single Unified Input Block with Rainbow Shadow */}
              <div className="relative floating floating-hover rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200/50 p-5 rainbow-shadow">
                {/* Attached Files Preview */}
                {attachedFiles.length > 0 && (
                  <div className="mb-3 pb-3 border-b border-gray-200/50">
                    <div className="flex flex-wrap gap-1.5">
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-purple-50/50 text-[10px]"
                        >
                          <Paperclip className="w-2.5 h-2.5 text-purple-500" />
                          <span className="max-w-[120px] truncate">{file.name}</span>
                          <button
                            onClick={() => setAttachedFiles(files => files.filter((_, i) => i !== index))}
                            className="text-gray-400 hover:text-red-500 text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main text area */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message or command to the AI..."
                  className="w-full min-h-[96px] resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-sm placeholder:text-muted-foreground/60 mb-3"
                />

                {/* Bottom section with chips and send button */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-200/50">
                  {/* Quick Action Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    <Button
                      onClick={() => handleFileAttach("image")}
                      variant="ghost"
                      size="sm"
                      className="rounded-full gap-1.5 h-7 px-2.5 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span className="text-[10px]">Image</span>
                    </Button>
                    
                    <Button
                      onClick={() => handleFileAttach("video")}
                      variant="ghost"
                      size="sm"
                      className="rounded-full gap-1.5 h-7 px-2.5 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                    >
                      <Video className="w-3 h-3" />
                      <span className="text-[10px]">Video</span>
                    </Button>
                    
                    <Button
                      onClick={handleFetchFromAPI}
                      variant="ghost"
                      size="sm"
                      className="rounded-full gap-1.5 h-7 px-2.5 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
                    >
                      <Globe className="w-3 h-3" />
                      <span className="text-[10px]">API</span>
                    </Button>
                  </div>

                  {/* Send Button */}
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0 h-8 w-8"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}