/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
            brightness: {
                3: '0.3',
            },
        },
    },
    plugins: [],
};
