import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '1xl': '1440px',
      },
      colors: {
        white: 'var(--white)',
        black: 'var(--black)',
        red: 'var(--red)',
        textcolor: 'var(--textcolor)',
        lightorange: 'var(--lightorange)',
        bordercolor: 'var(--bordercolor)',
        gray: 'var(--gray)',
        custompink: 'var(--custompink)',
        customyellow: 'var(--customyellow)',
        customskyblue: 'var(--customskyblue)',
        areabg: 'var(--areabg)',
        bgopacity: 'var(--bgopacity)',
        bluebell: 'var(--bluebell)',
        gray6: 'var(--gray6)',
        footerbg: 'var(--footerbg)',
        morebg: 'var(--morebg)',
      },
      animation: {
        progress: 'progress_ani 3s linear',
        rotate_image: 'rotate_image 20s linear infinite',
      },
      keyframes: {
        progress_ani: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        rotate_image: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '@keyframes shine': {
          '0%': { transform: 'skew(45deg) translateX(0%)' },
          '100%': { transform: 'skew(45deg) translateX(200%)' },
        },
        '.shinny': {
          position: 'relative',
          overflow: 'hidden',
        },
        '.shinny::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.2)',
          transform: 'skew(5deg)',
          animation: 'shine 1.5s ease-in-out infinite',
        },
      });
    }),
  ],
} satisfies Config;
