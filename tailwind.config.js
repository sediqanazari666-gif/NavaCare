/** @type {import('tailwindcss').Config} */
export default { content: ['./index.html', './src/**/*.{js,jsx}'], 
    theme: { extend: { colors: { brand: { 
        50:'#f4f2ff',100:'#e9e5ff',500:'#7162e8',600:'#5c4bd6',700:'#4536b7',
        900:'#24244d' }, aqua:'#20bdd0' },
         boxShadow: { soft:'0 18px 55px rgba(35,45,85,.08)' } } }, plugins: [] };
