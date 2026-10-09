import React from 'react';
import { Activity, ArrowUpRight, Hospital, Pill, ShoppingBasket, Stethoscope } from 'lucide-react';
import { doctors, clinics, pharmacies, stores } from '../../data/mockData';

const cards = [
  { label: 'Doctors listed', value: doctors.length, Icon: Stethoscope, color: 'bg-brand-50 text-brand-600', target: 'Find Doctor' },
  { label: 'Care centres', value: clinics.length, Icon: Hospital, color: 'bg-cyan-50 text-cyan-700', target: 'Find Clinic' },
  { label: 'Pharmacies', value: pharmacies.length, Icon: Pill, color: 'bg-emerald-50 text-emerald-700', target: 'Find Pharmacy' },
  { label: 'Marketplace stores', value: stores.length, Icon: ShoppingBasket, color: 'bg-orange-50 text-orange-700', target: 'Marketplace' },
];

export default function StatsGrid({ navigate }) {
  return <div className="mb-7 grid grid-cols-2 gap-3 xl:grid-cols-4">{cards.map(({ label, value, Icon, color, target }) => <button key={label} onClick={() => navigate(target)} className="stat-tile text-left"><div className="flex items-center justify-between"><span className={`grid h-11 w-11 place-items-center rounded-2xl ${color}`}><Icon size={21} /></span><ArrowUpRight size={17} className="text-slate-300" /></div><div className="mt-4 text-3xl font-extrabold text-slate-900">{value}</div><div className="mt-1 text-sm font-semibold text-slate-600">{label}</div><div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-2/3 rounded-full bg-brand-500" /></div></button>)}</div>;
}
