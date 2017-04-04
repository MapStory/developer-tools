'use strict';

/**
 * User auth tests
 * ================
 */


// let EC = protractor.ExpectedConditions;
require('../tools/waitReady.js');

describe('User auth', function() {
    let auth = require('../pages/auth.po');
    beforeEach(function(){
        browser.driver.manage().window().setSize(1440, 800);
        browser.driver.manage().window().setPosition(0, 0);
        browser.get('http://192.168.56.151');
        browser.waitForAngular();
    });
    it('should create an array of users', () => {
        let data = auth.loadYAML('src/data/users.yaml');
        auth.createUsersFromList(data.users);
    });
});

