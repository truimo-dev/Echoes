import '@/styles/index.css';

import {SpeedInsights} from '@vercel/speed-insights/next';
import {Analytics} from '@vercel/analytics/next';
import type {PropsWithChildren} from 'react';
import type {Metadata} from 'next';
import {ThemeProvider} from '@/providers/theme-provider';

export const metadata: Metadata = {
    icons: [
        {
            rel: 'icon',
            url: '/favicon.ico'
        },  {
            rel: 'apple-touch-icon',
            url: '/avatar.jpg'
        }
    ]
};

export default async function RootLayout(props: PropsWithChildren) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased theme-1">
                <ThemeProvider>
                    {props.children}
                </ThemeProvider>
                <SpeedInsights/>
                <Analytics/>
            </body>
        </html>
    );
}
