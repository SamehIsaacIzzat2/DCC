import { ITableColumn } from '../../Interfaces/ITableColumn.interface';
import { ITableFilterOption } from '../../Interfaces/ITableFilterOption.interface';
import TableFilterByTransformation from './TableFilterByTransformation';
/**
 * Ahmed Khattab 3/8/2022
 * This function is a wrapper for handling the showing & hiding only the table column header.
 * @params params We will get it from the filter feature it has two value item as string & checked as boolean
 * @params columns array for the table header filter
 * @returns columns it will return new columns with the ones which will be shown or hidding
 */
export default (params: ITableFilterOption, columns: ITableColumn[]) => {
  for (let col of columns) {
    if (col.name === TableFilterByTransformation(params.item)) {
      col.show = params.checked;
    }
  }
  return columns;
};
