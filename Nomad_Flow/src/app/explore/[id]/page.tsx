'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';

const EXPLORE_DETAILS = {
  'santorini-greece': {
    id: 'santorini-greece',
    title: 'Santorini Sunset Clifftops',
    location: 'Cyclades, Greece',
    duration: 'Summer Peak',
    imageSrc: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Islands',
    description:
      'Watch the sun slip into the Aegean from volcanic cliffs, wander blue-domed lanes, and linger over local wines on sunset terraces.',
    highlights: ['Oia Sunset Walk', 'Red Beach', 'Volcanic Caldera', 'Fira Wine Bars'],
    bestTime: 'May – September',
    idealDuration: '3–5 Days',
    difficulty: 'Easy to Moderate',
    tips: [
      'Wi‑Fi is reliable in most hotels, but island views can drop to patchy signal on the cliffs.',
      'Rent a scooter or ATV in Fira for quick access to beaches and scenic viewpoints.',
      'Book sunset dinners and ferry transfers early during the high season.',
    ],
  },
  'patagonia-argentina': {
    id: 'patagonia-argentina',
    title: 'Patagonia Glacial Wilderness',
    location: 'Patagonia, Argentina',
    duration: 'Nov - March',
    imageSrc: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Hiking',
    description:
      'Explore high-altitude trails, dramatic granite ridges, and glacier-fed lakes while soaking in the raw beauty of southern Patagonia.',
    highlights: ['Perito Moreno Glacier', 'Mount Fitz Roy', 'Torres del Paine', 'Lake Pehoé'],
    bestTime: 'Nov – March',
    idealDuration: '5–7 Days',
    difficulty: 'Moderate to Challenging',
    tips: [
      'Wi‑Fi is available in major towns and lodges, but connections become sparse in remote park zones.',
      'Rent waterproof outer layers, trekking poles, and sturdy boots in El Calafate or Puerto Natales.',
      'Secure park entry permits and check all access restrictions before entering protected areas.',
    ],
  },
  'petra-jordan': {
    id: 'petra-jordan',
    title: 'Petra Lost City of Stone',
    location: 'Ma\'an Governorate, Jordan',
    duration: 'Spring / Autumn',
    imageSrc: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Heritage',
    description:
      'Follow the canyon walls into carved temples, hidden tombs, and centuries-old pathways that reveal a remarkable Nabataean legacy.',
    highlights: ['Siq Canyon', 'Treasury Facade', 'Royal Tombs', 'Monastery Trail'],
    bestTime: 'March – May',
    idealDuration: '2–4 Days',
    difficulty: 'Easy to Moderate',
    tips: [
      'Wi‑Fi is common in Wadi Musa and select hotel lobbies, but coverage is lighter in the canyon.',
      'Wear closed-toe shoes and carry extra water, especially for longer heritage walks.',
      'Check local entry rules and seasonal hours before arriving at the archaeological site.',
    ],
  },
  'banff-canada': {
    id: 'banff-canada',
    title: 'Banff Alpine Lakes',
    location: 'Alberta, Canada',
    duration: 'June - Sept',
    imageSrc: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=600&auto=format&fit=crop',
    categoryBadge: 'Outdoors',
    description:
      'Paddle on turquoise alpine waters, mountain-bike scenic routes, and wake to the crisp glow of the Canadian Rockies.',
    highlights: ['Lake Louise', 'Moraine Lake', 'Sulphur Mountain', 'Bow Valley'],
    bestTime: 'June – September',
    idealDuration: '4–6 Days',
    difficulty: 'Easy to Moderate',
    tips: [
      'Wi‑Fi is solid in town and at most resorts, with weaker service in the backcountry.',
      'Rent hiking gear, bear spray, and daylight-ready layers for the alpine trails.',
      'Carry park permits and stay aware of wildfire or trail advisory notices.',
    ],
  },
} as const;

export default function ExploreDestinationPage({ params }: { params: { id: string } }) {
  const destination = EXPLORE_DETAILS[params.id as keyof typeof EXPLORE_DETAILS];

  if (!destination) {
    return (
      <main className="min-h-screen bg-transparent px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-white/15 bg-slate-800/50 p-8 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-2xl">
          <h1 className="text-xl font-bold text-white">Destination not found</h1>
          <p className="mt-2 text-sm text-slate-300">This destination isn’t available yet.</p>
          <Link href="/explore" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">
            <ArrowLeft className="h-4 w-4" /> Back to Explore
          </Link>
        </div>
      </main>
    );
  }

  const handlePlanTrip = () => {
    if (typeof window === 'undefined') return;

    const prompt = `Plan a ${destination.title} trip for ${destination.location}. Focus on ${destination.highlights.slice(0, 3).join(', ')} and include a practical itinerary, budget guidance, and the best time to visit.`;

    window.dispatchEvent(
      new CustomEvent('nomadflow-open-assistant', {
        detail: { prompt },
      }),
    );
  };

  return (
    <main className="min-h-screen bg-transparent px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/explore" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-sky-300">
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>

        <section className="overflow-hidden rounded-[28px] border border-white/15 bg-slate-800/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-2xl">
          <img src={destination.imageSrc} alt={destination.title} className="h-72 w-full object-cover sm:h-96" />

          <div className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">{destination.categoryBadge}</span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">{destination.title}</h1>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-sky-300" /> {destination.location}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-sky-300" /> {destination.duration}</span>
              </div>
            </div>

            <p className="max-w-2xl text-base leading-7 text-slate-300">{destination.description}</p>

            <div className="bg-slate-800/60 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Key Highlights</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {destination.highlights.map((spot) => (
                    <div key={spot} className="rounded-2xl border border-white/10 bg-slate-900/40 p-3 text-sm text-slate-300">
                      <span className="inline-flex items-center gap-2 text-sky-300 font-medium">
                        <span className="h-2 w-2 rounded-full bg-sky-300" />
                        {spot}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">Practical Info</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Best Time to Visit</p>
                    <p className="mt-2 text-sm text-slate-200">{destination.bestTime}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Ideal Duration</p>
                    <p className="mt-2 text-sm text-slate-200">{destination.idealDuration}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Difficulty</p>
                    <p className="mt-2 text-sm text-slate-200">{destination.difficulty}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">Essential Nomad Tips</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  {destination.tips.map((tip) => (
                    <li key={tip} className="flex gap-3 rounded-2xl border border-white/10 bg-slate-900/30 p-3">
                      <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-sky-300" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlanTrip}
              className="w-full rounded-2xl bg-sky-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Plan this Trip with Nomad Flow AI
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
