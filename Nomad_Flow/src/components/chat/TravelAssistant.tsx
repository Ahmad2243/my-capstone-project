'use client';

import { useEffect, useRef, useState } from 'react';
import { DefaultChatTransport } from 'ai';
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Cloud, Loader2, AlertCircle } from 'lucide-react';

function RenderToolInvocation({ toolInvocation }: { toolInvocation: any }) {
  const { toolName, state } = toolInvocation;

  if (toolName !== 'getDestinationWeather' && toolName !== 'destinationWeatherTool') return null;

  // 1. Input Streaming State
  if (state === 'partial-call') {
    return (
      <div className="my-3 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50/50 p-3 text-xs text-blue-700 transition-all">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        <span>Nomad Flow is preparing weather lookup arguments...</span>
      </div>
    );
  }

  // 2. Input Available State
  if (state === 'call') {
    const location = toolInvocation.args?.location || toolInvocation.args?.city || toolInvocation.args?.destination;
    return (
      <div className="my-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-700 transition-all">
        <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
        <span>Fetching live weather details for <strong>{location || 'destination'}</strong>...</span>
      </div>
    );
  }

  // 3. Output Error State
  if (state === 'result' && toolInvocation.result?.error) {
    return (
      <div className="my-3 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 transition-all">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
        <div>
          <h4 className="font-semibold text-red-900">Weather Lookup Failed</h4>
          <p className="mt-1 text-red-700">{toolInvocation.result.error}</p>
        </div>
      </div>
    );
  }

  // 4. Output Available State (Custom UI Component)
  if (state === 'result' && toolInvocation.result) {
    const data = toolInvocation.result;
    return (
      <div className="my-4 rounded-xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-4 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between border-b border-cyan-100 pb-3">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-cyan-600" />
            <h4 className="text-sm font-semibold text-gray-900">{data.location || 'Destination Weather'}</h4>
          </div>
          <span className="text-2xl font-bold text-cyan-700">{data.temperature}°C</span>
        </div>

        <div className="my-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div><span className="font-medium text-gray-800">Condition:</span> {data.condition || 'Clear'}</div>
          <div><span className="font-medium text-gray-800">Humidity:</span> {data.humidity || '50%'}</div>
          <div><span className="font-medium text-gray-800">Wind:</span> {data.windSpeed || '10 km/h'}</div>
        </div>

        {data.recommendation && (
          <div className="mt-2 rounded-lg bg-slate-700/40 p-2.5 text-xs text-cyan-100 border-t border-cyan-700/20">
                      <strong className="text-cyan-100">Packing Advice:</strong> {data.recommendation}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default function TravelAssistant({ inModal, initialPrompt }: { inModal?: boolean; initialPrompt?: string }) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);
  const [input, setInput] = useState(initialPrompt ?? '');

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const showThinkingIndicator =
    (status === 'submitted' || (status === 'streaming' && messages[messages.length - 1]?.role === 'user')) &&
    messages.length > 0;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (isPinnedToBottom) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, status, isPinnedToBottom]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const threshold = 120;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < threshold;

    setIsPinnedToBottom(isNearBottom);
  };

  const jumpToLatest = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    setIsPinnedToBottom(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || status !== 'ready') return;

    sendMessage({ text: trimmed });
    setInput('');
  };

  return (
    <div className={[
        inModal ? 'flex flex-col h-full text-slate-100' : 'mx-auto flex w-full max-w-3xl flex-col rounded-3xl border border-white/15 bg-slate-800/50 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,6,23,0.6)]'
      ].join(' ')}>
      {!inModal && (
        <header className="flex items-center justify-between border-b border-slate-700/30 px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Travel assistant</p>
            <h2 className="text-lg font-semibold text-white">Nomad Flow AI</h2>
          </div>
          <div className="rounded-full bg-emerald-800/30 px-2.5 py-1 text-xs font-medium text-emerald-200">Live itinerary help</div>
        </header>
      )}

      <div className="relative flex-1">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={inModal ? 'flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-5' : 'h-[60vh] min-h-[360px] overflow-y-auto bg-slate-900/40 px-3 py-4 sm:px-5'}
        >
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-md rounded-2xl border border-dashed border-slate-700/30 bg-slate-800/60 p-6 text-center text-sm text-slate-300">
                Ask about a destination, trip length, budget, or day-by-day itinerary.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
        
              {messages.map((message) => {
                const isUser = message.role === 'user';
                const textContent =
                  message.parts
                    ?.filter((part) => part.type === 'text')
                    .map((part) => (part as any).text)
                    .join('') || (message as any).content || '';

                const toolInvocations =
                  message.parts
                    ?.filter((part: any) => part.type === 'tool-invocation' || part.toolInvocation)
                    .map((part: any) => part.toolInvocation || part) ||
                  (message as any).toolInvocations ||
                  [];

                return (
                  <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={[
                      'max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ring-1 ring-inset',
                      isUser
                        ? 'bg-sky-500/100 text-white shadow-lg ring-sky-400/40'
                                                : 'bg-slate-700/50 text-slate-100 ring-slate-600/30',
                      ].join(' ')}
                    >
                      {/* Render Tool UI Components */}
                      {toolInvocations.map((toolInvocation: any, index: number) => (
                        <RenderToolInvocation
                          key={toolInvocation.toolCallId || index}
                          toolInvocation={toolInvocation}
                        />
                      ))}

                      {/* Render Text Content with Custom ReactMarkdown Styling */}
                      {textContent && (
                        isUser ? (
                          <p className="whitespace-pre-wrap text-sm leading-7">{textContent}</p>
                        ) : (
                          <div className="text-sm leading-7 text-slate-100">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>,
                                ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>,
                                li: ({ children }) => <li className="leading-7">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sky-300 underline underline-offset-2"
                                  >
                                    {children}
                                  </a>
                                ),
                                code: ({ children, className }) => (
                                  <code
                                    className={[
                                      'rounded bg-slate-700/40 px-1.5 py-0.5 text-[0.82em] text-slate-100',
                                      className,
                                    ].join(' ')}
                                  >
                                    {children}
                                  </code>
                                ),
                                pre: ({ children }) => (
                                  <pre className="mb-3 overflow-x-auto rounded-xl bg-slate-800/60 p-3 text-[0.82rem] leading-6 text-slate-100">
                                    {children}
                                  </pre>
                                ),
                                blockquote: ({ children }) => (
                                  <blockquote className="mb-3 border-l-2 border-slate-600/30 pl-3 text-slate-100">
                                    {children}
                                  </blockquote>
                                ),
                                h1: ({ children }) => <h1 className="mb-3 text-lg font-semibold">{children}</h1>,
                                h2: ({ children }) => <h2 className="mb-3 text-base font-semibold">{children}</h2>,
                                h3: ({ children }) => <h3 className="mb-3 text-sm font-semibold">{children}</h3>,
                              }}
                            >
                              {textContent}
                            </ReactMarkdown>
                         </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}

              {showThinkingIndicator && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-700/30 bg-slate-900/60 px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500 [animation-delay:120ms]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500 [animation-delay:240ms]" />
                      </span>
                      Thinking...
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 shadow-sm max-w-[85%]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <div>
                      <p className="font-semibold text-rose-100">Request Error</p>
                      <p className="mt-1 text-rose-200">{error.message || 'Failed to get response from Nomad Flow AI. Please try again.'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {!isPinnedToBottom && (
          <button
            type="button"
            onClick={jumpToLatest}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-slate-700/40 bg-slate-900/60 px-3 py-2 text-xs font-medium text-slate-200 shadow-md transition hover:bg-slate-900/70"
          >
            Jump to latest
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-slate-700/30 bg-transparent px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
            placeholder="Plan my 5-day Kyoto trip..."
            disabled={status !== 'ready'}
            className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-sky-300 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                const trimmed = input.trim();
                if (!trimmed || status !== 'ready') return;
                sendMessage({ text: trimmed });
                setInput('');
              }
            }}
          />

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-200">Need a practical itinerary? Ask away.</p>

            <div className="flex items-center gap-2">
              {(status === 'submitted' || status === 'streaming') && (
                <button
                  type="button"
                  onClick={() => stop()}
                  className="rounded-full border border-slate-700/30 bg-slate-900/60 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-900/70"
                >
                  Stop
                </button>
              )}

              <button
                type="submit"
                disabled={status !== 'ready' || !input.trim()}
                className="rounded-full bg-sky-500/100 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {status === 'ready' ? 'Send' : 'Generating...'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}