import { ITableColumn } from '../../../Interfaces/ITableColumn.interface';
import { ITableFilterOption } from '../../../Interfaces/ITableFilterOption.interface';
import TableColumnFilterFeature from '../TableColumnFilterFeature';
import TableFilterByTransformation from '../TableFilterByTransformation';

describe('TableColumnFilterFeatureFunction', () => {
  let _displayedColumns: ITableColumn[];
  let params: ITableFilterOption;

  beforeEach(async () => {
    params = {
      item: 'orderNo',
      checked: false,
    } as ITableFilterOption;

    _displayedColumns = [
      {
        name: 'FByOrderNo',
        show: true,
      },
      {
        name: 'FByCustomerNumber',
        show: true,
      },
      {
        name: 'FByBranch',
        show: true,
      },
      {
        name: 'FByDistrict',
        show: true,
      },
    ] as ITableColumn[];
  });

  afterEach(() => {
    _displayedColumns = [{ name: '', show: false }];
    params = { item: '', checked: false };
  });

  it('Should make the upcomming params item as false', () => {
    _displayedColumns = TableColumnFilterFeature(params, _displayedColumns);
    const index = _displayedColumns.findIndex(
      (c: ITableColumn) => c.name === TableFilterByTransformation(params.item)
    );
    expect(_displayedColumns[index].show).toBeFalse();
  });

  it('Should make the branch filter show as false', () => {
    params = {
      item: 'branch',
      checked: false,
    };
    _displayedColumns = TableColumnFilterFeature(params, _displayedColumns);
    const index = _displayedColumns.findIndex(
      (c: ITableColumn) => c.name === TableFilterByTransformation(params.item)
    );
    expect(_displayedColumns[index].show).toBeFalse();
    expect(_displayedColumns[index].name).toBe('FByBranch');
  });
});
