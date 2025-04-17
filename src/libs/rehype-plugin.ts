import type { Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const rehypeImageWrapper: Plugin<[], Root> = () => {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if ('img' === node.tagName) {
                node.properties = Object.assign(node.properties, {
                    loading: 'lazy',
                    referrerpolicy: 'no-referrer',
                })
            }
            // console.log(node, index, parent)
        })
    }
}

export {
    rehypeImageWrapper
}
