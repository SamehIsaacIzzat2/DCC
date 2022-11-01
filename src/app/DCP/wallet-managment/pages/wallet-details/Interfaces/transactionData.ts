
export interface TransactionData {
    amount:number
    balance:number
    companyName:string
    transactionNumber:string
    transferedDate:Date
}

export interface companyWallet{
        walletId: string,
        companyId:string,
        company: string,
        balance: number,
        selected?:boolean
}