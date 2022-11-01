const UNIQUE_FILTER_IDENTIFER = 'FBy';

export default (name: string) =>
  UNIQUE_FILTER_IDENTIFER + name[0].toUpperCase() + name.slice(1);
