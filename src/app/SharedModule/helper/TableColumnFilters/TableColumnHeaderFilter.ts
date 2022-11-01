import { ITableColumn } from '../../Interfaces/ITableColumn.interface';
import { ITableFilterOption } from '../../Interfaces/ITableFilterOption.interface';

/**
 * Ahmed Khattab 3/8/2022
 * This function is a wrapper for handling the showing & hiding only the table column header.
 * @params params We will get it from the filter feature it has two value item as string & checked as boolean
 * @params columns the displayed columns array for the table header
 * @returns columns it will return new columns with the ones which will be shown or hidding
 */
export default (params: ITableFilterOption, columns: ITableColumn[]) => {
  for (const col of columns) {
    if (col.name === params.item) {
      col.show = params.checked;
    }
  }
  return columns;
};
