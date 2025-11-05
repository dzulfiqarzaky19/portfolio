// tailwind.config.js
export default {
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  safelist: [
    '[font-family:var(--font-display)]',
    '[font-family:var(--font-sans)]',
    '[font-family:var(--font-mono)]',
    '[text-decoration-color:hsl(var(--muted)/0.35)]',
    'hover:[text-decoration-color:hsl(var(--primary))]',
    'focus-visible:ring-[hsl(var(--focus))]',
  ],
}
