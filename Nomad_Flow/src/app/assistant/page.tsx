import TravelAssistant from '@/components/chat/TravelAssistant';

export default function AssistantPage() {
  return (
    <section className="mx-auto w-full max-w-6xl py-8 sm:py-12 bg-transparent">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
          AI planner
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Nomad Flow Assistant
        </h1>
        <p className="max-w-2xl text-sm text-slate-100 sm:text-base">
          Plan smarter trips with personalized recommendations, practical itineraries,
          and destination guidance built for travelers.
        </p>
      </div>

      <TravelAssistant />
    </section>
  );
}
