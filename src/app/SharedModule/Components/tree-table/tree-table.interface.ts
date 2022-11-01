export class Tree {
  code?: string;
  arName?: string;
  enName?: string;
  country?: string;
  processTypeCountry?: string;
  quantity?: string;
  price?: string;
  totalPrice?: string;
  packages?: Tbody[];
}

export class Tbody {
  id?: any;
  type?: string;
  typeName?: string;
  size?: string;
  weight?: string;
  count?: string;
  quantity?: string;
}
