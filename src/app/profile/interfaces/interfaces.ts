export interface GeneralInfo {
  email: string,
  emiratesID: string,
  // emiratesId: string,
  unifiedId: string,
  firstName: string,
  lastName: string,
  nationalityId: string
  passportNumber: string
  photo: string
  title: string
}
export interface ContactInfo {
  mobileNumber: string
  officeNumber: string
  personalEmail: string
  workEmail: string
  workNumber: string
}
export interface AddressInfo {
  address: string,
  countryId: string,
  cityId: string,
  provinceState: string,
  zipCode: string
}
export interface SocialInfo {
  website: string,
  linkedIn: string,
  faceBook: string,
  insta: string,
  twitter: string,
  others: string
}

export interface UserProfile {
  addressInfo: AddressInfo,
  contactInfo: ContactInfo,
  generalInfo: GeneralInfo,
  socialMediaInfo: SocialInfo;
}
