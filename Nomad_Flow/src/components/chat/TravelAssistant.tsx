'use client';

import { useEffect, useRef, useState } from 'react';
import { DefaultChatTransport } from 'ai';
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function TravelAssistant() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);
  const [input, setInput] = useState('');

  const { messages, sendMessage, status, stop } = useChat({
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
    <div className="mx-auto flex w-full max-w-3xl flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
            Travel assistant
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Nomad Flow AI</h2>
        </div>
        <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          Live itinerary help
        </div>
      </header>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-[60vh] min-h-[360px] overflow-y-auto bg-slate-50 px-3 py-4 sm:px-5"
        >
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-md rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
                Ask about a destination, trip length, budget, or day-by-day itinerary.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isUser = message.role === 'user';
                const textContent = message.parts
                  .filter((part) => part.type === 'text')
                  .map((part) => part.text)
                  .join('');

                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={[
                        'max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ring-1 ring-inset',
                        isUser
                          ? 'bg-sky-600 text-white ring-sky-500'
                          : 'bg-white text-slate-800 ring-slate-200',
                      ].join(' ')}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap text-sm leading-7">{textContent}</p>
                      ) : (
                        <div className="text-sm leading-7 text-slate-800">
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
                                  className="text-sky-700 underline underline-offset-2"
                                >
                                  {children}
                                </a>
                              ),
                              code: ({ children, className }) => (
                                <code
                                  className={[
                                    'rounded bg-slate-100 px-1.5 py-0.5 text-[0.82em]',
                                    className,
                                  ].join(' ')}
                                >
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="mb-3 overflow-x-auto rounded-xl bg-slate-100 p-3 text-[0.82rem] leading-6 text-slate-700">
                                  {children}
                                </pre>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="mb-3 border-l-2 border-slate-300 pl-3 text-slate-600">
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
                      )}
                    </div>
                  </div>
                );
              })}

              {showThinkingIndicator && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
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
            </div>
          )}
        </div>

        {!isPinnedToBottom && (
          <button
            type="button"
            onClick={jumpToLatest}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-md transition hover:bg-slate-50"
          >
            Jump to latest
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
            placeholder="Plan my 5-day Kyoto trip..."
            disabled={status !== 'ready'}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
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
            <p className="text-xs text-slate-500">Need a practical itinerary? Ask away.</p>

            <div className="flex items-center gap-2">
              {(status === 'submitted' || status === 'streaming') && (
                <button
                  type="button"
                  onClick={() => stop()}
                  className="rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Stop
                </button>
              )}

              <button
                type="submit"
                disabled={status !== 'ready' || !input.trim()}
                className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300"
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
