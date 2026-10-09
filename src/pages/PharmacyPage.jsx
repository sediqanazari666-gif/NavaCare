import React,{useState} from 'react';
import {Pill,ShoppingCart,Plus,MapPin,Phone,Clock3,ArrowLeft,Search,ShieldCheck} 
from 'lucide-react';
import {pharmacies,medicines} 
from '../data/mockData';
import {PageTitle,SearchFilters,Rating,EmptyState,LocationLine} 
from '../components/UI';
export default function 
PharmacyPage({query,add}){const [selected,setSelected]=useState(null);
    const [category,setCategory]=useState('All categories');
    const [city,setCity]=useState('All cities');
    const cats=['All categories',...new Set(medicines.map(m=>m.category))];
    const filteredPharmacies=pharmacies
    .filter(p=>(p.name+' '+p.address+' '+p.city).toLowerCase().includes(query.toLowerCase())&&(city==='All cities'||p.city===city));
    const filteredMeds=medicines.filter(m=>(m.name+' '+m.category).toLowerCase()
    .includes(query.toLowerCase())&&(category==='All categories'||m.category===category));
    return <><PageTitle eyebrow="PHARMACY NETWORK" title="Find a pharmacy" 
    description="Search pharmacy locations or browse a shared medicine catalogue with clear prices and product categories." 
    action={selected?'All pharmacies':undefined} 
    onAction={()=>setSelected(null)}/>{selected?<>
    <button onClick={()=>setSelected(null)} 
    className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
        <ArrowLeft size={16}/> Back to pharmacies</button>
        <section className="mb-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:flex">
            <img src={selected.image} alt={selected.name} className="h-56 w-full object-cover md:h-auto md:w-72"/>
            <div className="flex-1 p-6">
                <div className="flex items-center gap-2"> <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Partner pharmacy · demo</span>
                    <Rating value={selected.rating}/>
                </div>
                    <h2 className="mt-3 text-2xl font-extrabold">{selected.name}</h2>
                    <div className="mt-4 space-y-2"><LocationLine>{selected.address}</LocationLine>
                    <p className="flex items-center gap-2 text-sm text-slate-500">
                        <Phone size={15} className="text-brand-500"/>{selected.phone}</p>
                        <p className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock3 size={15} className="text-brand-500"/>{
                            selected.hours} · Delivery {selected.delivery}
                            </p>
                            </div><div className="mt-5 flex flex-wrap gap-2">
                                <a className="btn-secondary" target="_blank" 
                                rel="noreferrer"
                                 href={`https://www.google.com/maps/search/?
                                    api=1&query=${encodeURIComponent(selected.address)}`}>
                                        <MapPin size={15}/> View location</a>
                                        <a className="btn-secondary" href={`tel:${selected.phone.replaceAll(' ','')}`}>
                                            <Phone size={15}/> Call pharmacy
                                        </a>
                                        </div>
                                        </div>
                                        </section>
                                        <div className="mb-4"><span className="eyebrow">PRODUCT CATALOGUE</span>
                                        <h2 className="section-title">Medicines & health essentials</h2>
                                        <p className="mt-1 text-sm text-slate-500">Catalogue is shared demo inventory;
                                             check product and availability with the pharmacy before purchase.</p>
                                             </div><SearchFilters value={query} onChange={()=>{}} 
                                             placeholder="Search medicine name, category or item">
        <select className="select-field" value={category} 
       onChange={e=>setCategory(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></SearchFilters>
         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{filteredMeds.map(m=><article key={m.id} className="product-card">
         <div className="product-image-wrap">
         <img src={m.image} alt={m.name}/><span className="product-category">
          {m.category}</span></div><div className="p-4"><h3 className="font-bold text-slate-900">
         {m.name}</h3><p className="mt-1 text-xs text-slate-500">{m.unit}</p>
         <div className="mt-4 flex items-center justify-between">
          <b className="text-lg text-brand-700">{m.price.toLocaleString()} 
     <small className="text-xs">AFN</small></b><button onClick={()=>add({
  ...m,source:selected.name})} className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white transition
   hover:bg-brand-700" aria-label={`Add ${m.name}`}><Plus size={18}/>
   </button>
   </div></div></article>)}{!filteredMeds.length&&<EmptyState/>}</div></>:<><div className="mb-4 flex flex-wrap items-center justify-between gap-2">
    <h2 className="section-title">Pharmacies near you</h2><span className="text-xs text-slate-500">{filteredPharmacies.length} locations</span>
    </div><SearchFilters value={query} onChange={()=>{}} placeholder="Search pharmacy name, city or address">
        <select className="select-field" value={city} onChange={e=>setCity(e.target.value)}>{['All cities','Kabul','Herat','Mazar-e-Sharif'].map(x=>
            <option key={x}>{x}</option>)}</select></SearchFilters><div className="grid gap-5 md:grid-cols-2">{filteredPharmacies.map(p=>
            <article key={p.id} className="pharmacy-card"><img src={p.image} alt={p.name}/>
            <div className="min-w-0 flex-1 p-5"><div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">Open · demo</span>
                <Rating value={p.rating}/></div><h3 className="mt-3 text-lg font-extrabold">{p.name}</h3>
                <div className="mt-3 space-y-2"><LocationLine>{p.address}</LocationLine>
                <p className="flex items-center gap-2 text-xs text-slate-500"><Phone size={14} className="text-brand-500"/>{p.phone}</p>
                <p className="flex items-center gap-2 text-xs text-slate-500"><Clock3 size={14} className="text-brand-500"/>{p.hours}
                 · {p.delivery} delivery</p></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>setSelected(p)} className="btn-primary"><Pill size={15}/> Browse medicines</button><a className="btn-secondary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}`} target="_blank" rel="noreferrer"><MapPin size={15}/> Location</a></div></div></article>)}{!filteredPharmacies.length&&<EmptyState/>}</div><div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><ShieldCheck className="mr-2 inline" size={16}/><b>Medicine safety:</b> This educational demo is not a medical service. Prescription medicines require a valid prescription; never start or change treatment based only on this catalogue.</div><div className="panel-card mt-7"><div className="mb-4 flex items-center justify-between"><div><span className="eyebrow">QUICK MEDICINE SEARCH</span><h2 className="section-title">Browse all products</h2></div><Pill className="text-brand-500"/></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{medicines.slice(0,4).map(m=><button key={m.id} onClick={()=>setSelected(pharmacies[0])} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-left hover:border-brand-200"><img className="h-12 w-12 rounded-lg bg-slate-50 object-cover" src={m.image} alt=""/><span className="min-w-0 flex-1"><b className="block truncate text-sm">{m.name}</b><small className="text-brand-700">{m.price} AFN</small></span><ShoppingCart size={15} className="text-slate-400"/></button>)}</div></div></>}</>}
