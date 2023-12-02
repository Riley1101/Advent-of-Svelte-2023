/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: '#FF3E00',
                secondary: '#111827'
            },
            gridTemplateColumns: {
                'auto-col': 'repeat(auto-fill, minmax(150px, 1fr))'
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
