import { Activity, CheckCircle2, Database, Gauge, Server, ShieldCheck } from 'lucide-react';

export default async function HealthPage() {
  try {
    await fetch('https://jsonplaceholder.typicode.com/todos/1', { cache: 'no-store' });
  } catch {
    // The demo health display remains available if the sample endpoint is unreachable.
  }

  const checkedAt = new Date().toISOString();
  const metrics = [
    { label: 'API latency', value: '42 ms', icon: Activity, tone: 'text-sky-300' },
    { label: 'Database', value: 'Connected', icon: Database, tone: 'text-emerald-300' },
    { label: 'Uptime', value: '99.98%', icon: Gauge, tone: 'text-amber-300' },
  ];

  return (
    <main className="min-h-screen bg-transparent px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Platform monitoring</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">System Health</h1>
            <p className="mt-2 text-sm text-slate-400">A real-time overview of Nomad Flow’s core services.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </span>
        </div>

        <section className="mt-8 rounded-3xl border border-white/15 bg-slate-800/50 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/30 hover:bg-slate-800/65">
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {metrics.map(({ label, value, icon: Icon, tone }) => (
            <article key={label} className="rounded-3xl border border-white/15 bg-slate-800/50 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/30 hover:bg-slate-800/65">
              <Icon className={`h-5 w-5 ${tone}`} />
              <p className="mt-4 text-xs font-medium text-slate-300">{label}</p>
              <p className="mt-1 text-2xl font-bold text-white">{value}</p>
            </article>
          ))}
        </section>

      </section>
    </main>
  );
}