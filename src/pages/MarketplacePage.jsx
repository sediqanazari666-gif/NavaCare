import './Marketplace.css';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ArrowLeft,
    ArrowUpRight,
    Clock3,
    Plus,
    Search,
    Star,
    Truck,
} from 'lucide-react';

import { stores } from '../data/mockData';
import {
    PageTitle,
    Rating,
    EmptyState,
} from '../components/UI';

// Product image filenames are matched to the files inside public/images/Marketplace/.
// Add an alias here whenever the filename differs from the product label.
const productImageAliases = {
    'apples (1 kg)': ['Apple', 'apple', 'Apples', 'apples'],
    'bananas (1 kg)': ['Banana', 'banana', 'Bananas', 'bananas'],
    'fresh tomatoes (1 kg)': ['fresh tomatoes', 'Fresh tomatoes', 'fresh-tomatoes', 'tomatoes'],
    'graps (1 kg)': ['grapes', 'Grapes', 'graps', 'Graps'],
    'eggs (12)': ['eggs', 'Eggs', 'egg', 'Egg'],
    'fresh eggs (12)': ['eggs', 'Eggs', 'fresh eggs', 'Fresh eggs'],
    'potatoes (1 kg)': ['potatoes', 'Potatoes', 'potato', 'Potato'],
    'oranges (1 kg)': ['oranges', 'Oranges', 'orange', 'Orange'],
};

function getProductImageCandidates(name = '') {
    const normalized = name.trim().toLowerCase();
    const aliases = productImageAliases[normalized] || [];
    // Also try the full product label and a label without the quantity in parentheses.
    const withoutQuantity = name.replace(/\s*\([^)]*\)/g, '').trim();
    const generic = [withoutQuantity, withoutQuantity.toLowerCase(), name];
    const stems = [...new Set([...aliases, ...generic].filter(Boolean))];
    const extensions = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'];
    const folders = ['images/Marketplace', 'images/marketplace', 'image/Marketplace', 'image/marketplace'];
    return folders.flatMap((folder) => stems.flatMap((stem) => extensions.map((ext) =>
        `/${folder}/${stem.split('/').map(encodeURIComponent).join('/')}.${ext}`
    )));
}

function ProductImage({ name }) {
    const [candidateIndex, setCandidateIndex] = useState(0);
    const candidates = getProductImageCandidates(name);

    useEffect(() => {
        setCandidateIndex(0);
    }, [name]);

    if (candidateIndex >= candidates.length) {
        return (
            <div
                style={{ width: '96px', height: '96px' }}
                className="grid shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-100 px-1 text-center text-xs text-slate-400"
                aria-label={`Image unavailable for ${name}`}
            >
                No image
            </div>
        );
    }

    const imagePath = candidates[candidateIndex];

    return (
        <div
            style={{ width: '96px', height: '96px', background: 'linear-gradient(135deg, #f8f8ff, #f0fbfc)' }}
            className="shrink-0 overflow-hidden rounded-xl p-2 relative flex items-center justify-center shadow-inner"
        >
            <img
                key={imagePath}
                src={imagePath}
                alt={name}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    transform: 'scale(1.35)',
                    transition: 'transform 0.3s ease'
                }}
                className="hover:scale-150"
                loading="lazy"
                onError={() => setCandidateIndex((current) => current + 1)}
            />
        </div>
    );
}

// Supports common English and Persian product searches without changing store data.
const searchAliases = {
    'سیب': 'apple',
    'موز': 'banana',
    'گوجه': 'tomato',
    'گوجه فرنگی': 'tomato',
    'انگور': 'grap',
    'تخم مرغ': 'egg',
    'روغن': 'cooking oil',
    'کچالو': 'potato',
    'سیب زمینی': 'potato',
    'پرتقال': 'orange',
    'قابلی پلو': 'kabuli pulao',
    'کابلی پلو': 'kabuli pulao',
    'منتو': 'mantu',
    'بولانی': 'bolani',
    'مرغ': 'chicken',
    'سوپ عدس': 'lentil soup',
    'عدس': 'lentil',
    'قهوه': 'coffee',
    'کاپوچینو': 'cappuccino',
    'آمریکانو': 'americano',
    'چای سبز': 'green tea',
    'کیک': 'cake',
    'کروسان': 'croissant',
    'شیر': 'milk',
    'ماست': 'yoghurt',
    'پنیر': 'cheese',
    'خامه': 'cream',
    'کره': 'butter',
    'عسل': 'honey',
    'صبحانه': 'breakfast',
};

function normalizeSearch(value = '') {
    const text = value.trim().toLowerCase();
    if (!text) return '';

    // Exact Persian alias first, then allow the user's original text.
    if (searchAliases[text]) return searchAliases[text];

    // If the query is in Persian and contains a known product term, map that term.
    const alias = Object.keys(searchAliases).find((key) => text.includes(key));
    return alias ? searchAliases[alias] : text;
}

export default function MarketplacePage({ query = '', add }) {
    const [store, setStore] = useState(null);
    const [kind, setKind] = useState('All stores');
    const [marketQuery, setMarketQuery] = useState('');
    const [submittedMarketQuery, setSubmittedMarketQuery] = useState('');

    const categories = [
        'All stores',
        'Grocery',
        'Restaurant',
        'Cafe & Coffee',
        'Dairy & Breakfast',
    ];

    // Both the app's top search (query prop) and this page's search are supported.
    // The local field takes priority when the user types in it.
    const activeSearch = (
        marketQuery.trim() ||
        submittedMarketQuery.trim() ||
        (typeof query === 'string' ? query.trim() : '')
    );

    const normalizedSearch = normalizeSearch(activeSearch);

    const list = useMemo(() => {
        return stores.filter((s) => {
            if (kind !== 'All stores' && s.kind !== kind) return false;
            if (!normalizedSearch) return true;

            const searchableText = [
                s.name,
                s.kind,
                s.description,
                ...s.items.map(([name]) => name),
            ].join(' ').toLowerCase();

            return searchableText.includes(normalizedSearch);
        });
    }, [kind, normalizedSearch]);

    // Search every product across every store, not just the store cards.
    const productResults = useMemo(() => {
        if (!normalizedSearch) return [];

        return stores.flatMap((s) =>
            s.items
                .map(([name, price], index) => ({
                    name,
                    price,
                    index,
                    store: s,
                }))
                .filter((product) => {
                    const name = product.name.toLowerCase();
                    const storeDetails = `${product.store.name} ${product.store.kind}`.toLowerCase();

                    // Match product names first. Store name/category matches are
                    // also useful when someone searches for a shop or category.
                    return (
                        name.includes(normalizedSearch) ||
                        storeDetails.includes(normalizedSearch)
                    );
                })
        );
    }, [normalizedSearch]);

    const visibleItems = store
        ? store.items.filter(([name]) => {
            if (!normalizedSearch) return true;
            return name.toLowerCase().includes(normalizedSearch);
        })
        : [];

    const submitSearch = () => {
        setSubmittedMarketQuery(marketQuery.trim());
        setStore(null);
    };

    const clearSearch = () => {
        setMarketQuery('');
        setSubmittedMarketQuery('');
    };

    const addProduct = (product) => {
        add?.({
            id: product.store.id * 1000 + product.index,
            name: product.name,
            price: product.price,
            image: product.store.image,
            source: product.store.name,
        });
    };

    const renderProductCards = (products) => (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <article
                    key={`${product.store.id}-${product.index}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                    <ProductImage name={product.name} />

                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-slate-800">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                            {product.store.name}
                        </p>
                        <b className="mt-2 block text-brand-700">
                            {product.price.toLocaleString()} AFN
                        </b>
                    </div>

                    <button
                        type="button"
                        onClick={() => addProduct(product)}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700"
                        aria-label={`Add ${product.name}`}
                        title={`Add ${product.name} to cart`}
                    >
                        <Plus size={18} />
                    </button>
                </article>
            ))}
        </div>
    );

    return (
        <div className="mp-page">
            <PageTitle
                eyebrow="LOCAL EVERYDAY ESSENTIALS"
                title={store ? store.name : 'Marketplace'}
                description={
                    store
                        ? store.description
                        : 'Order everyday essentials from local grocery stores, restaurants, cafes and dairies.'
                }
                action={store ? 'Browse all stores' : undefined}
                onAction={() => setStore(null)}
            />

            {/* Search on this page. The app's top search is supported too. */}
            {!store && (
                <div className="mb-6 flex w-full gap-2">
                    <input
                        type="search"
                        value={marketQuery}
                        onChange={(event) => {
                            setMarketQuery(event.target.value);
                            setStore(null);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') submitSearch();
                        }}
                        placeholder="Search apples, mantu, milk..."
                        aria-label="Search marketplace products"
                        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                    <button
                        type="button"
                        onClick={submitSearch}
                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700"
                    >
                        <Search size={18} />
                        Search
                    </button>
                    {activeSearch && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            Clear
                        </button>
                    )}
                </div>
            )}

            {store ? (
                <>
                    <button
                        type="button"
                        onClick={() => setStore(null)}
                        className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600"
                    >
                        <ArrowLeft size={16} />
                        All marketplace stores
                    </button>

                    <section className="mb-6 overflow-hidden rounded-3xl bg-white shadow-soft md:flex">
                        <img
                            className="h-56 w-full object-cover md:h-64 md:w-[42%]"
                            src={store.image}
                            alt={store.name}
                        />
                        <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                            <span className="w-fit rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">
                                {store.kind}
                            </span>
                            <h2 className="mt-3 text-2xl font-extrabold">
                                {store.name}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {store.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Star size={14} className="fill-amber-400 text-amber-400" />
                                    {store.rating} customer rating (sample)
                                </span>
                                <span className="flex items-center gap-1">
                                    <Truck size={14} />
                                    {store.time} estimated delivery
                                </span>
                            </div>
                        </div>
                    </section>

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <span className="eyebrow">MENU & PRODUCTS</span>
                            <h2 className="section-title">Choose something good</h2>
                        </div>
                        <span className="text-sm text-slate-500">
                            {visibleItems.length} items
                        </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {visibleItems.map(([name, price], index) => (
                            <article
                                key={name}
                                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                            >
                                <ProductImage name={name} />
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-slate-800">{name}</h3>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Freshly prepared / selected
                                    </p>
                                    <b className="mt-2 block text-brand-700">
                                        {price.toLocaleString()} AFN
                                    </b>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        add?.({
                                            id: store.id * 1000 + index,
                                            name,
                                            price,
                                            image: store.image,
                                            source: store.name,
                                        })
                                    }
                                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white hover:bg-brand-700"
                                    aria-label={`Add ${name}`}
                                >
                                    <Plus size={18} />
                                </button>
                            </article>
                        ))}
                        {visibleItems.length === 0 && (
                            <div className="col-span-full">
                                <EmptyState />
                            </div>
                        )}
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
                        <Clock3 size={15} className="mr-2 inline text-brand-500" />
                        Delivery times and prices are illustrative. Checkout is a demo and does not place a real order.
                    </div>
                </>
            ) : (
                <>
                    {!activeSearch && (
                        <div className="mb-5 flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setKind(category)}
                                    className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                                        kind === category
                                            ? 'bg-brand-600 text-white'
                                            : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-300'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}

                    {activeSearch ? (
                        <>
                            <div className="mb-4">
                                <span className="eyebrow">SEARCH RESULTS</span>
                                <h2 className="section-title">
                                    Products matching “{activeSearch}”
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Products from all stores are shown here. You do not need to open a store first.
                                </p>
                            </div>

                            {productResults.length > 0 ? (
                                renderProductCards(productResults)
                            ) : (
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-500">
                                    No products found. Try another product name.
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                                {list.map((s) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => setStore(s)}
                                        className="store-card text-left"
                                    >
                                        <div className="relative">
                                            <img src={s.image} alt={s.name} />
                                            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-700">
                                                {s.kind}
                                            </span>
                                            <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-brand-700 shadow">
                                                <ArrowUpRight size={19} />
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="text-xl font-extrabold text-slate-900">
                                                    {s.name}
                                                </h3>
                                                <Rating value={s.rating} />
                                            </div>
                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                {s.description}
                                            </p>
                                            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock3 size={15} className="text-brand-500" />
                                                    {s.time}
                                                </span>
                                                <span>{s.items.length} menu items</span>
                                            </div>
                                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-600">
                                                Open store <ArrowUpRight size={16} />
                                            </span>
                                        </div>
                                    </button>
                                ))}
                                {!list.length && <EmptyState />}
                            </div>

                            <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                {[
                                    {
                                        title: 'Grocery essentials',
                                        description: 'Produce, pantry goods and home basics',
                                        icon: '🥦',
                                    },
                                    {
                                        title: 'Afghan food & meals',
                                        description: 'Pulao, mantu, bolani and family meals',
                                        icon: '🍲',
                                    },
                                    {
                                        title: 'Breakfast & coffee',
                                        description: 'Dairy, tea, coffee and bakery favourites',
                                        icon: '☕️',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                                    >
                                        <span className="text-3xl">{item.icon}</span>
                                        <span>
                                            <b className="block text-sm">{item.title}</b>
                                            <small className="text-xs text-slate-500">
                                                {item.description}
                                            </small>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
