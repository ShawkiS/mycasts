import { ClipboardIcon } from '@heroicons/react/outline'
import Button from './Button';
import Tag from './Tag';

interface Cast { 
    username: string;
    DisplayName: string;
    EthAddress?: string;
    AvatarUrl: string;
    directoryUrl: string;
    copyRSSLink: () => void
    copyEthAddress: () => void
}

export default function ProfileHeader ({
    username,
    DisplayName,
    EthAddress,
    AvatarUrl,
    directoryUrl,
    copyRSSLink,
    copyEthAddress
  }: Cast) {
    return (
            <>
                  <div className="m-4 max-w-full flex h-full flex-col overflow-y-scroll bg-white ">
                    
                      <div className="pb-6">
                        
                        <div className="backgroundimage h-24 sm:h-20 lg:h-64 rounded-md" />
                        <div className='space-x-4 float-right mt-10 '>
                              <Button onClick={copyRSSLink} text="Copy RSS Link" />
                             <a target="_blank" href={directoryUrl}>
                             <Button text="View activity directory" />
                             </a>
                         </div>   

                        <div className="lg:-mt-24 -mt-12 px-6 sm:-mt-8 sm:px-6">
                          
                            <div className="-m-1 flex center">
                              <div className="inline-flex overflow-hidden rounded-full border-8 border-white">
                                <img
                                  className="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                                  src={AvatarUrl}
                                />
                              </div>
                            </div>
                            <div className='mt-4 mx-auto'>
                                <h3 className="text-xl font-bold text-black sm:text-4xl">{DisplayName}</h3>
                              <div>
                          </div>
                              <p className="text-lg text-gray-500 mt-2">@{username}</p>
                          </div>
                        </div>
                      
                    {EthAddress &&  <div className='mt-2 ml-2'>
                          <Tag onClick={copyEthAddress} text={EthAddress} Icon={ClipboardIcon} classes={'bg-gradient-to-r from-orange-500 to-pink-500'} />
                      </div>}
                      
                    </div>
                 
                 </div>
                 
            </>
    )
}