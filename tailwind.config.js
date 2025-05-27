module.exports = {
  darkMode: "class",
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        exo2: ['"Exo 2"', 'sans-serif'],
        mono: ['"Fira Mono"', 'monospace'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        'tech-green': '#2ECC71',
        'tech-blue-light': '#00bfff30',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
          '50%': { transform: 'scale(1.15)', opacity: 1 },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 1.2s ease-in-out infinite',
        gradient: 'gradient 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};