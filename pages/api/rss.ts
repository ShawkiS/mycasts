import type { NextApiRequest, NextApiResponse } from 'next'
import { generateRssFeed } from '../../services/rss';

type Data = {
  link: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = process.env.USERNAME as string;
  const feed = await generateRssFeed(username);
  res.setHeader('Content-Type', 'xml');
  res.send(feed as any);
}