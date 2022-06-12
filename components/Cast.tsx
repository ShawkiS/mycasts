import {  EyeIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { classNames } from '../utils';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

interface Cast { 
    id: string;
    avatarUrl: string;
    displayName: string;
    text: string;
    date: string;
    likesCount: number;
    reply: any;
    username: string;
    watchesCount: number;
    repliesCount: number;
    link: string;
}

export default function Cast ({
    id,
    avatarUrl,
    text,
    watchesCount,
    date,
    likesCount,
    displayName,
    reply,
    username,
    link
  }: Cast) {
    return (
      <> 
      <div key={id} className={classNames('px-4 py-6 sm:p-6 mb-5 rounded-xl', !reply && 'shadow-md')}>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img className="h-14 w-14 rounded-full" src={avatarUrl} alt="" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-medium text-gray-900">
                  {displayName}
              </p>
              <p className="text-md  text-gray-500">
                  @{username} . {date}
              </p>
            </div>
          </div>
        <p className='text-xl'>{text}</p>
        
        <div className='mt-5'>
                {link && ( link.includes('i.imgur.com') ? <img src={link} /> :
        <LinkPreview url={link} width='' />)
 }
        </div>
        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-md">
              <button type="button" className="inline-flex space-x-2 text-gray-600">
                <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-700">{likesCount}</span>
              </button>
            </span>

            <span className="inline-flex items-center text-md">
              <button type="button" className="inline-flex space-x-2 text-gray-600 ">
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-700">{watchesCount}</span>
              </button>
            </span>
          </div>

        </div>
    </div>
        {reply &&  <> 
   <Cast
                      id={`${id}-reply`}
                      reply={reply.body?.reply}
                      username={username}
                      displayName={reply.meta.displayName}
                      avatarUrl={reply.meta.avatar}
                      text={reply.body.data.text}
                      watchesCount={reply.meta.watches.count}
                      repliesCount={reply.meta.reactions.count}
                      likesCount={reply.meta.reactions.count}
                      date={reply.body.publishedAt} 
                      link={reply.attachments?.openGraph && reply.attachments?.openGraph[0]?.url}  
                      />
                           </>}
      </>
)
}