export interface draftReq {
  activities: lookupItem[]
  cities: lookupItem[]
  countries: lookupItem[]
  created: string
  description: string
  id: string
  industries: lookupItem[]
  interest: { id: string, name: string }
  modified:string
  products: lookupItem[]
  requestNumber: string
  serviceType: number
  serviceTypeName: string
  status: number
  statusName: string
  companyID:string
}

interface lookupItem {
  id:string
  name:string
}
