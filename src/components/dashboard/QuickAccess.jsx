import React from 'react';
import { ArrowUpRight, Hospital, Pill, ShoppingBasket, Stethoscope } from 'lucide-react';

const items = [
  { title: 'Find a doctor', description: 'Browse specialists, compare consultation fees and request a visit.', Icon: Stethoscope, color: 'violet', page: 'Find Doctor' },
  { title: 'Find a clinic', description: 'Compare care services, opening hours and locations.', Icon: Hospital, color: 'cyan', page: 'Find Clinic' },
  { title: 'Pharmacy & medicines', description: 'Search the medicine catalogue and add items to your basket.', Icon: Pill, color: 'green', page: 'Find Pharmacy' },
  { title: 'Marketplace', description: 'Shop groceries, Afghan meals, coffee and breakfast products.', Icon: ShoppingBasket, color: 'orange', page: 'Marketplace' },
];

export default function QuickAccess({ navigate }) {
  return <section className="mb-8"><span className="eyebrow">QUICK ACCESS</span><h2 className="section-title">What do you need today?</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{items.map(({ title, description, Icon, color, page }) => <button key={page} onClick={() => navigate(page)} className="quick-card text-left"><span className={`quick-icon ${color}`}><Icon size={22} /></span><h3>{title}</h3><p>{description}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600">Open section <ArrowUpRight size={14} /></span></button>)}</div></section>;
}
