import { JSONSchema7, JSONSchema7TypeName, JSONSchema7Definition } from 'json-schema';

type InformativeSchema = JSONSchema7 & {
  title: string;
  description: string | InformativeSchema;
  type: JSONSchema7TypeName | JSONSchema7TypeName[] | undefined;
};

export type LoadmillSuiteSchema = InformativeSchema & {
  description: string | LoadmillSuiteSchema;
  required?: string[] | undefined;
  items?:
    | JSONSchema7Definition
    | JSONSchema7Definition[]
    | {
        [key: string]: LoadmillSuiteSchema;
      }[]
    | undefined;
  properties?:
    | {
        [key: string]: LoadmillSuiteSchema;
      }
    | undefined;
  dependencies?:
    | {
        [key: string]: LoadmillSuiteSchema;
      }
    | undefined;
};
