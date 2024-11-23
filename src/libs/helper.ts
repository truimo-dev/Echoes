import clsx from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {ClassNameValue} from 'tailwind-merge'

const clsxm = (...args: ClassNameValue[]) => {
    return twMerge(clsx(args))
}

export { clsxm }
