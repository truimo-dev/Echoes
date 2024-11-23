import clsx from 'clsx'
import {twMerge} from 'tailwind-merge'

const clsxm = (...args: any[]) => {
    return twMerge(clsx(args))
}



export { clsxm }
