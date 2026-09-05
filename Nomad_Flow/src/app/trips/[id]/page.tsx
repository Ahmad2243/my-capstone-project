'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  CloudSun,
  DollarSign,
  MapPin,
  Plus,
} from 'lucide-react';

type Tab = 'itinerary' | 'budget' | 'packing';
type Expense = { name: string; amount: number; color: string };

type Trip = {
  title: string;
  location: string;
  dates: string;
  status: string;
  image: string;
  budget: number;
  spent: number;
  duration: string;
  weather: string;
  tripType: string;
  itinerary: Array<{
    day: string;
    title: string;
    date: string;
    activities: Array<{ time: string; title: string; description: string; tag: string }>;
  }>;
  expenses: Expense[];
  packing: Array<{ category: string; items: string[] }>;
};

const TRIPS: Record<string, Trip> = {
  'amalfi-italy': {
    title: 'Amalfi Coast Getaway',
    location: 'Amalfi, Italy',
    dates: 'May 12 – May 18, 2026',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=85&w=1800&auto=format&fit=crop',
    budget: 2400,
    spent: 1685,
    duration: '7 Days',
    weather: '22°C Sunny',
    tripType: 'Solo / Leisure',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Cliffside Walk', date: 'Tuesday, May 12', activities: [
        { time: '11:30', title: 'Arrive in Naples', description: 'Pick up your transfer and take in coastal views en route to Amalfi.', tag: 'Transit' },
        { time: '17:00', title: 'Amalfi waterfront stroll', description: 'Settle in, wander the marina, and enjoy a sunset aperitivo.', tag: 'Leisure' },
      ] },
      { day: 'Day 2', title: 'Boat Tour to Capri', date: 'Wednesday, May 13', activities: [
        { time: '09:00', title: 'Capri small-group boat tour', description: 'Cruise past sea caves and stop for a swim in clear Mediterranean water.', tag: 'Activity' },
        { time: '19:30', title: 'Dinner in Positano', description: 'Reserve a terrace table for local seafood and a golden-hour view.', tag: 'Food' },
      ] },
      { day: 'Day 3', title: 'Ravello Gardens & Wine', date: 'Thursday, May 14', activities: [
        { time: '10:00', title: 'Villa Rufolo gardens', description: 'Explore Ravello’s historic gardens and panoramic terraces.', tag: 'Culture' },
        { time: '16:00', title: 'Campanian wine tasting', description: 'Sample regional wines paired with small local bites.', tag: 'Food' },
      ] },
    ],
    expenses: [
      { name: 'Flight', amount: 620, color: 'bg-sky-500' },
      { name: 'Stay', amount: 780, color: 'bg-violet-500' },
      { name: 'Food', amount: 185, color: 'bg-amber-500' },
      { name: 'Activities', amount: 100, color: 'bg-emerald-500' },
    ],
    packing: [
      { category: 'Essentials', items: ['Passport & travel documents', 'Travel insurance details', 'Reusable water bottle'] },
      { category: 'Clothes', items: ['Lightweight walking shoes', 'Swimwear', 'Linen shirt or dress'] },
      { category: 'Tech', items: ['Phone charger', 'Portable power bank', 'Universal travel adapter'] },
    ],
  },
  'kyoto-japan': {
    title: 'Kyoto Cultural Discovery', location: 'Kyoto, Japan', dates: 'October 4 – October 8, 2026', status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=1800&auto=format&fit=crop', budget: 1950, spent: 1260,
    duration: '5 Days', weather: '19°C Clear', tripType: 'Couple / Cultural',
    itinerary: [
      { day: 'Day 1', title: 'Gion & Evening Lanterns', date: 'Sunday, October 4', activities: [
        { time: '14:00', title: 'Check in near Gion', description: 'Settle into your machiya-style stay before exploring the old quarter.', tag: 'Stay' },
        { time: '18:00', title: 'Gion walking tour', description: 'Follow lantern-lit lanes and learn about Kyoto’s living traditions.', tag: 'Culture' },
      ] },
      { day: 'Day 2', title: 'Arashiyama Morning', date: 'Monday, October 5', activities: [
        { time: '07:30', title: 'Bamboo grove visit', description: 'Beat the crowds with an early walk through the bamboo forest.', tag: 'Nature' },
        { time: '12:30', title: 'Tea ceremony', description: 'Experience a traditional matcha service in a quiet tea house.', tag: 'Culture' },
      ] },
    ],
    expenses: [
      { name: 'Flight', amount: 540, color: 'bg-sky-500' }, { name: 'Stay', amount: 510, color: 'bg-violet-500' },
      { name: 'Food', amount: 135, color: 'bg-amber-500' }, { name: 'Activities', amount: 75, color: 'bg-emerald-500' },
    ],
    packing: [
      { category: 'Essentials', items: ['Passport & rail pass', 'Cash and transit card', 'Refillable water bottle'] },
      { category: 'Clothes', items: ['Comfortable walking shoes', 'Light jacket', 'Modest temple outfit'] },
      { category: 'Tech', items: ['Camera', 'Power bank', 'Japan plug adapter'] },
    ],
  },
  'reykjavik-iceland': {
    title: 'Icelandic Wonders', location: 'Reykjavík, Iceland', dates: 'February 15 – February 18, 2027', status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=85&w=1800&auto=format&fit=crop', budget: 2850, spent: 2040,
    duration: '4 Days', weather: '3°C Cloudy', tripType: 'Friends / Adventure',
    itinerary: [
      { day: 'Day 1', title: 'Reykjavík Arrival', date: 'Monday, February 15', activities: [
        { time: '13:00', title: 'City centre check-in', description: 'Drop bags, then discover the harbour and colourful old town.', tag: 'Leisure' },
        { time: '20:30', title: 'Northern lights forecast check', description: 'Prepare for an evening excursion if the skies are clear.', tag: 'Nature' },
      ] },
      { day: 'Day 2', title: 'Golden Circle Route', date: 'Tuesday, February 16', activities: [
        { time: '08:00', title: 'Golden Circle day tour', description: 'Visit Þingvellir, Geysir, and Gullfoss with a local guide.', tag: 'Activity' },
        { time: '18:00', title: 'Blue Lagoon soak', description: 'Wind down with geothermal waters after a full day outdoors.', tag: 'Wellness' },
      ] },
    ],
    expenses: [
      { name: 'Flight', amount: 720, color: 'bg-sky-500' }, { name: 'Stay', amount: 860, color: 'bg-violet-500' },
      { name: 'Food', amount: 260, color: 'bg-amber-500' }, { name: 'Activities', amount: 200, color: 'bg-emerald-500' },
    ],
    packing: [
      { category: 'Essentials', items: ['Passport & insurance', 'Refillable water bottle', 'Sunscreen'] },
      { category: 'Clothes', items: ['Waterproof jacket', 'Thermal layers', 'Hiking boots'] },
      { category: 'Tech', items: ['Camera', 'Power bank', 'EU plug adapter'] },
    ],
  },
};

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('itinerary');
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const trip = TRIPS[params.id];
  const [expenses, setExpenses] = useState<Expense[]>(() => trip?.expenses ?? []);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');

  if (!trip) {
    return (
      <main className="min-h-screen bg-transparent px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-white/15 bg-slate-800/50 p-8 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-2xl">
          <h1 className="text-xl font-bold text-white">Trip not found</h1>
          <p className="mt-2 text-sm text-slate-300">This itinerary is not available yet.</p>
          <button onClick={() => router.push('/trips')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition-all">
            <ArrowLeft className="h-4 w-4" />Back to My Trips
          </button>
        </div>
      </main>
    );
  }

  const spent = expenses.reduce((total, expense) => total + expense.amount, 0);
  const progress = Math.min((spent / trip.budget) * 100, 100);
  const toggleItem = (item: string) => setCheckedItems((items) => items.includes(item) ? items.filter((checked) => checked !== item) : [...items, item]);
  const addExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(expenseAmount);

    if (!expenseName.trim() || !Number.isFinite(amount) || amount <= 0) return;

    const categoryColors: Record<string, string> = {
      Flight: 'bg-sky-500',
      Stay: 'bg-violet-500',
      Food: 'bg-amber-500',
      Activities: 'bg-emerald-500',
      Other: 'bg-slate-500',
    };

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { name: `${expenseCategory}: ${expenseName.trim()}`, amount, color: categoryColors[expenseCategory] },
    ]);
    setExpenseName('');
    setExpenseAmount('');
    setExpenseCategory('Food');
    setIsExpenseFormOpen(false);
  };
  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'itinerary', label: 'Day-by-Day Itinerary' }, { id: 'budget', label: 'Budget Breakdown' }, { id: 'packing', label: 'Packing List' },
  ];

  return (
    <main className="trip-detail-theme min-h-screen bg-transparent pb-14">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-3">
          <button onClick={() => router.push('/trips')} className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-sky-300">
            <ArrowLeft className="h-4 w-4" /> Back to My Trips
          </button>
          <button onClick={() => router.push('/')} className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-sky-300">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </button>
        </div>
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-sm">
          <img src={trip.image} alt={trip.location} className="h-72 w-full object-cover sm:h-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <span className="inline-flex rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold shadow-sm">{trip.status}</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{trip.title}</h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-100">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{trip.location}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{trip.dates}</span>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[{ label: 'Total Budget', value: formatCurrency(trip.budget), icon: DollarSign }, { label: 'Duration', value: trip.duration, icon: Calendar }, { label: 'Weather', value: trip.weather, icon: CloudSun }, { label: 'Trip Type', value: trip.tripType, icon: MapPin }].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-3xl border border-white/15 bg-slate-800/50 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/30 hover:bg-slate-800/65">
              <Icon className="h-5 w-5 text-sky-300" /><p className="mt-3 text-xs font-medium text-slate-300">{label}</p><p className="mt-1 text-sm font-bold text-white sm:text-base">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-white/15 bg-slate-800/50 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/30 hover:bg-slate-800/65 sm:p-6">
          <div className="border-b border-white/10"><div className="flex gap-5 overflow-x-auto" role="tablist">
            {tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${activeTab === tab.id ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}>{tab.label}</button>)}
          </div></div>
          <div className="pt-6">
            {activeTab === 'itinerary' && <div className="space-y-6">{trip.itinerary.map((day) => (
              <article key={day.day} className="relative pl-7 before:absolute before:bottom-0 before:left-[7px] before:top-8 before:w-px before:bg-slate-200 last:before:hidden">
                <span className="absolute left-0 top-1 h-4 w-4 rounded-full border-4 border-sky-100 bg-sky-600" />
                <div className="mb-3"><p className="text-sm font-bold text-slate-100">{day.day}: {day.title}</p><p className="text-xs text-slate-400">{day.date}</p></div>
                <div className="space-y-3">{day.activities.map((activity) => <div key={activity.time} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2 text-sm font-semibold text-slate-100"><Clock className="h-4 w-4 text-sky-300" />{activity.time} · {activity.title}</div><span className="rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">{activity.tag}</span></div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{activity.description}</p>
                </div>)}</div>
              </article>
            ))}</div>}

            {activeTab === 'budget' && <div className="max-w-2xl">
              <div className="rounded-xl bg-slate-50 p-5"><div className="flex items-end justify-between gap-3"><div><p className="text-sm font-semibold text-slate-900">Budget used</p><p className="mt-1 text-xs text-slate-500">{formatCurrency(spent)} of {formatCurrency(trip.budget)} planned</p></div><p className="text-lg font-bold text-sky-600">{Math.round(progress)}%</p></div><div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-sky-600 transition-all" style={{ width: `${progress}%` }} /></div></div>
              <div className="mt-5 divide-y divide-slate-100">{expenses.map((expense, index) => <div key={`${expense.name}-${index}`} className="flex items-center justify-between py-3"><div className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${expense.color}`} /><span className="text-sm font-medium text-slate-700">{expense.name}</span></div><span className="text-sm font-bold text-slate-900">{formatCurrency(expense.amount)}</span></div>)}</div>
              {isExpenseFormOpen ? <form onSubmit={addExpense} className="mt-5 rounded-xl border border-slate-200 bg-white p-4"><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-700">Expense name<input value={expenseName} onChange={(event) => setExpenseName(event.target.value)} placeholder="e.g. Sunset dinner" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" required /></label><label className="text-xs font-semibold text-slate-700">Amount<input value={expenseAmount} onChange={(event) => setExpenseAmount(event.target.value)} type="number" min="0.01" step="0.01" placeholder="0.00" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" required /></label></div><label className="mt-3 block text-xs font-semibold text-slate-700">Category<select value={expenseCategory} onChange={(event) => setExpenseCategory(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"><option>Flight</option><option>Stay</option><option>Food</option><option>Activities</option><option>Other</option></select></label><div className="mt-4 flex justify-end gap-3"><button type="button" onClick={() => setIsExpenseFormOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button><button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Save Expense</button></div></form> : <button onClick={() => setIsExpenseFormOpen(true)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700"><Plus className="h-4 w-4" />Add Expense</button>}
            </div>}

            {activeTab === 'packing' && <div className="grid gap-5 md:grid-cols-3">{trip.packing.map((group) => <section key={group.category} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/60"><h2 className="text-sm font-bold text-slate-900">{group.category}</h2><div className="mt-3 space-y-3">{group.items.map((item) => { const checked = checkedItems.includes(item); return <button key={item} onClick={() => toggleItem(item)} className="flex w-full items-start gap-2 text-left text-sm text-slate-600"><CheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${checked ? 'fill-sky-600 text-sky-600' : 'text-slate-300'}`} /><span className={checked ? 'text-slate-400 line-through' : ''}>{item}</span></button>; })}</div></section>)}</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
