export interface ITableHeader {
  records: number;
  hasActions: boolean;
  hasColumnSettings: boolean;
  title: string;
  hasRefresh: boolean;
  hasExport: boolean;
  hasTab: boolean;
  tabItems: Array<ITabItem>;
}

export interface ITabItem {
  tabName: string;
  isActive: boolean;
  tag :number;
}
