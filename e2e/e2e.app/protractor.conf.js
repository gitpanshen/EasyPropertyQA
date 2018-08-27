exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--no-sandbox', '--window-size=1280,720']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4500/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function () { }
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e.app/tsconfig.e2e.json'
    });

    // require('connect')().use(require('serve-static')('www')).listen(4200);
  },
  onPrepare() {
    var specReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new specReporter.SpecReporter);
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
      verbosity: 3,
      color: true,
      showStack: true
    }));
    /*
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath: process.env.JUNIT_REPORT_PATH,
      outputFile: process.env.JUNIT_REPORT_NAME,
      consolidateAll: true
    }));
    */
  }
};
