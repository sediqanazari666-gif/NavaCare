import React,{useState} from 'react';
import {ArrowLeft,ArrowUpRight,Clock3,Plus,Minus,ShoppingBasket,Star,Truck} from 'lucide-react';
import {stores} from '../data/mockData';
import {PageTitle,SearchFilters,Rating,EmptyState} from '../components/UI';
export default 
function MarketplacePage({query,add}){
    const [store,setStore]=useState(null);
    const [kind,setKind]=useState('All stores');
    const list=stores.filter(s=>(s.name+' '+s.kind+' '+s.description+' '+s.items.map(i=>i[0])
    .join(' ')).toLowerCase().includes(query.toLowerCase())&&(kind==='All stores'||s.kind===kind));
    return <><PageTitle eyebrow="LOCAL EVERYDAY ESSENTIALS" title={store?store.name:'Marketplace'}
     description={store?store.description:
        'Order everyday essentials from local-style grocery, restaurant, coffee shop and dairy storefronts in one demo marketplace.'}
         action={store?'Browse all stores':undefined} onAction={()=>setStore(null)}/>
         {store?<>
         <button onClick={()=>setStore(null)} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
            <ArrowLeft size={16}/> All marketplace stores
         </button>
         <section className="mb-6 overflow-hidden rounded-3xl bg-white shadow-soft md:flex">
            <img className="h-56 w-full object-cover md:h-64 md:w-[42%]" src={store.image} alt={store.name}/>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <span className="w-fit rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">{store.kind}</span>
                <h2 className="mt-3 text-2xl font-extrabold">{store.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{store.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500"><span className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400"/>{store.rating} customer rating (sample)</span>
                    <span className="flex items-center gap-1">
                        <Truck size={14}/>{store.time} estimated delivery</span>
                    
                </div></div>
        </section><div className="mb-4 flex items-center justify-between"><div>
            <span className="eyebrow">MENU & PRODUCTS</span><h2 className="section-title">Choose something good</h2></div>
            <span className="text-sm text-slate-500">{store.items.length} items</span></div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{store.items.map(([name,price],i)=>
                <article key={name} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-cyan-50 text-3xl">
                        {store.emoji}
                    </div>
                    <div className="min-w-0 flex-1"><h3 className="font-bold text-slate-800">{name}</h3>
                        <p className="mt-1 text-xs text-slate-400">Freshly prepared / selected</p>
                        <b className="mt-2 block text-brand-700">{price.toLocaleString()} AFN</b>
                    </div>
                    <button onClick={()=>add({id:store.id*1000+i,name,price,image:store.image,source:store.name})} 
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700" aria-label={
                        `Add ${name}`}>
                            <Plus size={18}/>
                    </button>
                </article>)}
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
                <Clock3 size={15} className="mr-2 inline text-brand-500"/>
                Delivery times and prices are illustrative. Checkout is a demo and does not place a real order.
            </div></>:<>
            <SearchFilters value={query} onChange={()=>{}} placeholder="Search store or products">
                <select className="select-field" value={kind} onChange={e=>setKind(e.target.value)}>{['All stores','Grocery','Restaurant',
                'Cafe & Coffee','Dairy & Breakfast'].map(x=><option key={x}>{x}</option>)}
                </select>
            </SearchFilters>
            <div className="mb-5 flex flex-wrap gap-2">{['All stores','Grocery','Restaurant','Cafe & Coffee','Dairy & Breakfast'].map(k=>
                <button key={k} onClick={()=>setKind(k)} className={`rounded-full px-4 py-2 text-xs font-bold transition 
                    ${kind===k?'bg-brand-600 text-white':'border border-slate-200 bg-white text-slate-600 hover:border-brand-300'}`}>{k}</button>
                )}
            </div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">{list.map(s=>
                <button key={s.id} onClick={()=>setStore(s)} className="store-card text-left">
                    <div className="relative"><img src={s.image} alt={s.name}/>
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-700">
                    {s.emoji} {s.kind}</span>
                    <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-brand-700 shadow">
                        <ArrowUpRight size={19}/></span></div><div className="p-5">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xl font-extrabold text-slate-900">{s.name}</h3>
                            <Rating value={s.rating}/></div><p className="mt-2 text-sm leading-6 text-slate-500">{s.description}</p>
                            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1.5"><Clock3 size={15} className="text-brand-500"/>{s.time}</span>
                                <span>{s.items.length} menu items</span>
                                </div><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-600">
                                    Open store <ArrowUpRight size={16}/>
                                    </span></div>
                                    </button>)}
                                    {!list.length&&<EmptyState/>}
                                    </div><div className="mt-7 grid gap-3 sm:grid-cols-3">
                                        {[{t:'Grocery essentials',d:'Produce, pantry goods and home basics',e:'🥦'},
                                        {t:'Afghan food & meals',d:'Pulao, mantu, bolani and family meals',e:'🍲'},
                                        {t:'Breakfast & coffee',d:'Dairy, tea, coffee and bakery favourites',e:'☕'}]
                                        .map(x=><div key={x.t} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                                            <span className="text-3xl">{x.e}</span><span>
                                                <b className="block text-sm">{x.t}
                                                </b><small className="text-xs text-slate-500">{x.d}</small>
                                            </span>
                        </div>)}
                        </div>
                        </>}</>}
