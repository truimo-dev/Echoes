import type {Metadata, Viewport} from 'next';
import {siteConfig} from '@/constant/site';
import {DeprecatedDomain} from '@/components/common/Client';
import {Theme} from '@radix-ui/themes';

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s - ${siteConfig.title}`
    },
    description: 'This is QianXiaomo\'s website.',
    keywords: ['QianXiaomo', 'Xiaomo', '浅小沫', 'truimo', '小沫', '小白']
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
        <Theme accentColor="sky">
            <DeprecatedDomain/>
            {children}
            <SayHi/>
        </Theme>
    );
}

function SayHi() {
    return (
        <script dangerouslySetInnerHTML={{
            __html: 'console.log("%c Truimo %c https://github.com/Truimo ", "color: #fff; margin: 1em 0; padding: 5px 0; background: #0ea5e9;", "margin: 1em 0; padding: 5px 0; background: #efefef;");'
        }}></script>
    )
}
