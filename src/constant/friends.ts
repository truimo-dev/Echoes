interface FriendItem {
    title: string;
    icon: string;
    description: string;
    href: string;
}

const friends: FriendItem[] = [
    {
        title: 'MiaoMint',
        icon: 'https://q1.qlogo.cn/g?b=qq&k=G1ibIlnicR8Ij4CZO3BF6cVA&s=640',
        description: '喵薄荷',
        href: 'https://0u0.ren/'
    },
]

export {
    friends
}
export type {
    FriendItem
}
