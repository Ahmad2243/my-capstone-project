'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bot, X } from 'lucide-react';
import TravelAssistant from '@/components/chat/TravelAssistant';
import Logo from '@/components/Logo';

export default function AssistantModal() {
  const [open, setOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState('');
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setInitialPrompt('');
      }
    };

    const handleOpenAssistant = (event: Event) => {
      const customEvent = event as CustomEvent<{ prompt?: string }>;
      setInitialPrompt(customEvent.detail?.prompt ?? '');
      setOpen(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('nomadflow-open-assistant', handleOpenAssistant);
    }

    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('nomadflow-open-assistant', handleOpenAssistant);
      }
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeAssistant = () => {
    setOpen(false);
    setInitialPrompt('');
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeAssistant();
    }
  };

  const modalContent = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="w-full flex flex-col h-full rounded-3xl bg-slate-900 border border-white/20 shadow-2xl overflow-hidden">

          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Travel Assistant</p>
                <h3 className="text-lg font-semibold text-white">Nomad Flow AI</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-800/30 px-3 py-1 text-xs font-medium text-emerald-200">Live itinerary help</span>
              <button
                ref={closeButtonRef}
                onClick={closeAssistant}
                aria-label="Close assistant"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content area - ensure only messages scroll */}
          <div className="flex-1 min-h-0">
            {/* TravelAssistant will render header when not inModal; we want only messages area to scroll */}
            <div className="flex flex-col h-full">
              <div className="flex-1 min-h-0 overflow-y-auto">
                <TravelAssistant inModal initialPrompt={initialPrompt} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium ring-1 ring-white/20 transition hover:bg-white/20"
      >
        <Bot className="h-4 w-4" />
        AI Assistant
      </button>

      {open && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
}
