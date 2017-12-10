var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var AllureReporter = require('jasmine-allure-reporter');

// exports.WORKSPACE = require('e2e-properties.js');
// var properties = require(process.env.WORKSPACE);

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: "http://localhost:4444/wd/hub",

  // Spec patterns are relative to the location of this config.
  specs: [
    'webapp/e2e/spec/*Spec.js'
  ],


  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
  },


  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.

    onPrepare:function() {

        global.isAngularSite = function (flag) {
            browser.ignoreSynchronization = !flag;
        };

        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailuredSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true
        }));
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
        beforeEach(function() {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
        });
        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    },

    allScriptsTimeout: 120000,
    getPageTimeout: 120000,

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 120000
    }

};
