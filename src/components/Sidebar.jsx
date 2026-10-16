import React from 'react';
import { Activity, LayoutDashboard, Stethoscope, Hospital, Pill, ShoppingBasket, CalendarDays, MessageCircle, HeartPulse, X, MapPinned, Settings } from 'lucide-react';
const links = [
    ['Dashboard', LayoutDashboard],
    ['Find Doctor', Stethoscope],
    ['Find Clinic', Hospital],
    ['Find Pharmacy', Pill],
    ['Marketplace', ShoppingBasket],
    ['Appointments', CalendarDays],
    ['Messages', MessageCircle],
    ['My Health', HeartPulse],
    ['Settings', Settings]
];
export default function Sidebar(
    {page,onNavigate,open,onClose,cartCount}) 
    { return <><div className={`fixed inset-0 z-40 bg-slate-950/40 lg:hidden 
    ${open?'block':'hidden'}`} onClick={onClose}/>
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-[#20234b] px-5 py-6 text-white transition-transform duration-300 lg:translate-x-0 
    ${open?'translate-x-0':'-translate-x-full'}`}>
        <div className="mb-9 flex items-center gap-3 px-2"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-brand-500">
            <Activity size={25}/></div>
            <div><b className="block text-xl tracking-tight">NovaCare</b><span className="text-[9px] font-bold tracking-[.18em] text-slate-400">HEALTH • LIFE • CARE</span></div>
            <button onClick={onClose} className="ml-auto rounded-lg p-2 text-slate-300 lg:hidden"><X size={18}/></button>
            </div>
            <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Workspace</div>
            <nav className="space-y-1">{links.map(([label,Icon])=>
                <button key={label} onClick={()=>{onNavigate(label);onClose()}} className={`nav-link ${page===label?'nav-link-active':''}`}>
                    <Icon size={19}/><span>{label}</span>{label==='Marketplace'&&cartCount>0&&<span className=
                    "ml-auto rounded-full bg-cyan-300 px-2 py-0.5 text-xs font-bold text-slate-900">{cartCount}</span>}</button>)}
            </nav>
                <div  className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-cyan-200">
                        <MapPinned size={17}/><span className="text-xs font-semibold">Made for Afghanistan</span>
                    </div><p className="text-xs leading-5 text-slate-400">Find care, manage visits and shop everyday essentials in one place.</p>
                    <div className="mt-3 flex gap-1"><span className="h-1.5 flex-1 rounded-full bg-cyan-300"/>
                    <span className="h-1.5 flex-1 rounded-full bg-white/25"/>
                    <span className="h-1.5 flex-1 rounded-full bg-white/25"/>
                    </div>
                </div>
                    <div className="mt-5 flex items-center gap-3 border-t border-white/10 px-2 pt-5">
                    <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"/>
                    <div><b className="block text-sm">Guest Patient</b><span className="text-xs text-slate-400">Personal account</span>
                    </div><span className="ml-auto h-2 w-2 rounded-full bg-emerald-400"/>
         </div>
     </aside></> }
