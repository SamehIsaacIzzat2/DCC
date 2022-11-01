import { ITableColumn } from '../../Interfaces/ITableColumn.interface';
import { ITableFilterOption } from '../../Interfaces/ITableFilterOption.interface';
import TableColumnFilterFeature from './TableColumnFilterFeature';
import TableColumnHeaderFilter from './TableColumnHeaderFilter';
/**
 * Ahmed Khattab 3/8/2022
 * This function is a wrapper for handling the showing & hiding of table column.
 * @params params We will get it from the filter feature it has two value item as string & checked as boolean
 * @params displayedColumns the displayed columns array for the table header
 * @params filterColumns the displayed row of the filteration.
 * @returns it will return new displayed columns & filter columns arrays after doing the filter action
 */

export default (
  params: ITableFilterOption,
  displayedColumns: ITableColumn[],
  filterColumns: ITableColumn[]
) => {
  return [
    TableColumnHeaderFilter(params, displayedColumns),
    TableColumnFilterFeature(params, filterColumns),
  ];
};
