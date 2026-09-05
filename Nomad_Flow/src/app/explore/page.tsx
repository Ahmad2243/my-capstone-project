'use client';

import React, { useState } from 'react';
import DestinationCard from '@/components/DestinationCard';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft } from 'lucide-react';

const EXPLORE_SPOTS = [
  {
    id: 'santorini-greece',
    title: 'Santorini Sunset Clifftops',
    subtext: 'Soak in the famous volcanic crater views, blue-domed churches, and exquisite Aegean wines.',
    imageSrc: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Islands',
    metadata: {
      location: 'Cyclades, Greece',
      duration: 'Summer Peak',
    },
  },
  {
    id: 'patagonia-argentina',
    title: 'Patagonia Glacial Wilderness',
    subtext: 'Hike rugged mountain trails, view towering granite spires, and stand before pristine azure glaciers.',
    imageSrc: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Hiking',
    metadata: {
      location: 'Patagonia, Argentina',
      duration: 'Nov - March',
    },
  },
  {
    id: 'petra-jordan',
    title: 'Petra Lost City of Stone',
    subtext: 'Walk through the dramatic wind-carved sandstone canyons to uncover ancient monumental temples.',
    imageSrc: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Heritage',
    metadata: {
      location: 'Ma\'an Governorate, Jordan',
      duration: 'Spring / Autumn',
    },
  },
  {
    id: 'banff-canada',
    title: 'Banff Alpine Lakes',
    subtext: 'Canoe through brilliant turquoise waters and admire the epic snow-dusted Canadian Rockies.',
    imageSrc: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Outdoors',
    metadata: {
      location: 'Alberta, Canada',
      duration: 'June - Sept',
    },
  },
];

export default function ExplorePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Islands', 'Hiking', 'Heritage', 'Outdoors'];
  const visibleSpots = EXPLORE_SPOTS.filter((spot) => (activeFilter === 'All' || spot.categoryBadge === activeFilter) && spot.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-transparent py-12">
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-sky-300">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </button>
        </div>
        <div className="mb-10 text-center sm:text-left">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Global Spotlights
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-100">
            Discover Hidden Jewels
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Sift through highly recommended global hotspots curated specifically for remote workers, adventurers, and slow-travel digital nomads.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="flex max-w-md flex-1 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-slate-300">
              <Search className="h-4 w-4 text-sky-300" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search destinations" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" />
            </label>
            <div className="flex flex-wrap gap-2">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={['rounded-full px-3 py-1.5 text-xs font-semibold transition', activeFilter === filter ? 'bg-sky-600 text-white shadow-lg shadow-sky-950/40' : 'bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10'].join(' ')}>{filter}</button>)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {visibleSpots.map((spot) => (
            <DestinationCard
              key={spot.id}
              title={spot.title}
              subtext={spot.subtext}
              imageSrc={spot.imageSrc}
              categoryBadge={spot.categoryBadge}
              actionLabel="Explore Destination"
              destinationId={spot.id}
              metadata={spot.metadata}
              onActionClick={() => router.push(`/explore/${spot.id}`)}
            />
          ))}
        </div>
        {visibleSpots.length === 0 && <p className="rounded-2xl border border-dashed border-white/15 bg-slate-900/50 p-8 text-center text-sm text-slate-400">No destinations match that search yet.</p>}
      </section>
    </div>
  );
}
