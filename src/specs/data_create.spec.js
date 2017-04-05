'use strict';

/**
 * User auth tests
 * ================
 */


// let EC = protractor.ExpectedConditions;
require('../tools/waitReady.js');
let yaml_helper = require('../tools/yaml_helper');
let fs = require('fs');
let path = require('path');

describe('Create test data', function() {
    let auth = require('../pages/auth.po');

    beforeEach(function(){
        browser.driver.manage().window().setSize(1440, 800);
        browser.driver.manage().window().setPosition(0, 0);
        browser.get('http://192.168.56.151');
        browser.waitForAngular();
    });

    xit('should create an array of users from yaml', () => {
        let data = yaml_helper.loadYAML('src/data/users.yaml');
        auth.createUsersFromList(data.users);
    });

    it('should upload a set of layer files from yaml', (done) => {
        console.log('\n\n *** UPLOADING LAYERS *** \n');

        // Load data from a YAML file and verify required fields
        let layer_config_filename = 'src/data/layer_files.yaml';
        console.log('\nLoading: ' + layer_config_filename);
        let data = yaml_helper.loadYAML(layer_config_filename);



        if(data.layers.username === null) {
            done.fail('username is required');
        }

        if(data.layers.password === null) {
            done.fail('password is required');
        }

        // This is the username and password that will be used to upload the layers
        let username = data.layers.username;
        let password = data.layers.password;

        // Loop the layer list and process each one
        let layer_list = data.layers.files;
        layer_list.forEach( (fileData) => {

            let title = fileData.title;
            let filename = 'src/files/' + fileData.filename;
            let start_time = fileData.start_time;

            // Fail when file doesnt exist or required fields are not present
            if(fs.existsSync(filename) === true) {
                console.log('Verifying: ' + filename);
            } else {
                console.log('File doen\'t exist: ' + filename);
                done.fail('File doen\'t exist: ' + filename);
            }

            if(start_time === null) {
                done.fail('Start time is required for: ' + filename);
            }

            console.log('\nProcessing: ' + filename);
        });

        console.log('\nDone creating layers');
        done();
    });
});

