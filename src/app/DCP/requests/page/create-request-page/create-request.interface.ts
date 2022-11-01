export interface createRequest {
  id?:string,
  companyId:number,
  interestId: string,
  countriesIds: any[],
  citiesIds: any[],
  locations?: any[],
  description: string,
  activitiesIds: any[],
  productsIds: any[],
  industriesIds: any[]
}
