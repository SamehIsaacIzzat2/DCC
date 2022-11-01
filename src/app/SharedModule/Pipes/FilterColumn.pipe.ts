import { Pipe, PipeTransform } from '@angular/core';
import { ITableColumn } from '../Interfaces/ITableColumn.interface';

@Pipe({
  name: 'toggleColumns',
})
export class ToggleColumnsPipe implements PipeTransform {
  /**
   * #Ahmed Khattab 3/8/2022
   * This pipe is responsible for getting a displayed columns and filter them to show only the filtered columns
   * @param displayedColumns
   * @param columns
   * @returns Filtered Columns
   */
  transform(displayedColumns: string[], columns: ITableColumn[]): string[] {
    displayedColumns = columns
      .filter((c: any) => !!c.show)
      .map((c: any) => c.name);
    return displayedColumns;
  }
}
