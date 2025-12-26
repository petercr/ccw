import { blockTypes } from './blockTypes';
import { documentTypes } from './documentTypes';
import { fieldTypes } from './fieldTypes';

export const schemaTypes = [...documentTypes, ...blockTypes, ...fieldTypes];
