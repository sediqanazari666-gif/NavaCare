import React from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { appointments, doctors } from '../../data/mockData';
import { Rating } from '../UI';

export default function DashboardPanels({ navigate, book }) {
  return <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
    <section className="panel-card"><div className="mb-5 flex items-center justify-between"><div><span className="eyebrow">TODAY'S SCHEDULE</span><h2 className="section-title">Upcoming appointments</h2></div><button className="text-sm font-bold text-brand-600" onClick={() => navigate('Appointments')}>View all <ArrowUpRight className="ml-1 inline" size={15} /></button></div><div className="space-y-3">{appointments.slice(0, 5).map(a => <div key={a.id} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><div className="min-w-[78px] rounded-lg bg-white px-2 py-2 text-center text-xs font-bold text-brand-700 shadow-sm">{a.time}</div><div className="min-w-0 flex-1"><b className="block truncate text-sm text-slate-800">{a.doctor}</b><span className="text-xs text-slate-500">{a.specialty} · {a.patient}</span></div><span className={`status-pill ${a.status === 'Confirmed' ? 'status-green' : 'status-amber'}`}>{a.status}</span></div>)}</div><p className="mt-3 text-xs text-slate-400">15 sample appointments are available in the full daily schedule.</p></section>
    <section className="panel-card"><div className="mb-5"><span className="eyebrow">FEATURED PROVIDERS</span><h2 className="section-title">Recommended doctors</h2></div><div className="space-y-4">{doctors.slice(0, 4).map(d => <div key={d.id} className="flex items-center gap-3"><img src={d.image} alt={d.name} className="h-12 w-12 rounded-xl object-cover"/><div className="min-w-0 flex-1"><b className="block truncate text-sm">{d.name}</b><span className="text-xs text-slate-500">{d.specialty}</span></div><Rating value={d.rating}/><button className="icon-btn !h-9 !w-9" aria-label={`Request appointment with ${d.name}`} onClick={() => book(d)}><Plus size={16}/></button></div>)}</div><button className="btn-secondary mt-5 w-full" onClick={() => navigate('Find Doctor')}>Browse all doctors</button></section>
  </div>;
}
