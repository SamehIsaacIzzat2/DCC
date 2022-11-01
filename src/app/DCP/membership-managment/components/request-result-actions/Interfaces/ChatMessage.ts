export interface ChatMessage{
    contactName: string,
    contactId: string,
    isAgent: boolean,
    comment: string,
    memebershipRequestAccountName: string,
    memebershipRequestId:string,
    createDate:string
}

export interface LastUpdateDate{
    date:string;
    message:string;
}