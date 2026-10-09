import React from 'react';
import {MessageCircle,HeartPulse,ShieldCheck,Send,ClipboardList,CalendarCheck} 
from 'lucide-react';
import {PageTitle} 
from '../components/UI';
export function MessagesPage(){
    return <><PageTitle eyebrow="CARE COMMUNICATION" title="Messages" description=
    "A sample inbox layout for clinic follow-ups and appointment reminders."/>
    <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <div className="panel-card">
            <h2 className="mb-4 font-extrabold">Recent conversations</h2>
            {[['Ariana Medical Center','Appointment instructions','10:24 AM'],
            ['Dr. Laila Ahmadi','Please bring previous test results','Yesterday'],
            ['NovaCare Support','Welcome to the demo','Mon']].map(([n,m,t],i)=>
            <div key={n} className={`flex gap-3 border-b border-slate-100 py-4 last:border-0 
                ${i===0?'rounded-xl bg-brand-50 px-3':''}`}><span className=
                "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-brand-600 shadow-sm">
                    <MessageCircle size={18}/></span><span className="min-w-0 flex-1"><b className="block text-sm">{n}</b>
                    <small className="block truncate text-xs text-slate-500">{m}</small></span>
                    <small className="text-[10px] text-slate-400">{t}</small>
            </div>)}
        </div>
        <div className="flex min-h-[380px] flex-col rounded-2xl border border-slate-200 bg-white p-5">
            <div className="border-b border-slate-100 pb-4"><b>Ariana Medical Center</b>
            <p className="mt-1 text-xs text-slate-500">Demo conversation · no messages sent</p>
            </div><div className="flex flex-1 flex-col justify-center gap-4 py-8">
                <div className="max-w-md rounded-2xl rounded-tl-sm bg-slate-100 p-4 text-sm leading-6 text-slate-600">Hello!
         Your appointment request is saved in this prototype. Please contact the clinic directly to verify any real appointment.
        </div>
<div className="ml-auto max-w-xs rounded-2xl rounded-tr-sm bg-brand-600 p-4 text-sm text-white">
    Thank you. I will confirm the details with the clinic.</div>
    </div><div className="flex gap-2"><input disabled className="field flex-1" placeholder="Messaging is disabled in this demo"/>
    <button disabled className="btn-primary opacity-50"><Send size={16}/>
    </button></div></div></div></>}
export function HealthPage(){return <>
<PageTitle eyebrow="PERSONAL WELLNESS" title=
"My Health" description="A safe prototype space to organise health notes, reminders and preparation for a clinic visit."/>
<div className="grid gap-4 md:grid-cols-3">{[{i:HeartPulse,t:'Health overview',
d:'Prepare a personal wellness checklist and questions for your next visit.'},
{i:ClipboardList,
    t:'Health records',
    d:'Keep a checklist of reports you may need to bring to a professional.'},
{i:CalendarCheck,t:'Wellness reminders',
    d:'Plan routine check-ups and remember follow-up questions.'}]
    .map(x=><article key={x.t} className="panel-card"><span className="quick-icon violet"><x.i size={23}/></span>
    <h3 className="mt-4 text-lg font-extrabold">{x.t}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{x.d}</p>
    <button className="btn-secondary mt-5" onClick={()=>alert(
        'Prototype only: this section does not save real medical records.'
    )}>Open section</button></article>)}</div>
    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        <ShieldCheck className="mr-2 inline" size={18}/>
        <b>Privacy notice:</b> Do not enter real medical information. This frontend has no secure patient database and is for demonstration only.
        </div></>}
