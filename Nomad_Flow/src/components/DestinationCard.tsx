'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  title: string;
  subtext: string;
  imageSrc: string;
  categoryBadge: string;
  actionLabel?: string;
  destinationId?: string;
  href?: string;
  onActionClick?: () => void;
  metadata?: {
    location?: string;
    duration?: string;
  };
}

export default function DestinationCard({
  title,
  subtext,
  imageSrc,
  categoryBadge,
  actionLabel = 'Explore Trip',
  destinationId,
  href,
  onActionClick,
  metadata,
}: DestinationCardProps) {
  const destinationHref = href ?? (destinationId ? `/explore/${destinationId}` : '#');

  return (
    <div className="group flex h-full flex-col rounded-3xl border border-white/15 bg-slate-800/50 p-5 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/30 hover:bg-slate-800/65 active:scale-[0.98]">
      <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-slate-800">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
          {categoryBadge}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          {metadata && (
            <div className="mb-2 flex items-center gap-3 text-xs font-medium text-slate-300">
              {metadata.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-sky-300" />
                  {metadata.location}
                </span>
              )}
              {metadata.duration && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-sky-300" />
                  {metadata.duration}
                </span>
              )}
            </div>
          )}

          <h3 className="text-lg font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-sky-300">
            {title}
          </h3>
          <p className="mb-5 mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-300">
            {subtext}
          </p>
        </div>

        <Link
          href={destinationHref}
          aria-label={`Explore ${title}`}
          onClick={onActionClick}
          className="w-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium py-2.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
