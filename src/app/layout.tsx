import type {Metadata, Viewport} from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: '浅小沫',
    description: '浅小沫的站点',
    keywords: ['浅小沫', 'truimo', '小沫', '小白']
};

export const viewport: Viewport = {
    colorScheme: 'normal',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SayHi/>
        {children}
        </body>
        </html>
    );
}

function SayHi() {
    return (
        <script dangerouslySetInnerHTML={{
            __html: 'console.log("%c Truimo %c https://github.com/Truimo ", "color: #fff; margin: 1em 0; padding: 5px 0; background: #0ea5e9;", "margin: 1em 0; padding: 5px 0; background: #efefef;");'
        }}></script>
    )
}
