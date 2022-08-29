import { names, uniqueNamesGenerator } from 'unique-names-generator';

export default () =>
  uniqueNamesGenerator({
    dictionaries: [names, names],
    separator: ' ',
    length: 2,
    style: 'capital',
  });
