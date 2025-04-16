import { z } from 'zod'
import { For, Match, mergeProps, Show, Switch } from 'solid-js'
import { clsxm } from '@/libs/helper'
import { imageSchema } from '@/libs/schema'
import Image from './Image'
import styles from './DiaryImages.module.css'

interface DiaryImagesProps {
    images: Array<z.infer<typeof imageSchema>>
    class?: string
}

function DiaryImages(props: DiaryImagesProps) {
    const merged = mergeProps({class: ''}, props)

    return (
        <Show when={props.images.length > 0}>
            <div class={clsxm(styles.images, merged.class)}>
                <Switch>
                    <Match when={props.images.length === 1}>
                        <div class="w-full md:w-[80%]">
                            <figure class="relative w-full">
                                <Image class={clsxm('max-w-full object-cover', styles.img)}
                                    src={props.images[0].src} alt={props.images[0].name}
                                />
                            </figure>
                        </div>
                    </Match>
                    <Match when={props.images.length % 2 === 0}>
                        <div class="w-11/12 md:w-[60%] grid grid-cols-2 gap-1">
                            <For each={props.images}>
                                {(image) => (
                                    <figure class="relative w-full aspect-square">
                                        <Image class={clsxm('h-full max-w-full object-cover', styles.img)}
                                            src={image.src} alt={image.name}
                                        />
                                    </figure>
                                )}
                            </For>
                        </div>
                    </Match>
                    <Match when={props.images.length > 1}>
                        <div class="w-11/12 md:w-[60%] grid grid-cols-3 gap-1">
                            <For each={props.images}>
                                {(image) => (
                                    <figure class="relative w-full aspect-square">
                                        <Image class={clsxm('h-full max-w-full object-cover', styles.img)}
                                            src={image.src} alt={image.name}
                                        />
                                    </figure>
                                )}
                            </For>
                        </div>
                    </Match>
                </Switch>
            </div>
        </Show>
    )
}

export default DiaryImages
