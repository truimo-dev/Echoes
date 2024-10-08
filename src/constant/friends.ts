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
    }, {
        title: '北枫',
        icon: 'https://q1.qlogo.cn/g?b=qq&nk=41777657&s=640',
        description: '记录一个人的生活点滴',
        href: 'https://beifeng.me/'
    },
]

export {
    friends
}
export type {
    FriendItem
}
