import TableFilterByTransformation from '../TableFilterByTransformation';

describe('TableFilterByTransformationFunction', () => {
  let branch: string;
  let order: string;
  let UNIQUE_FILTER_IDENTIFER: string;

  beforeEach(() => {
    branch = 'branch';
    order = 'order';
    UNIQUE_FILTER_IDENTIFER = 'FBy';
  });

  afterEach(() => {
    branch = '';
    order = '';
    UNIQUE_FILTER_IDENTIFER = '';
  });

  it('Should tranform branch name to be FByBranch', () => {
    const tranformedName = TableFilterByTransformation(branch);
    expect(tranformedName).toEqual('FBy' + 'Branch');
  });

  it('Should tranform order to be FByOrder', () => {
    const tranformedName = TableFilterByTransformation(order);
    expect(tranformedName).toEqual('FBy' + 'Order');
  });
});
