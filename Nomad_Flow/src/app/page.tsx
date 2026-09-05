'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Bot, BriefcaseBusiness, Calendar, Camera, CloudSun, Code2, Mail, MapPin, MessageCircle, Pause, Play, Search, Sparkles } from 'lucide-react';

const BACKGROUND_SLIDES = [
  { name: 'Amalfi Coast', image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=85&w=2200&auto=format&fit=crop' },
  { name: 'Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2200&auto=format&fit=crop' },
  { name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=85&w=2200&auto=format&fit=crop' },
  { name: 'Santorini', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=85&w=2200&auto=format&fit=crop' },
];

const RECOMMENDATIONS = [
  { name: 'Kyoto, Japan', tag: 'Cultural', image: BACKGROUND_SLIDES[1].image, description: 'Temples, tea houses, and autumn colour.' },
  { name: 'Zermatt, Switzerland', tag: 'Mountain', image: BACKGROUND_SLIDES[2].image, description: 'Crisp alpine air and remarkable trails.' },
  { name: 'Santorini, Greece', tag: 'Island', image: BACKGROUND_SLIDES[3].image, description: 'Blue domes, sea views, and slow evenings.' },
];

const getCountdown = () => {
  const difference = new Date('2027-05-12T00:00:00').getTime() - Date.now();
  return Math.max(0, Math.ceil(difference / 86_400_000)) + ' days to go';
};

export default function Home() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [location, setLocation] = useState('Amalfi Coast, Italy');
  const [dates, setDates] = useState('');
  const [countdown, setCountdown] = useState(getCountdown);
  const currentSlide = useMemo(() => BACKGROUND_SLIDES[activeSlide], [activeSlide]);

  useEffect(() => {
    BACKGROUND_SLIDES.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % BACKGROUND_SLIDES.length), 6000);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const interval = window.setInterval(() => setCountdown(getCountdown()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = new URLSearchParams({ location });
    if (dates) query.set('date', dates);
    router.push('/explore?' + query.toString());
  };

  return (
    <main className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-transparent text-white">
      <div className="fixed inset-0 -z-10 h-full w-full">
        {BACKGROUND_SLIDES.map((slide, index) => (
          <img key={slide.name} src={slide.image} alt="" aria-hidden="true" className={['fixed inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out', index === activeSlide ? 'scale-105 opacity-100 transition-transform duration-[10000ms]' : 'scale-100 opacity-0'].join(' ')} />
        ))}
        <div className="fixed inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 pb-12 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <section className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100 backdrop-blur-xl"><Sparkles className="h-3.5 w-3.5 text-amber-300" />Your next escape starts here</p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">Where to Next, Nomad?</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">Build an itinerary, find fresh inspiration, and keep every part of your next adventure in one calm place.</p>

          <form onSubmit={handleSearch} className="mt-8 rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl sm:flex sm:items-end sm:gap-3 sm:p-4">
            <label className="block flex-1 text-xs font-semibold text-slate-200">Where do you want to go?<span className="mt-2 flex items-center gap-2 rounded-xl bg-slate-950/25 px-3 py-3 ring-1 ring-white/10"><MapPin className="h-4 w-4 text-sky-300" /><select value={location} onChange={(event) => setLocation(event.target.value)} className="w-full bg-transparent text-sm text-white outline-none"><option className="text-slate-900">Amalfi Coast, Italy</option><option className="text-slate-900">Kyoto, Japan</option><option className="text-slate-900">Zermatt, Switzerland</option><option className="text-slate-900">Santorini, Greece</option></select></span></label>
            <label className="mt-3 block flex-1 text-xs font-semibold text-slate-200 sm:mt-0">When are you going?<span className="mt-2 flex items-center gap-2 rounded-xl bg-slate-950/25 px-3 py-3 ring-1 ring-white/10"><Calendar className="h-4 w-4 text-sky-300" /><input value={dates} onChange={(event) => setDates(event.target.value)} type="date" className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]" /></span></label>
            <button type="submit" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold transition hover:bg-sky-500 sm:mt-0 sm:w-auto"><Search className="h-4 w-4" />Find trips</button>
          </form>
          <button onClick={() => router.push('/assistant')} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-sky-200"><Bot className="h-4 w-4 text-sky-300" />Plan with Nomad Flow AI <ArrowRight className="h-4 w-4" /></button>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <article className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Up next</p><h2 className="mt-2 text-2xl font-bold">Amalfi Coast Getaway</h2><p className="mt-1 flex items-center gap-1.5 text-sm text-slate-200"><MapPin className="h-4 w-4" />Amalfi, Italy · May 12–18, 2027</p></div><span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white">{countdown}</span></div>
            <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-slate-950/20 p-4 ring-1 ring-white/10"><CloudSun className="h-5 w-5 text-amber-300" /><p className="mt-3 text-xs text-slate-300">Forecast</p><p className="mt-1 text-sm font-bold">22°C · Sunny</p></div><div className="rounded-2xl bg-slate-950/20 p-4 ring-1 ring-white/10"><Calendar className="h-5 w-5 text-sky-300" /><p className="mt-3 text-xs text-slate-300">Duration</p><p className="mt-1 text-sm font-bold">7 days</p></div></div>
            <button onClick={() => router.push('/trips/amalfi-italy')} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-3 text-sm font-semibold transition hover:bg-sky-500">View Itinerary <ArrowRight className="h-4 w-4" /></button>
          </article>

          <section className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Curated for you</p><h2 className="mt-2 text-xl font-bold">Ready for a new view?</h2></div><button onClick={() => router.push('/explore')} className="text-sm font-semibold text-sky-200 hover:text-white">Explore all</button></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">{RECOMMENDATIONS.map((destination) => <button key={destination.name} onClick={() => router.push('/explore')} className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/20 text-left transition hover:-translate-y-1 hover:bg-white/10"><div className="relative h-24 overflow-hidden"><img src={destination.image} alt={destination.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /><span className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-1 text-[10px] font-semibold text-white">{destination.tag}</span></div><div className="p-3"><p className="text-sm font-semibold">{destination.name}</p><p className="mt-1 text-xs leading-5 text-slate-300">{destination.description}</p></div></button>)}</div>
          </section>
        </section>
      </div>

      <div className="relative z-10 mx-auto mb-6 flex items-center gap-3 rounded-full border border-white/15 bg-slate-950/25 px-3 py-2 backdrop-blur-xl">
        {BACKGROUND_SLIDES.map((slide, index) => <button key={slide.name} onClick={() => setActiveSlide(index)} aria-label={'Show ' + slide.name + ' background'} className={['h-2.5 rounded-full transition-all', index === activeSlide ? 'w-7 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/75'].join(' ')} />)}
        <span className="h-4 w-px bg-white/20" /><button onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'} className="grid h-7 w-7 place-items-center rounded-full text-white transition hover:bg-white/15">{isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}</button>
      </div>
      <p className="relative z-10 mb-5 hidden text-center text-xs text-white/65 sm:block">Now showing: {currentSlide.name}</p>

      <footer className="hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-white"><img src="/Logo.jpeg" alt="Nomad Flow" className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/10" />Nomad Flow</div>
            <p className="mt-3 max-w-xs text-sm leading-6">Elevating travel planning with intelligent insights.</p>
            <p className="mt-4 text-xs text-slate-400">© 2026 Nomad Flow. All rights reserved.</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <a href="mailto:support@nomadflow.com" className="mt-3 inline-flex items-center gap-2 text-sm transition-colors hover:text-sky-400"><Mail className="h-4 w-4" />support@nomadflow.com</a>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Follow the journey</h2>
            <div className="mt-3 flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="transition-colors hover:text-sky-400"><MessageCircle className="h-5 w-5" /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-sky-400"><Code2 className="h-5 w-5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-sky-400"><Camera className="h-5 w-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-sky-400"><BriefcaseBusiness className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
