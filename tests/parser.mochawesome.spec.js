const { parse } = require('../src');
const assert = require('assert');
const path = require('path');

describe('Parser - Mocha Awesome Json', () => {
  const testDataPath = "tests/data/mocha/awesome";

  it('single suite with single test', () => {
    const result = parse({ type: 'mochawesome', files: [`${testDataPath}/single-suite-single-test.json`] });
    assert.deepEqual(result, {
      id: '',
      name: '',
      total: 1,
      passed: 1,
      failed: 0,
      errors: 0,
      skipped: 0,
      retried: 0,
      duration: 3,
      status: 'PASS',
      suites: [
        {
          id: '',
          name: 'Simple Suite',
          total: 1,
          passed: 1,
          failed: 0,
          errors: 0,
          skipped: 0,
          duration: 1,
          status: 'PASS',
          meta_data: new Map(),
          cases: [
            {
              attachments: [],
              duration: 1,
              errors: 0,
              failed: 0,
              failure: "",
              id: "",
              name: "Simple suite test",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "PASS",
              meta_data: new Map(),
              steps: [],
              total: 0
            }
          ]
        }
      ]
    });
  });

  it('empty suite report', () => {
    const result = parse({ type: 'mochawesome', files: [`${testDataPath}/empty-suite.json`] });
    assert.deepEqual(result, {
      id: '',
      name: '',
      total: 0,
      passed: 0,
      failed: 0,
      errors: 0,
      skipped: 0,
      retried: 0,
      duration: 0,
      status: 'PASS',
      suites: []
    });
  });
  
  it('suite with skipped tests', () => {
    const result = parse({ type: 'mochawesome', files: [`${testDataPath}/skipped-tests.json`] });
    assert.deepEqual(result, {
      id: '',
      name: '',
      total: 2,
      passed: 1,
      failed: 0,
      errors: 0,
      skipped: 1,
      retried: 0,
      duration: 3,
      status: 'PASS',
      suites: [
        {
          id: '',
          name: 'Example Suite',
          total: 2,
          passed: 1,
          failed: 0,
          errors: 0,
          skipped: 1,
          duration: 1,
          status: 'PASS',
          meta_data: new Map(),
          cases: [
            {
              attachments: [],
              duration: 1,
              errors: 0,
              failed: 0,
              failure: "",
              id: "",
              name: "first sample test",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "PASS",
              meta_data: new Map(),
              steps: [],
              total: 0
            },
            {
              attachments: [],
              duration: 0,
              errors: 0,
              failed: 0,
              failure: "",
              id: "",
              name: "second sample test",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "SKIP",
              meta_data: new Map(),
              steps: [],
              total: 0
            }
          ]
        }
      ]
    });
  });

  it('multiple suites', () => {
    const result = parse({ type: 'mochawesome', files: [`${testDataPath}/multiple-suites-multiple-tests.json`] });
    assert.deepEqual(result, {
      id: '',
      name: '',
      total: 3,
      passed: 2,
      failed: 1,
      errors: 0,
      skipped: 0,
      retried: 0,
      duration: 7,
      status: 'FAIL',
      suites: [
        {
          id: '',
          name: 'Example Suite 1',
          total: 2,
          passed: 2,
          failed: 0,
          errors: 0,
          skipped: 0,
          duration: 4,
          status: 'PASS',
          meta_data: new Map(),
          cases: [
            {
              attachments: [],
              duration: 3,
              errors: 0,
              failed: 0,
              failure: "",
              id: "",
              name: "sample test case",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "PASS",
              meta_data: new Map(),
              steps: [],
              total: 0
            },
            {
              attachments: [],
              duration: 1,
              errors: 0,
              failed: 0,
              failure: "",
              id: "",
              name: "sample test case 2",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "PASS",
              meta_data: new Map(),
              steps: [],
              total: 0
            }
          ]
        },
        {
          id: '',
          name: 'Example Suite 2',
          total: 1,
          passed: 0,
          failed: 1,
          errors: 0,
          skipped: 0,
          duration: 1,
          status: 'FAIL',
          meta_data: new Map(),
          cases: [
            {
              attachments: [],
              duration: 1,
              errors: 0,
              failed: 0,
              failure: "Dummy reason",
              id: "",
              name: "sample test case",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "FAIL",
              meta_data: new Map(),
              steps: [],
              total: 0
            }
          ]
        }
      ]
    });
  });

  it('nested suites', () => {
    const result = parse({ type: 'mochawesome', files: [`${testDataPath}/nested-suites.json`] });
    assert.deepEqual(result, {
      id: '',
      name: '',
      total: 3,
      passed: 2,
      failed: 1,
      errors: 0,
      skipped: 0,
      retried: 0,
      duration: 7,
      status: 'FAIL',
      suites: [
        {
          id: '',
          name: 'Example Suite 1',
          total: 2,
          passed: 2,
          failed: 0,
          errors: 0,
          skipped: 0,
          duration: 4,
          status: 'PASS',
          meta_data: new Map(),
          cases: [
            {
              attachments: [],
              duration: 3,
              errors: 0,
              failed: 0,
              failure: "",
              id: "",
              name: "sample test case",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "PASS",
              meta_data: new Map(),
              steps: [],
              total: 0
            },
            {
              attachments: [],
              duration: 1,
              errors: 0,
              failed: 0,
              failure: "",
              id: "",
              name: "sample test case 2",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "PASS",
              meta_data: new Map(),
              steps: [],
              total: 0
            }
          ]
        },
        {
          id: '',
          name: 'Example Suite 2',
          total: 1,
          passed: 0,
          failed: 1,
          errors: 0,
          skipped: 0,
          duration: 1,
          status: 'FAIL',
          meta_data: new Map(),
          cases: [
            {
              attachments: [],
              duration: 1,
              errors: 0,
              failed: 0,
              failure: "Dummy reason",
              id: "",
              name: "sample test case",
              passed: 0,
              skipped: 0,
              stack_trace: "",
              status: "FAIL",
              meta_data: new Map(),
              steps: [],
              total: 0
            }
          ]
        }
      ]
    });
  });

  it('can support absolute and relative file paths', () => {
    let relativePath = `${testDataPath}/single-suite-single-test.json`;
    let absolutePath = path.resolve(relativePath);
    const result1 = parse({ type: 'mochawesome', files: [absolutePath] });
    assert.notEqual(null, result1);
    const result2 = parse({ type: 'mochawesome', files: [relativePath]});
    assert.notEqual(null, result2);
  });

});
