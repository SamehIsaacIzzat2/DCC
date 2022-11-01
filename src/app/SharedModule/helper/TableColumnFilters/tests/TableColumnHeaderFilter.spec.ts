import { ITableColumn } from '../../../Interfaces/ITableColumn.interface';
import { ITableFilterOption } from '../../../Interfaces/ITableFilterOption.interface';
import TableColumnHeaderFilter from '../TableColumnHeaderFilter';

describe('TableColumnHeaderFilterFunction', () => {
  let _displayedColumns: ITableColumn[];
  let params: ITableFilterOption;

  beforeEach(async () => {
    params = {
      item: 'orderNo',
      checked: false,
    } as ITableFilterOption;
    _displayedColumns = [
      {
        name: 'orderNo',
        show: true,
      },
      {
        name: 'customerNumber',
        show: true,
      },
      {
        name: 'branch',
        show: true,
      },
      {
        name: 'district',
        show: true,
      },
      {
        name: 'salesMan',
        show: true,
      },
      {
        name: 'creationDate',
        show: true,
      },
    ] as ITableColumn[];
  });

  afterEach(() => {
    _displayedColumns = [{ name: '', show: false }];
    params = { item: '', checked: false };
  });

  it('Should make the upcomming params item as false', () => {
    _displayedColumns = TableColumnHeaderFilter(params, _displayedColumns);
    const index = _displayedColumns.findIndex(
      (c: ITableColumn) => c.name === params.item
    );
    expect(_displayedColumns[index].show).toBeFalse();
  });

  it('Should make the branch show as false', () => {
    params = {
      item: 'branch',
      checked: false,
    };
    _displayedColumns = TableColumnHeaderFilter(params, _displayedColumns);
    const index = _displayedColumns.findIndex(
      (c: ITableColumn) => c.name === 'branch'
    );
    expect(_displayedColumns[index].show).toBeFalse();
  });

  it('Should make the branch show as true', () => {
    params = {
      item: 'branch',
      checked: true,
    };
    _displayedColumns = TableColumnHeaderFilter(params, _displayedColumns);
    const index = _displayedColumns.findIndex(
      (c: ITableColumn) => c.name === 'branch'
    );
    expect(_displayedColumns[index].show).toBeTrue();
  });

  it('Should test the length of the displayed columns', () => {
    expect(_displayedColumns.length).toEqual(6);
  });
});
