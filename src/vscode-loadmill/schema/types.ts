import { JSONSchema7, JSONSchema7TypeName, JSONSchema7Definition } from 'json-schema';

type InformativeSchema = JSONSchema7 & {
  description: string;
  type: JSONSchema7TypeName | JSONSchema7TypeName[] | undefined;
};

export type LoadmillSuiteSchema = InformativeSchema & {
  dependencies?:
    | {
        [key: string]: LoadmillSuiteSchema;
      }
    | undefined;
};
