'use strict';

/**
 * Protractor tests configuration
 * ==============================
 *
 * This file is used to configure the browser used for teting.
 * Tests can also be cherry picked by commenting them out to dissable.
 * For multiple-browser testing uncomment browsers inside `multiCapabilities`
 *
 */

//----------------------
// Variable settings
const browser_width = 1440;
const browser_height = 800;

let selenium_url = 'http://localhost:4444/wd/hub';
let timeout = 30000;
let multi_cabapilities = [{
    'browserName' : 'chrome',
    'chromeOptions': {
        args: [
            '--no-sandbox',
            '--test-type=browser',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0',
            '--v8-cache-options=off'
        ],
        prefs: {
            'download': {
                'prompt_for_download': false,
                'default_directory': '../downloads/'
            },
            'credentials_enable_service': false,
            'profile': {
                'password_manager_enabled': false
            }
        }
    }
}];


//----------------------
// Default settings
let settings = {
    framework: 'jasmine',
    seleniumAddress: selenium_url,
    specs: ['specs/*.spec.js'],
    multiCapabilities: multi_cabapilities,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: timeout
    },
    allScriptsTimeout: timeout,
    // Results output file
    resultJsonOutputFile:'./result.json',
    onPrepare: function() {
    },
};

exports.config = settings;
