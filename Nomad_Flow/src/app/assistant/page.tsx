import TravelAssistant from '@/components/chat/TravelAssistant';

export default function AssistantPage() {
  return (
    <section className="mx-auto w-full max-w-6xl py-8 sm:py-12">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
          AI planner
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Nomad Flow Assistant
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Plan smarter trips with personalized recommendations, practical itineraries,
          and destination guidance built for travelers.
        </p>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50 p-3 shadow-sm sm:p-5">
        <TravelAssistant />
      </div>
    </section>
  );
}
