import React,{useState} from 'react';
import {X,Minus,Plus,Trash2,ShoppingCart,ArrowRight,CheckCircle2,Menu,Activity} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardPage from './pages/DashboardPage';
import DoctorsPage from './pages/DoctorsPage';
import ClinicsPage from './pages/ClinicsPage';
import PharmacyPage from './pages/PharmacyPage';
import MarketplacePage from './pages/MarketplacePage';
import AppointmentsPage from './pages/AppointmentsPage';
import {MessagesPage,HealthPage} from './pages/OtherPages';
const money=n=>
    `${n.toLocaleString()} AFN`;
export default 
function App(){
    const [page,setPage]=useState('Dashboard');
    const [menuOpen,setMenuOpen]=useState(false);
    const [query,setQuery]=useState('');
    const [cart,setCart]=useState([]);
    const [cartOpen,setCartOpen]=useState(false);
    const [toast,setToast]=useState('');
    const [booking,setBooking]=useState(null);
    const [savedAppointments,setSavedAppointments]=useState([]); 
    const [reason,setReason]=useState('');
    const [bookDate,setBookDate]=useState('2026-10-09');
    const [bookTime,setBookTime]=useState('09:00');
const notify=(s)=>{setToast(s);window
    .clearTimeout(window.__ncToast);window.__ncToast=window
    .setTimeout(()=>setToast(''),2800)};
const navigate=p=>{setPage(p);setQuery('');setMenuOpen(false);
    window.scrollTo({top:0,behavior:'smooth'});};
const add=(item)=>{setCart(old=>{const found=old
    .find(x=>x.id===item.id);
    
    return found?old.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...old,{...item,qty:1}]});
    notify(`${item.name} added to your basket`)};
const changeQty=(id,delta)=>setCart(old=>old.map(x=>x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0));
const cartCount=cart.reduce((n,x)=>n+x.qty,0);
const subtotal=cart.reduce((n,x)=>n+x.qty*x.price,0);
const pageContent=()=>{switch(page){case 'Dashboard':
    return <DashboardPage navigate={navigate} book={setBooking}/>;
    case 'Find Doctor':return <DoctorsPage query={query} book={d=>{setBooking(d);setBookTime(d.hours?.[0]||'09:00')}}/>;
    case 'Find Clinic':return <ClinicsPage query={query}/>;
    case 'Find Pharmacy':return <PharmacyPage query={query} add={add}/>;
    case 'Marketplace':return <MarketplacePage query={query} add={add}/>;
    case 'Appointments':return <AppointmentsPage savedAppointments={savedAppointments}/>;
    case 'Messages':return <MessagesPage/>;case 'My Health':return <HealthPage/>;
    default:return <DashboardPage navigate={navigate} book={setBooking}/>}};
return <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
    <Sidebar page={page} onNavigate={navigate} open={menuOpen} onClose={()=>setMenuOpen(false)} cartCount={cartCount}/>
        <div className="min-h-screen lg:pl-[270px]">
            <Topbar onMenu={()=>setMenuOpen(true)} onCart={()=>setCartOpen(true)} cartCount={cartCount} query={query} setQuery={setQuery}/>
                <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-7 sm:py-8 xl:px-10">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-brand-600 shadow-sm"><Activity size={15}/>
                            </span><span>Workspace</span><span>/</span><b className="text-slate-600">{page}</b>
                        </div>
                    <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] 
                    font-bold text-emerald-700"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> DEMO ENVIRONMENT</div>
                    </div>{pageContent()}
                    <footer className="mt-10 flex flex-col gap-3 border-t border-slate-200 py-6 text-xs text-slate-400
                     sm:flex-row sm:items-center sm:justify-between">
                        <span>© 2026 NovaCare · Healthcare & everyday care, connected.made by Sediqa Nazari</span><span className="flex gap-4">
                            <button onClick={()=>notify('This is a classroom prototype.')} className="hover:text-brand-600">Privacy</button>
                            <button onClick={()=>notify('Sample contact: hello@novacare.demo')} className="hover:text-brand-600">Contact</button>
                            <span>Afghanistan edition</span>
                        </span>
                    </footer>
                </main>
        </div>
{cartOpen&&<><button aria-label="Close basket" className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px]" onClick={()=>
    setCartOpen(false)}/><aside className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-[440px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5"><div><span className="eyebrow">YOUR BASKET</span>
        <h2 className="text-xl font-extrabold">Shopping cart <span className="text-brand-600">({cartCount})</span>
        </h2>
        </div><button className="icon-btn" onClick={()=>setCartOpen(false)}><X size={19}/></button>
        </div>{!cart.length?<div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-3xl bg-brand-50 text-brand-600">
                <ShoppingCart size={32}/></span>
                <h3 className="mt-5 text-xl font-extrabold">Your basket is empty</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">Browse medicines or open a marketplace store to add products.</p>
                <button className="btn-primary mt-5" onClick={()=>{setCartOpen(false);navigate('Marketplace')}}>Explore marketplace 
                    <ArrowRight size={16}/></button><button className="mt-3 text-sm font-bold text-brand-600" onClick={()=>{setCartOpen(false);
                        navigate('Find Pharmacy')}}>Browse pharmacy items
                        </button></div>:<>
                        <div className="flex-1 space-y-3 overflow-y-auto p-5">{cart.map(x=>
                            <article key={x.id} className="flex gap-3 rounded-2xl border border-slate-100 p-3">
                                <img className="h-20 w-20 rounded-xl bg-slate-50 object-cover" src={x.image||
                                'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200'} alt=""/>
                                <div className="min-w-0 flex-1"><b className="block text-sm">{x.name}</b>
                                <small className="text-xs text-slate-400">{x.source||'NovaCare store'}</small>
                                <b className="mt-1 block text-sm text-brand-700">{money(x.price)}</b>
                                <div className="mt-2 inline-flex items-center gap-3 rounded-lg bg-slate-100 p-1">
                                    <button className="grid h-6 w-6 place-items-center rounded bg-white" onClick={()=>changeQty(x.id,-1)}>
                                        <Minus size={12}/>
                                    </button><span className="text-xs font-bold">{x.qty}</span>
                                        <button className="grid h-6 w-6 place-items-center rounded bg-white" onClick={()=>changeQty(x.id,1)}>
                                        <Plus size={12}/>
                                    </button>
                                    </div></div>
                                    <button onClick={()=>setCart(old=>old.filter(i=>i.id!==x.id))} 
                                    className="self-start p-2 text-slate-400 hover:text-rose-500">
                                        <Trash2 size={16}/></button></article>)}
                        </div><div className="border-t border-slate-100 p-5">
                            <div className="mb-2 flex justify-between text-sm text-slate-500"><span>Subtotal</span>
                            <b className="text-slate-800">{money(subtotal)}</b>
                </div><div className="mb-3 flex justify-between text-sm text-slate-500"><span>Estimated delivery</span>
                <b className="text-slate-800">{money(60)}</b>
                </div><div className="flex justify-between border-t border-slate-100 py-3 text-base font-extrabold"><span>Total</span>
                <span className="text-brand-700">{money(subtotal+60)}</span>
                </div><button className="btn-primary w-full justify-center" onClick={()=>notify(
                    'Demo checkout only — no order or payment was sent.')}>Continue to checkout <ArrowRight size={16}/>
                    </button><button className="mt-3 w-full text-xs font-bold text-slate-400 hover:text-rose-500" 
                    onClick={()=>setCart([])}>Clear basket</button><p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
                        Prototype only. No payment or delivery request is processed.</p></div></>}</aside></>}
{booking&&<div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
<section className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
    <div className="flex items-start justify-between">
        <div><span className="eyebrow">BOOK A VISIT</span>
        <h2 className="mt-1 text-2xl font-extrabold">Request appointment</h2>
        </div>
        <button className="icon-btn" onClick={()=>setBooking(null)}><X size={19}/></button>
    </div><div className="mt-5 flex items-center gap-4 rounded-2xl bg-slate-50 p-3">
        <img className="h-16 w-16 rounded-xl object-cover" src={booking.image} alt=""/>
        <div><b className="block">{booking.name}</b><span className="text-sm text-brand-600">{booking.specialty}</span>
        <small className="mt-1 block text-slate-500">{booking.fee?.toLocaleString()} AFN consultation</small>
        </div>
    </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="form-label">Preferred date
                <input className="field mt-2 w-full" type="date" value={bookDate} onChange={e=>setBookDate(e.target.value)}/>
            </label><label className="form-label">Available time
                    <select className="field mt-2 w-full" value={bookTime} onChange={e=>setBookTime(e.target.value)}>{(booking.hours||[
                        '09:00','10:30','13:00','15:00']).map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                    </label>
        </div>
        <label className="form-label mt-4 block">Reason for visit 
            <textarea className="field mt-2 w-full" rows="3" value={reason} onChange={e=>setReason(e.target.value)} 
            placeholder="Optional note for your appointment request"/>
        </label><div className="mt-5 flex gap-3">
            <button className="btn-secondary flex-1 justify-center" onClick={()=>setBooking(null)}>Cancel</button>
            <button className="btn-primary flex-1 justify-center" onClick={()=>{setSavedAppointments(old=>[{
                ...booking,time:`${bookDate} · ${bookTime}`,reason},...old]);
                setBooking(null);setReason('');
                navigate('Appointments');
                notify('Appointment request added to the demo schedule')}}>
                    <CheckCircle2 size={16}/> Save request</button></div>
                    <p className="mt-4 text-[10px] leading-4 text-slate-400">This is a classroom prototype. 
                        The request is saved only in the current browser session and is not sent to a real doctor.</p>
</section></div>}
{toast&&<div className="fixed bottom-5 left-1/2 z-[90] 
flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
    <CheckCircle2 size={17} className="text-emerald-300"/>{toast}
    </div>}
    </div>}
