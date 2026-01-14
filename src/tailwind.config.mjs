/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.03em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.04em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500' }],
                xl: ['1.25rem', { lineHeight: '1.35', letterSpacing: '0.05em', fontWeight: '600' }],
                '2xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.04em', fontWeight: '700' }],
                '3xl': ['1.875rem', { lineHeight: '1.25', letterSpacing: '0.03em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '800' }],
                '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '0.01em', fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0', fontWeight: '900' }],
                '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0', fontWeight: '900' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "cormorantgaramond",
                paragraph: "sora"
            },
            colors: {
                'accent-gold': '#D4AF37',
                'deep-black': '#222222',
                destructive: '#E53E3E',
                'destructive-foreground': '#FFFFFF',
                background: '#F8F8F8',
                secondary: '#4A4A4A',
                foreground: '#333333',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#FFFFFF',
                primary: '#A08C5C'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
