import { providers, Contract, utils } from "ethers";
import axios from 'axios';
import { REGISTRY_ABI } from "./resources/REGISTRY_ABI";

const getNode = () => {
  return new providers.AlchemyProvider('rinkeby', process.env.ALCHEMY_SECRET);
}

export const getContract = async () => {
  const REGISTRY_CONTRACT_ADDRESS = '0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1'
  const provider = getNode()
  return new Contract(REGISTRY_CONTRACT_ADDRESS, REGISTRY_ABI, provider);
}

export const getCasts = async (username: string) => {
  const registryContract = await getContract();
  const directoryUrl = await registryContract?.getDirectoryUrl(utils.formatBytes32String(username)); 

  const directoryResponse = await axios.get(directoryUrl).then((result: any) => {
    return result;
  }).catch((e: any)=> console.log(e));

  const addressActivityResponse = await (await axios.get(directoryResponse.data.body.addressActivityUrl)).data;

  addressActivityResponse.map((cast: any, i: number) => {
    const stringifiedCastBody = JSON.stringify(cast.body);
    
    const calculatedHash = utils.keccak256(utils.toUtf8Bytes(stringifiedCastBody));
    const expectedHash = cast.merkleRoot;

    if (calculatedHash !== expectedHash) {


      const index = addressActivityResponse.indexOf(i);
      addressActivityResponse.splice(index, 1);


      console.log(`FAILED: the calculated hash ${calculatedHash} does not match the one in the cast: ${expectedHash}`);
    } else {
      console.log(`PASSED: the calculated hash ${calculatedHash} matches the one in the cast`);
    }
  });


  return addressActivityResponse.filter((c: any) =>
  
 (!c.body.data.replyParentMerkleRoot || c.meta.replyParentUsername?.username === username)
  && 
  !(c.body.data.text.includes("delete:farcaster://casts") || 
    c.body.data.text.includes("recast:farcaster://casts"))
  );
}

export const getUser = async (username:string) => {
  const registryContract = await getContract();
  const directoryUrl = await registryContract?.getDirectoryUrl(utils.formatBytes32String(username)); 
  return directoryUrl;
}

export const getCastsPageData = async (username: string) => { 
  const casts = await getCasts(username);

  casts.forEach((cast: any) => {
    const date = 
    (Math.round((new Date(cast.body.publishedAt).getTime() - 
     new Date().getTime()) / (1000 * 60 * 60 * 24)))

    cast.body.publishedAt = date === 0 ?  'today' : `${Math.abs(date)} days ago`;
    cast.body.data.text = cast.body.data.text.replace(/https:\/\/i.imgur.com\/(\S+)\.png/g, '') 
  });

 const newFormCasts = casts.map((cast: any, i: number) => {
    const mk = cast.body.data.replyParentMerkleRoot;
    
    if(mk) {
      for (let index = i; index < casts.length; index++) {
        if (casts[index].merkleRoot === mk) {
          casts[index].body.reply = cast;
        }
      }
    }
    return cast
  }).filter((cast: any) => !cast.body.data.replyParentMerkleRoot)
  

  return newFormCasts;
}