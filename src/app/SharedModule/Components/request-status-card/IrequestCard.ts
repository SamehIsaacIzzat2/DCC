export interface RequestStatusCard{
    title:string,
    state:RequestState,
    id?:string;
}

export enum RequestState{
    active=1,
    inactive=2,
}
