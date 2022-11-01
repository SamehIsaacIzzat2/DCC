export interface ILeadInteractionData {
  id:string;
  interactionType: number;
  interactionTypeName: string;
  proposedDateTime: number;
  status: string;
  // I made this optional feilds as Api return the same feild with 2 name interactionStatusName ,statusName
  // Api which bring all interaction use statusName feild
  // Api which bring one interaction by its ID use interactionStatusName feild
  interactionStatusName?:string; 
  statusName?:string;
}
