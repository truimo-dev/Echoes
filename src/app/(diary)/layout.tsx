import '@/styles/diary.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
        <body className="antialiased">
        {children}
        </body>
        </html>
    );
}
