import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

import { LOADMILL_SCHEMA_URL } from '../constants';
import { descriptions } from './descriptions';
import { titles } from './titles';
import { LoadmillSuiteSchema } from './types';

const PARAMETER_NAME_REGEX = '^[_a-zA-Z][_a-zA-Z0-9]*';

const headerSchema = {
  type: 'object' as JSONSchema7TypeName,
  title: titles.header,
  description: descriptions.header,
  patternProperties: {
    '^[a-zA-Z][a-zA-Z-]*': {
      type: 'string' as JSONSchema7TypeName,
    },
  },
};

const extractionSchema = {
  type: 'object',
  title: titles.extraction,
  description: descriptions.extraction,
  patternProperties: {
    [PARAMETER_NAME_REGEX]: {
      type: 'object',
      properties: {
        jsonPath: {
          type: 'string',
        },
        header: {
          type: 'string',
        },
        jQuery: {
          type: 'string',
        },
        edn: {
          type: 'string',
        },
        regex: {
          type: 'string',
        },
      },
    },
  },
};

const existsAssertionSchema = {
  type: 'object',
  title: titles.existsAssertion,
  description: descriptions.existsAssertion,
  properties: {
    check: {
      title: titles.check,
      description: descriptions.check,
      type: 'string',
    },
  },
  required: ['check'] as string[],
};

const notExistsAssertionSchema = {
  type: 'object',
  title: titles.notExistsAssertion,
  description: descriptions.notExistsAssertion,
  properties: {
    check: {
      title: titles.check,
      description: descriptions.check,
      type: 'string',
    },
    falsy: {
      title: titles.falsy,
      description: descriptions.falsy,
      type: 'boolean',
    },
  },
  required: ['check', 'falsy'] as string[],
};

const equalsAssertionSchema = {
  type: 'object',
  title: titles.equalsAssertion,
  description: descriptions.equalsAssertion,
  properties: {
    check: {
      type: 'string',
      title: titles.check,
      description: descriptions.check,
    },
    equals: {
      type: 'string',
      title: titles.equals,
      description: descriptions.equals,
    },
  },
  required: ['check', 'equals'] as string[],
};

const lesserAssertionSchema = {
  type: 'object',
  title: titles.lesserAssertion,
  description: descriptions.lesserAssertion,
  properties: {
    check: {
      type: 'string',
      title: titles.check,
      description: descriptions.check,
    },
    lesser: {
      type: 'string',
      title: titles.lesser,
      description: descriptions.lesser,
    },
  },
  required: ['check', 'lesser'] as string[],
};

const requestSchema = {
  type: 'object' as JSONSchema7TypeName,
  title: titles.request,
  description: descriptions.request,
  properties: {
    method: {
      type: 'string' as JSONSchema7TypeName,
      title: titles.method,
      description: descriptions.method,
      oneOf: [
        { type: 'string', const: 'GET' } as JSONSchema7,
        { type: 'string', const: 'POST' } as JSONSchema7,
        { type: 'string', const: 'PUT' } as JSONSchema7,
        { type: 'string', const: 'PATCH' } as JSONSchema7,
        { type: 'string', const: 'DELETE' } as JSONSchema7,
      ],
    },
    url: {
      type: 'string' as JSONSchema7TypeName,
      title: titles.url,
      description: descriptions.url,
    },
    postData: {
      type: 'object' as JSONSchema7TypeName,
      title: titles.postData,
      description: descriptions.postData,
      properties: {
        text: {
          type: 'string' as JSONSchema7TypeName,
          title: titles.text,
          description: descriptions.text,
        },
        mimeType: {
          type: 'string' as JSONSchema7TypeName,
          title: titles.mimeType,
          description: descriptions.mimeType,
        },
      },
      required: ['text', 'mimeType'] as string[],
    },
  },
  headers: {
    type: 'array' as JSONSchema7TypeName,
    title: titles.headers,
    description: descriptions.headers,
    items: [headerSchema],
  },
  extract: {
    type: 'array' as JSONSchema7TypeName,
    title: titles.extractions,
    description: descriptions.extractions,
    items: [extractionSchema],
  },
  postScript: {
    type: 'string' as JSONSchema7TypeName,
    title: titles.postScript,
    description: descriptions.postScript,
  },
  assert: {
    type: 'array' as JSONSchema7TypeName,
    title: titles.assertions,
    description: descriptions.assertions,
    items: {
      anyOf: [existsAssertionSchema, notExistsAssertionSchema, equalsAssertionSchema, lesserAssertionSchema],
    },
  },
  loop: {
    title: titles.loop,
    description: descriptions.loop,
    type: 'object' as JSONSchema7TypeName,
    properties: {
      assert: {
        type: 'object' as JSONSchema7TypeName,
        title: titles.assertion,
        description: descriptions.assertion,
        oneOf: [existsAssertionSchema, notExistsAssertionSchema, equalsAssertionSchema, lesserAssertionSchema],
      },
      iterations: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
      },
    },
    required: ['assert', 'iterations'] as string[],
  },
};

const requestsSchema = {
  type: 'array' as JSONSchema7TypeName,
  title: titles.requests,
  description: descriptions.requests,
  items: [requestSchema],
};

const testFlowSchema = {
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: {
      type: 'string' as JSONSchema7TypeName,
      title: titles.flowId,
      description: descriptions.flowId,
    },
    order: {
      type: 'integer' as JSONSchema7TypeName,
      title: titles.flowOrder,
      description: descriptions.flowOrder,
      minimum: 0,
    },
    conf: {
      type: 'object' as JSONSchema7TypeName,
      title: titles.flowConf,
      description: descriptions.flowConf,
      properties: {
        meta: {
          type: 'object' as JSONSchema7TypeName,
          title: titles.flowMeta,
          description: descriptions.flowMeta,
          properties: {
            description: {
              type: 'string' as JSONSchema7TypeName,
              title: titles.flowDescription,
              description: descriptions.flowDescription,
            },
          },
          required: ['description'],
        },
        requests: requestsSchema,
      },
      required: ['meta', 'requests'],
    },
    runInCi: {
      type: 'boolean' as JSONSchema7TypeName,
      title: titles.runInCi,
      description: descriptions.runInCi,
    },
  },
  required: ['id', 'order', 'conf'],
};
export const LOADMILL_SUITE_SCHEMA: LoadmillSuiteSchema = {
  title: titles.suite,
  description: descriptions.suite,
  $schema: LOADMILL_SCHEMA_URL,
  type: 'object',
  properties: {
    conf: {
      type: 'object',
      title: titles.suiteConf,
      description: descriptions.suiteConf,
      properties: {
        meta: {
          title: titles.suiteMeta,
          description: descriptions.suiteMeta,
          type: 'object',
          properties: {
            description: {
              type: 'string',
              title: titles.suiteDescription,
              description: descriptions.suiteDescription,
            },
          },
          required: ['description'],
        },
        parameters: {
          type: 'array',
          title: titles.suiteParameters,
          description: descriptions.suiteParameters,
          items: [
            {
              type: 'object',
              patternProperties: {
                [PARAMETER_NAME_REGEX]: {
                  type: 'string',
                },
              },
            },
          ],
        },
        auth: {
          type: 'object',
          title: titles.suiteAuth,
          description: titles.suiteAuth,
          properties: {
            user: {
              type: 'string',
              title: titles.suiteAuthUser,
              description: descriptions.suiteAuthUser,
            },
            password: {
              type: 'string',
              title: titles.suiteAuthPassword,
              description: descriptions.suiteAuthPassword,
            },
          },
          required: ['user', 'password'],
        },
        useCookies: {
          type: 'boolean',
          title: titles.useCookies,
          description: descriptions.useCookies,
        },
        loginFlow: {
          type: 'array',
          title: titles.loginFlow,
          description: descriptions.loginFlow,
          items: [requestSchema],
        },
        authenticationHeaders: {
          type: 'array',
          title: titles.authenticationHeaders,
          description: descriptions.authenticationHeaders,
          items: [headerSchema],
        },
        sharedLoginFlowDescription: {
          type: 'string',
          title: titles.sharedLoginFlowDescription,
          description: descriptions.sharedLoginFlowDescription,
        },
        parametersScope: {
          type: 'string',
          title: titles.parametersScope,
          description: descriptions.parametersScope,
          oneOf: [{ const: 'SUITE' }, { const: 'FLOW' }],
        },
      },
    },
    flows: {
      type: 'array',
      title: titles.flows,
      description: descriptions.flows,
      items: [testFlowSchema],
    },
    hooks: {
      type: 'object',
      title: titles.hooks,
      description: descriptions.hooks,
      properties: {
        beforeAll: {
          title: titles.beforeAll,
          description: descriptions.beforeAll,
          ...testFlowSchema,
        },
        beforeEach: {
          title: titles.beforeEach,
          description: descriptions.beforeEach,
          ...testFlowSchema,
        },
        afterEach: {
          title: titles.afterEach,
          description: descriptions.afterEach,
          ...testFlowSchema,
        },
        afterAll: {
          title: titles.afterAll,
          description: descriptions.afterAll,
          ...testFlowSchema,
        },
      },
    },
    dependencies: {
      type: 'object',
      title: titles.dependencies,
      description: descriptions.dependencies,
      properties: {
        hooks: {
          type: 'object',
          title: titles.dependenciesHooks,
          description: descriptions.dependenciesHooks,
          properties: {
            beforeAllId: {
              type: 'string',
              title: titles.flowId,
              description: descriptions.flowId,
            },
            beforeEachId: {
              type: 'string',
              title: titles.flowId,
              description: descriptions.flowId,
            },
            afterEachId: {
              type: 'string',
              title: titles.flowId,
              description: descriptions.flowId,
            },
            afterAllId: {
              type: 'string',
              title: titles.flowId,
              description: descriptions.flowId,
            },
          },
        },
        login: {
          type: 'object',
          title: titles.dependenciesLogin,
          description: descriptions.dependenciesLogin,
          properties: {
            id: {
              type: 'string',
              title: titles.flowId,
              description: descriptions.flowId,
            },
          },
          required: ['id'],
        },
      },
      required: ['login'],
    },
  },
  required: ['flows'],
};
