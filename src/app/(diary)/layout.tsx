import '@/styles/diary.css';
import {Header, Main, Footer} from '@/components/layout/Diary';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
        <body className="antialiased">
        <Header/>
        <Main>{children}</Main>
        <Footer/>
        </body>
        </html>
    );
}
