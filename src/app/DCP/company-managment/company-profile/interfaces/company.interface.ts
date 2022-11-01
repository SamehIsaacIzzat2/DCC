export interface compGeneralInfo {
  entityName: string;
  sectorId: string;
  entityTypeId: string;
  annualTurnoverId: string;
  companySizeId: string;
  numberofEmployeesId: string;
  dedMembershipNumber?: string;
  dcciMembershipNumber?: string;
  parentEntityId: string;
  subsidiaryEntitiesIds: string;
  industryId: string;
  industrys?:{id:string,name:string}[];
  subsiderys?: { id: string, name: string }[]
}
export interface compAddressInfo {
  address: string;
  countryId: string;
  cityId: string;
  provinceState: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
}
export interface compSocialInfo {
  contactOwner: string;
  contactCreator: string;
  nationalityId: string;
  jobTitle: string;
  website: string;
  linkedIn: string;
  faceBook: string;
  insta: string;
  twitter: string;
  others: string;
}

export interface compCommunicationSettinggs {
  emailReceivers: string[];
  smsReceivers: string[];
}
export interface companyInterface {
  id: string;
  generalInfo: compGeneralInfo;
  addressAndContactInfo: compAddressInfo;
  socialAndOtherInfo: compSocialInfo;
  communicationSetting: compCommunicationSettinggs;
}
