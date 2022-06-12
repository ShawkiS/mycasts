import axios from "axios";
import { Feed } from "feed";
import { getCasts, getUser } from "./farcaster";

export const generateRssFeed = async (username: string) => {
    const casts = await getCasts(username);
    const user = await (await axios.get(await getUser(username))).data.body;

   const author = {
      name: user.displayName,
      addressActivityUrl: user.addressActivityUrl,
      proofUrl: user.proofUrl
    }
    
    const feed = new Feed({
      title: `${user.displayName}'s casts`,
      description: `Casts from Farcaster.xyz`,
      id: username,
      link: `explorer.farcaster.xyz/usernames/${username}`,
      image: user.addressActivityUrl,
      favicon: user.addressActivityUrl,
      copyright: ``,
      generator: `https://${process.env.VERCEL_URL}`,
      updated: new Date(),
      author: author as any,
    });

    casts.forEach((cast: any) => {
      const title = cast.body.data.replyParentMerkleRoot ? `Post Reply` : `Post from ${user.displayName}`
      feed.addItem({
        title: title,
        id: cast.merkleRoot,
        link: 'http://feedly.com/i/subscription/feed/' + `https://s/api/s/${username}`,
        description: 'cast',
        content: cast.body.data.text,
        author: [author],
        date: new Date(cast.body.publishedAt),
        signture: cast.signature
      } as any);
    });

    return feed.rss2();
};
  