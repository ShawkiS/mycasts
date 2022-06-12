export interface DataObject { 
    user: User;
    casts: Cast []
}

export interface User {
    addressActivityUrl: string;
    avatarUrl: string;
    displayName: string;
    id: string;
    proofUrl: string;
    timestamp: BigInt;
    version: number;
}

export interface Data {
    text: string;
}

export interface Body {
    type: string;
    publishedAt: number;
    sequence: number;
    username: string;
    address: string;
    data: Data;
    prevMerkleRoot: string;
    reply: Cast;
}

export interface Reactions {
    count: number;
    type: string;
    self: boolean;
}

export interface Recasts {
    count: number;
    self: boolean;
}

export interface Watches {
    count: number;
    self: boolean;
}

export interface Meta {
    displayName: string;
    avatar: string;
    isVerifiedAvatar: boolean;
    numReplyChildren: number;
    reactions: Reactions;
    recasts: Recasts;
    watches: Watches;
}

export interface OpenGraph {
    url: string;
    title: string;
    description: string;
    domain: string;
    image: string;
    logo: string;
    useLargeImage: boolean;
    strippedCastText: string;
}

export interface Attachments {
    openGraph: OpenGraph[];
}

export interface Cast {
    body: Body;
    merkleRoot: string;
    signature: string;
    meta: Meta;
    attachments: Attachments;
}
