export interface requestAction {
  id: string,
  businessMatchingLineId: string,
  name: string,
  statusName: string,
  match: string,
  opportunities: string,

  countries: string[],
  cities: string[],
  locations: string[],

  description: string,
  image: string,
  productsNames: string[],
  activitiesNames: string[],
  industries: string[]
  size: string,
  selected: boolean


}
