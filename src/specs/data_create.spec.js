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
    let layer_upload = require('../pages/layerupload.po');

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

    it('should authenticate', () => {
        // Load data from a YAML file and verify required fields
        let layer_config_filename = 'src/data/all_layer_files.yaml';
        let data = yaml_helper.loadYAML(layer_config_filename);

        // This is the username and password that will be used to upload the layers
        let username = data.layers.username;
        let password = data.layers.password;

       auth.login(username, password);
       browser.sleep(1000);
    });


    it('should upload a set of layer files from yaml', function(done) {
        console.log('\n\n *** UPLOADING LAYERS *** \n');

        // Load data from a YAML file and verify required fields
        let layer_config_filename = 'src/data/all_layer_files.yaml';
        console.log('\nLoading: ' + layer_config_filename);
        let data = yaml_helper.loadYAML(layer_config_filename);


        if(data.layers.username === null) {
            done.fail('username is required');
        }

        if(data.layers.password === null) {
            done.fail('password is required');
        }

        // Loop the layer list and process each one
        let layer_list = data.layers.files;

        for(let i = 0; i < layer_list.length; i++) {
            let fileData = layer_list[i];

            let title = fileData.title;
            let filename = 'src/files/' + fileData.filename;
            let start_time = fileData.start_time;
            let upload_time = fileData.upload_time;
            let is_published = fileData.published;

            // Fail when file doesnt exist or required fields are not present
            if(fs.existsSync(filename) === true) {
                console.log('Verifying: ' + title);
            } else {
                console.log('File doesn\'t exist: ' + filename);
                done.fail('File doesn\'t exist: ' + filename);
            }
            if(start_time === null) {
                done.fail('Start time is required for: ' + title);
            }
            if(upload_time === null) {
                done.fail('Upload time is required for: ' + title);
            }

            console.log('\nProcessing: ' + title);

            browser.sleep(2000);
            let fileLocation = '../files/' + fileData.filename;

            browser.driver.manage().window().setSize(1440, 800);
            browser.driver.manage().window().setPosition(0, 0);
            browser.get('http://192.168.56.151');
            browser.waitForAngular();

            layer_upload.uploadLayer(fileLocation, start_time, upload_time, is_published);
        }
        console.log('\nDone creating layers');
        done();


    }, 9990000);
});

