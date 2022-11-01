export interface iBanner {
  breadCrump: menu[];
  subbreadCrump?: any[];
  title?:any;
  menus?: menu[];
  withPrevArrow?: boolean;
  show?:boolean;
}

export interface menu {
  title: any;
  link?: string;
}
