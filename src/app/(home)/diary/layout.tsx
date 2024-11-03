import '@/styles/diary.css';
import {Header, Main, Footer} from '@/components/layout/Diary';
import {Theme} from '@radix-ui/themes';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Theme>
            <Header/>
            <Main>{children}</Main>
            <Footer/>
        </Theme>
    );
}
