import React from 'react';
import { Activity, ArrowUpRight, HeartPulse, MapPin, ShieldCheck } from 'lucide-react';

export default function DashboardHero({ navigate }) {
  return (
    <section className="hero-panel relative mb-7 overflow-hidden rounded-[28px] p-6 text-white sm:p-9">
      <div className="relative z-10 max-w-2xl">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
          <HeartPulse size={15} /> Your health, all in one place
        </span>
        <h1 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl">Better care starts with <span className="text-cyan-200">one simple search.</span></h1>
        <p className="mt-4 max-w-lg text-sm leading-6 text-white/75 sm:text-base">Discover doctors, clinics, pharmacies and everyday essentials across Afghanistan from one organised workspace.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => navigate('Find Doctor')} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-800 shadow-lg transition hover:-translate-y-0.5">Find a doctor <ArrowUpRight size={16} className="ml-2 inline" /></button>
          <button onClick={() => navigate('Marketplace')} className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20">Explore marketplace</button>
        </div>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/75"><span className="flex items-center gap-1.5"><ShieldCheck size={15} /> Classroom prototype</span><span className="flex items-center gap-1.5"><MapPin size={15} /> Kabul · Herat · Balkh · Kandahar</span></div>
      </div>
      <div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="hero-symbol"><Activity size={100} /></div>
    </section>
  );
}
