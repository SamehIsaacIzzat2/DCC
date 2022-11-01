import { IPerson } from "../PersonItem/iPerson";

export interface IPersonInfo {
    id: string;
    person: IPerson;
    mobile: string;
    role: Array<any>;
    sapCustomerId: string;
    sapCustomerObjectId: string;
}