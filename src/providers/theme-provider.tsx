'use client'

import type {Context, PropsWithChildren} from 'react';
import {createContext, useMemo, useEffect} from 'react';

interface UseThemeProps {
    themes: string[]
}

const ThemeContext: Context<UseThemeProps | undefined> = createContext<UseThemeProps | undefined>(undefined)

function applyTheme(theme: string) {
    if ('ViewTransition' in window) {
        document.startViewTransition(function () {
            switchTheme(theme)
        })
    } else {
        switchTheme(theme)
    }
}

function switchTheme(theme: string) {
    const doc: HTMLElement = document.documentElement
    const resolved: string = theme === 'dark' ? 'light' : 'dark'

    doc.classList.remove(resolved)
    doc.classList.add(theme)
    doc.style.colorScheme = theme
}

export const ThemeProvider = (props: PropsWithChildren) => {
    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        const theme: string = matchMedia.matches ? 'dark' : 'light'

        switchTheme(theme)

        function handleThemeChange(event: MediaQueryListEvent) {
            const theme: string = event.matches ? 'dark' : 'light'
            // In general, it will not be equal to the original value.
            applyTheme(theme)
        }

        matchMedia.addEventListener('change', handleThemeChange, false)
        return () => {
            matchMedia.removeEventListener('change', handleThemeChange)
        }
    }, [])

    const providerValue: UseThemeProps = useMemo(() => {
        // ToDo Not yet implemented, change themes.

        return {
            themes: ['dark', 'light'],
        }
    }, [])

    return (
        <ThemeContext.Provider value={providerValue}>
            <ThemeScript/>
            {props.children}
        </ThemeContext.Provider>
    )
}

const themeScript: string = `
'use strict';
function initTheme() {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const theme = matchMedia.matches ? 'dark' : 'light';
    const doc = document.documentElement
    doc.classList.add(theme)
    doc.style.colorScheme = theme
}
initTheme();
`

function ThemeScript() {
    return (
        <script dangerouslySetInnerHTML={{
            __html: themeScript
        }}></script>
    )
}
