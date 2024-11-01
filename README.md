# ME

This is my homepage.

## Become friends with me

When you want to add a friend link, you can add your site information by modifying the `friends.ts` file in the repository. Here are some steps to help you complete this process:

1. Find a file named friends.ts (or similar) in the repository, which contains the friend link information.

2. Open the [`friends.ts`](https://github.com/Truimo/me/blob/main/src/constant/friends.ts#L8) file and locate an array or object used to store the friend link information. It might look something like this:

```ts
const friends: FriendItem[] = [
    {
        title: 'MiaoMint',
        href: 'https://0u0.ren/',
        icon: 'https://q1.qlogo.cn/g?b=qq&k=G1ibIlnicR8Ij4CZO3BF6cVA&s=640',
        description: '喵薄荷',
    },
    //... ...
]
```

3. Add a new friend link entry to the array or object.

Make sure to provide the correct `title`, `href`, `icon`, and `description` to match the name and link of the friend link you want to add.

Then, commit your changes to the `friends.ts` file. You can do this by forking the repository and submitting a Pull Request (PR) to the repository.

Wait for your Pull Request to be reviewed and merged. I will review your changes and merge them into the repository once I confirm there are no issues.

After completing the above steps, your friend link should be successfully added to my homepage. If you have any other questions, please feel free to ask me.

## Sanity

```shell
npm create sanity@latest -- --project Project-ID --dataset production --template clean
```
