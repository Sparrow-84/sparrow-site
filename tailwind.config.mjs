/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // 1:1 with reference/sparrow-inc/brand/foundation-brand-guide.md
      colors: {
        sparrow: {
          green: '#1E4D30', // primary — headings, nav, buttons
          'green-dark': '#163A24', // hover/contrast
          gold: '#F0A500', // accent — CTAs, highlights
          ink: '#1A1A1A', // body text / near-black
          gray: '#767676', // secondary text
          rule: '#D8D8D8', // dividers, borders
          mist: '#F5F5F5', // neutral light background
          sage: '#E8F2EC', // light green background / callouts
          cream: '#FFF8E1', // light yellow background / callouts
        },
        // Dark-mode palette — green-tinted near-black, keeps the brand identity.
        // Applied via `dark:` variants; gold/green brand accents carry over unchanged.
        dark: {
          bg: '#0F1A14', // page background
          surface: '#16241C', // raised surfaces — cards, alt sections, fields
          rule: '#2B3D33', // dividers, borders
          text: '#E6ECE8', // primary body text (replaces sparrow-ink)
          muted: '#A6B0AA', // secondary text (replaces sparrow-gray)
          heading: '#86BD9C', // headings + green links (replaces sparrow-green)
        },
      },
      fontFamily: {
        // self-hosted via @fontsource-variable (imported in src/styles/global.css)
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'Arial', 'sans-serif'],
      },
      maxWidth: { content: '72rem' },
      borderRadius: { '2xl': '1rem' },
      boxShadow: {
        card: '0 1px 3px rgba(26,26,26,0.06), 0 1px 2px rgba(26,26,26,0.04)',
      },
    },
  },
  plugins: [],
};
