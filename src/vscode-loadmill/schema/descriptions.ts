export const descriptions = {
  suite:
    'A Test Suite is a collection of Test Flows that belong to specific tasks or feature, or have some other reason to be run together. When executed, if one of the flows fails, the Test Suite run will fail.',
  suiteConf: "The suite's configuration object.",
  suiteMeta: "The suite's metadata. Currently only has a description field.",
  suiteDescription: 'The name of the suite',
  suiteParameters: 'Reusable, named, key-value pairs. Can be used in other fields of the suite like so: ${my_param}',
  suiteAuth: 'Login and password authentication',
  suiteAuthUser: 'Login part of the auth',
  suiteAuthPassword: 'Password part of the auth',
  useCookies:
    'When set to true, cookies received by the login flow requests will be accessible by the requests of the test flows of the suite.',
  flows:
    'Test flow is a series of API calls (HTTP requests) that represent a single "user" flow you would like to test.' +
    'These requests will be executed sequentially until completion or until the first failure.',
  loginFlow:
    'A short flow that will run before your test flows. ' +
    'This setup flow is most commonly used to execute requests that will authenticate the test flow itself via cookies or authorization tokens. ' +
    'This flow can also be used to retrieve and extract data necessary for the execution of your test flows.',
  request: 'Request is the most basic building block of tests. It represents a single API call or a user action.',
  method: 'A supported HTTP method. Currently supported are GET, POST, PUT, PATCH and DELETE.',
  url: 'The address of a given unique resource on the Web',
  authenticationHeaders: 'Will apply to all test flow requests of that suite and override any matching headers.',
  headers: 'HTTP headers let the client and the server pass additional information with an HTTP request or response.',
  header: 'An key-value HTTP header. Consists of its case-insensitive key.',
  sharedLoginFlowDescription: 'The name of the login flow, if it is indeed a shared flow.',
  parametersScope:
    'By default, Test Suite parameters have the Single Flow Run execution scope, aka "FLOWS". ' +
    'The alternative option is to select the Entire Test Suite Run scope, aka "SUITE".',
  runInCi: 'Set to true to enable the flow to run when executed from your continuous integration pipeline.',
  flowId:
    'A constant universally unique identifier, automatically generate by Loadmill. ' +
    'Conforming to version uuid v4. ' +
    'Warning: do not change this value',
  flowOrder: 'The order of execution of the flow in the flows list.',
  flowConf: "The test flow's configuration details and settings.",
  flowMeta: "The flow's metadata. Currently only has a description field.",
  flowDescription: 'The name of the flow',
  requests: 'A list of HTTP requests that will execute sequentially',
  postData: 'The body of the request',
  mimeType:
    'indicates the nature and format of a document, file, or assortment of bytes. ' +
    "MIME types are defined and standardized in IETF's RFC 6838.",
  text: 'The post data text. Will be interpreted as the defined mimeType. ',
  extractions:
    'A list of extractions. ' +
    'Extraction is a value extracted from the response into a parameter. ' +
    'These extracted values can be use in any of the following requests. ' +
    'Can also be used to assert and verify your response success criteria.',
  extraction:
    'A value extracted from the response into a parameter.' +
    'Can be use in any of the following requests. ' +
    'Can also be used to assert and verify your response success criteria.',
  postScript: 'Javascript code that may contain parameter extractions, custom assertions, and much more.',
  assertions:
    'A list of assertions.' + 'Used in conjunction with parameters to validate the response and assert its correctness.',
  assertion: 'Used in conjunction with parameters to validate the response and assert its correctness.',
  existsAssertion: 'Validates the checked parameter exists (and not undefined or null).',
  check: 'The parameter name.',
  notExistsAssertion: 'Validates the checked parameter does not exist (possibly undefined or null).',
  falsy: 'The state of existence of the parameter.',
  equalsAssertion: 'Validates the checked parameter value equals the given compared value',
  equals: 'The compared value',
  lesserAssertion: 'Validates the checked parameter value is less than the given compared value',
  lesser: 'The compared value',
  loop: "Repeats the request until the parameter's value meets the requirement or number of iteration reached",
  hooks: 'Setup & teardown flows that execute before & after your tests run.',
  beforeAll: 'A flow that will run once before all other flows.',
  beforeEach: 'A flow that will run before each flow.',
  afterEach: 'A flow that will run after each flow.',
  afterAll: 'A flow that will run once after all other flows.',
  dependencies:
    'Flows this suite needs to execute properly.' +
    'Warning: do not change this data unless you know exactly what you are doing.',
  dependenciesHooks:
    'Hooks this suite needs to execute properly.' +
    'Warning: do not change this data unless you know exactly what you are doing.',
  dependenciesLogin:
    'Login this suite needs to execute properly.' +
    'Warning: do not change this data unless you know exactly what you are doing.',
};
