import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

import { descriptions } from './descriptions';
import { LoadmillSuiteSchema } from './types';

const PARAMETER_NAME_REGEX = '^[_a-zA-Z][_a-zA-Z0-9]*';

const headerSchema = {
  type: 'object' as JSONSchema7TypeName,
  description: descriptions.header,
  patternProperties: {
    '^[a-zA-Z][a-zA-Z-]*': {
      type: 'string' as JSONSchema7TypeName,
    },
  },
};

const extractionSchema = {
  type: 'object',
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
  description: descriptions.existsAssertion,
  properties: {
    check: {
      description: descriptions.check,
      type: 'string',
    },
  },
  required: ['check'] as string[],
};

const notExistsAssertionSchema = {
  type: 'object',
  description: descriptions.notExistsAssertion,
  properties: {
    check: {
      description: descriptions.check,
      type: 'string',
    },
    falsy: {
      description: descriptions.falsy,
      type: 'boolean',
    },
  },
  required: ['check', 'falsy'] as string[],
};

const equalsAssertionSchema = {
  type: 'object',
  description: descriptions.equalsAssertion,
  properties: {
    check: {
      type: 'string',
      description: descriptions.check,
    },
    equals: {
      type: 'string',
      description: descriptions.equals,
    },
  },
  required: ['check', 'equals'] as string[],
};

const lesserAssertionSchema = {
  type: 'object',
  description: descriptions.lesserAssertion,
  properties: {
    check: {
      type: 'string',
      description: descriptions.check,
    },
    lesser: {
      type: 'string',
      description: descriptions.lesser,
    },
  },
  required: ['check', 'lesser'] as string[],
};

const requestSchema = {
  type: 'object' as JSONSchema7TypeName,
  description: descriptions.request,
  properties: {
    method: {
      type: 'string' as JSONSchema7TypeName,
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
      description: descriptions.url,
    },
    postData: {
      type: 'object' as JSONSchema7TypeName,
      description: descriptions.postData,
      properties: {
        text: {
          type: 'string' as JSONSchema7TypeName,
          description: descriptions.text,
        },
        mimeType: {
          type: 'string' as JSONSchema7TypeName,
          description: descriptions.mimeType,
        },
      },
      required: ['text', 'mimeType'] as string[],
    },
  },
  headers: {
    type: 'array' as JSONSchema7TypeName,
    description: descriptions.headers,
    items: [headerSchema],
  },
  extract: {
    type: 'array' as JSONSchema7TypeName,
    description: descriptions.extractions,
    items: [extractionSchema],
  },
  postScript: {
    type: 'string' as JSONSchema7TypeName,
    description: descriptions.postScript,
  },
  assert: {
    type: 'array' as JSONSchema7TypeName,
    description: descriptions.assertions,
    items: {
      anyOf: [existsAssertionSchema, notExistsAssertionSchema, equalsAssertionSchema, lesserAssertionSchema],
    },
  },
  loop: {
    description: descriptions.loop,
    type: 'object' as JSONSchema7TypeName,
    properties: {
      assert: {
        type: 'object' as JSONSchema7TypeName,
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
  description: descriptions.requests,
  items: [requestSchema],
};

const testFlowSchema = {
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: {
      type: 'string' as JSONSchema7TypeName,
      description: descriptions.flowId,
    },
    order: {
      type: 'integer' as JSONSchema7TypeName,
      description: descriptions.flowOrder,
      minimum: 0,
    },
    conf: {
      type: 'object' as JSONSchema7TypeName,
      description: descriptions.flowConf,
      properties: {
        meta: {
          type: 'object' as JSONSchema7TypeName,
          description: descriptions.flowMeta,
          properties: {
            description: {
              type: 'string' as JSONSchema7TypeName,
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
      description: descriptions.runInCi,
    },
  },
  required: ['id', 'order', 'conf'],
};

export const LOADMILL_SUITE_SCHEMA: LoadmillSuiteSchema = {
  description: descriptions.suite,
  type: 'object',
  properties: {
    conf: {
      type: 'object',
      description: descriptions.suiteConf,
      properties: {
        meta: {
          description: descriptions.suiteMeta,
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: descriptions.suiteDescription,
            },
          },
          required: ['description'],
        },
        parameters: {
          type: 'array',
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
          description: descriptions.suiteAuth,
          properties: {
            user: {
              type: 'string',
              description: descriptions.suiteAuthUser,
            },
            password: {
              type: 'string',
              description: descriptions.suiteAuthPassword,
            },
          },
          required: ['user', 'password'],
        },
        useCookies: {
          type: 'boolean',
          description: descriptions.useCookies,
        },
        loginFlow: {
          type: 'array',
          description: descriptions.loginFlow,
          items: [requestSchema],
        },
        authenticationHeaders: {
          type: 'array',
          description: descriptions.authenticationHeaders,
          items: [headerSchema],
        },
        sharedLoginFlowDescription: {
          type: 'string',
          description: descriptions.sharedLoginFlowDescription,
        },
        parametersScope: {
          type: 'string',
          description: descriptions.parametersScope,
          oneOf: [{ const: 'SUITE' }, { const: 'FLOW' }],
        },
      },
    },
    flows: {
      type: 'array',
      description: descriptions.flows,
      items: [testFlowSchema],
    },
    hooks: {
      type: 'object',
      description: descriptions.hooks,
      properties: {
        beforeAll: {
          description: descriptions.beforeAll,
          ...testFlowSchema,
        },
        beforeEach: {
          description: descriptions.beforeEach,
          ...testFlowSchema,
        },
        afterEach: {
          description: descriptions.afterEach,
          ...testFlowSchema,
        },
        afterAll: {
          description: descriptions.afterAll,
          ...testFlowSchema,
        },
      },
    },
    dependencies: {
      type: 'object',
      description: descriptions.dependencies,
      properties: {
        hooks: {
          type: 'object',
          description: descriptions.dependenciesHooks,
          properties: {
            beforeAllId: {
              type: 'string',
              description: descriptions.flowId,
            },
            beforeEachId: {
              type: 'string',
              description: descriptions.flowId,
            },
            afterEachId: {
              type: 'string',
              description: descriptions.flowId,
            },
            afterAllId: {
              type: 'string',
              description: descriptions.flowId,
            },
          },
        },
        login: {
          type: 'object',
          description: descriptions.dependenciesLogin,
          properties: {
            id: {
              type: 'string',
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
