import axios from "axios";
import { getCastsPageData, getUser } from "../../services/farcaster";

export default async function handler(req: any, res: any) {
    
    try {
        const username = process.env.USERNAME as string;
        const directoryUrl = await getUser(username);
     
        const user = await axios.get(directoryUrl)
        .then((r: any) => {return r})
        .catch((e: any) => console.log(e));

        await axios.get(user.data.body.proofUrl).then(((result: any) => {
            user.data.body.address = result.data.signerAddress;;
        })).catch((e: any) => {
            console.log(e);
        });

        user.data.body.id = username;
        
        const casts = await getCastsPageData(username);
        res.status(200).json({ user: user.data.body, casts: casts })
    
    } catch (error: any) {
        console.log(error);
    }

}