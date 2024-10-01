import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            maxWidth: {
                '4/5': '80%',
            }
        },
    },
    plugins: [],
};
export default config;
