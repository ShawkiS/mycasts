import { useState } from 'react'
import { Cast, ProfileHeader } from '../components';
import InfiniteScroll from "react-infinite-scroll-component";
import { copyLink } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const perPage = 20;
export default function Home({ data, url }: any) {
  const [viewedCasts, setViewedCasts] = useState<any []>(data.casts.slice(0, perPage));
  const [currentPage, setCurrentPage] = useState(1);

  const handleScroll = () => {
      const currentCount = perPage * currentPage;
      const toCount = perPage * (currentPage + 1);
      
      setViewedCasts([...viewedCasts, ...data.casts.slice(currentCount, toCount)]);
      setCurrentPage(currentPage  + 1);
  };

  const copyRSSLink = () => copyLink(`https://${url}/api/rss`, 'gm! rss feed link copied.');
  const copyEthAddress = () => copyLink(data.user.address,  'gm! Eethereum address copied.');

return ( 
    (
<>

<div className='mx-auto flex flex-col justify-center container'> 
      <ProfileHeader
       AvatarUrl={data.user.avatarUrl}
       DisplayName={data.user.displayName}
       username={data.user.id}
       copyRSSLink={copyRSSLink}
       EthAddress={data.user.address ? `${data.user.address.slice(0, 5)}...${data.user.address.slice(-4)}` : undefined}
       copyEthAddress={copyEthAddress}
       directoryUrl={data.user.addressActivityUrl}
       />

      <div role="list" className="space-y-4 m-auto md:w-2/5 sm:w-full">
      <InfiniteScroll
      dataLength={viewedCasts.length}
      next={handleScroll}
      hasMore={viewedCasts.length < data.casts.length}
      loader={<></>}
    >
                {viewedCasts.map((c: any, index: number) => (
                      <Cast
                      id={index.toString()}
                      reply={c.body?.reply}
                      username={data.user.id}
                      displayName={c.meta.displayName}
                      avatarUrl={c.meta.avatar}
                      text={c.body.data.text}
                      watchesCount={c.meta.watches.count}
                      repliesCount={c.meta.reactions.count}
                      likesCount={c.meta.reactions.count}
                      date={c.body.publishedAt} 
                      link={c.attachments?.openGraph ? c.attachments?.openGraph[0]?.url : undefined}  
                      />
                ))}
                </InfiniteScroll>
      </div>
            </div>
    <ToastContainer />
</>

  )
  )
}

export async function getServerSideProps() {
  const data = await (await fetch(`https://${process.env.VERCEL_URL}/api/casts`)).json();

  return {
    props: {
      data,
      url: process.env.VERCEL_URL
    },
  }
}


