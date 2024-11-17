import '@/styles/diary.css';
import {ReactNode} from 'react';
import {Header, Main, Footer} from '@/components/layout/Diary';
import {Theme} from '@radix-ui/themes';

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <Theme>
            <Header/>
            <Main>{children}</Main>
            <Footer/>
        </Theme>
    );
}
