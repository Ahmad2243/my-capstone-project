'use client';

import React from 'react';
import DestinationCard from '@/components/DestinationCard';
import { useRouter } from 'next/navigation';

const MOCK_TRIPS = [
  {
    id: 'kyoto-japan',
    title: 'Kyoto Cultural Discovery',
    subtext: 'Wander through historical bamboo groves, serene zen gardens, and ancient shinto shrines.',
    imageSrc: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Cultural',
    metadata: {
      location: 'Kyoto, Japan',
      duration: '5 Days',
    },
  },
  {
    id: 'amalfi-italy',
    title: 'Amalfi Coastal Journey',
    subtext: 'Drive along dramatic seaside cliffs, explore colorful villages, and savor authentic Italian cuisine.',
    imageSrc: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Adventure',
    metadata: {
      location: 'Amalfi Coast, Italy',
      duration: '7 Days',
    },
  },
  {
    id: 'reykjavik-iceland',
    title: 'Icelandic Wonders',
    subtext: 'Bathe in geothermal hot springs, marvel at roaring waterfalls, and hunt the Northern Lights.',
    imageSrc: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Nature',
    metadata: {
      location: 'Reykjavik, Iceland',
      duration: '4 Days',
    },
  },
  {
    id: 'maui-hawaii',
    title: 'Maui Tropical Escape',
    subtext: 'Unwind on golden volcanic beaches, snorkel in crystalline reefs, and hike lush rainforest valleys.',
    imageSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Relaxation',
    metadata: {
      location: 'Maui, Hawaii',
      duration: '6 Days',
    },
  },
  {
    id: 'paris-france',
    title: 'Parisian Elegance',
    subtext: 'Indulge in iconic art galleries, charming sidewalk cafés, and world-renowned boutique shopping.',
    imageSrc: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'City Guide',
    metadata: {
      location: 'Paris, France',
      duration: '5 Days',
    },
  },
  {
    id: 'queenstown-nz',
    title: 'Queenstown Alpine Adventure',
    subtext: 'Experience world-class bungee jumping, scenic lake cruises, and majestic snowy peaks.',
    imageSrc: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Thrills',
    metadata: {
      location: 'Queenstown, New Zealand',
      duration: '8 Days',
    },
  },
];

export default function TripsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-transparent py-12">
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            Personal Itineraries
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-100">
            My Planned Trips
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Manage your dynamic travel itineraries and explore hand-crafted agendas for your upcoming wanderlust adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MOCK_TRIPS.map((trip) => (
            <DestinationCard
              key={trip.id}
              title={trip.title}
              subtext={trip.subtext}
              imageSrc={trip.imageSrc}
              categoryBadge={trip.categoryBadge}
              actionLabel="View Details"
              metadata={trip.metadata}
              onActionClick={() => router.push(`/trips/${trip.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
