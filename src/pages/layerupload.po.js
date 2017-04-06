/**
 * Login Wizard Page Object
 * =========================
 */

'use strict';

let EC = protractor.ExpectedConditions;
let path = require('path');

require('../tools/waitReady.js');

let LayerUpload = function() {
    this.loginIcon = element(by.linkText('Log In'));
    this.loginModal = element(by.css('.modal-content'));
    this.navigationTabs = element(by.css('.nav.nav-tabs'));
    this.adminLink = element(by.css('.nav-avatar'));
    this.logoutLink =  element(by.linkText('Log out'));
    this.login_close_button = element(by.css('.close.pull-right'));
    this.loginForm = element(by.css('form.form[action="/account/login/?next=/"]'));
    this.userAvatar = element(by.css('.nav-avatar'));
    this.usernameInput = this.loginForm.element(by.css('input.form-control[name="username"]'));
    this.passwordInput = this.loginForm.element(by.css('input.form-control[name="password"]'));
    this.loginButton = this.loginForm.element(by.partialButtonText('Sign in'));
    this.navBar = element(by.css('.navigation'));
    this.menuCreate = element(by.linkText('Create'));
    this.menu_explore = element(by.linkText('Explore'));
    this.step1 = element(by.css('[title="Check Your Data"]'));
    this.step2 = element(by.css('.row.step.ng-isolate-scope.current'));
    this.step3 = element(by.css('.row.step.ng-isolate-scope.current[title="Title"]'));
    this.step4 = element(by.xpath('/html/body/div[6]/div/div/div[2]/div/div/div/section[8]'));
    this.step5 = element(by.css('section[title="Editing"]'));
    this.step6 = element(by.css('section[title="Import"]'));
    this.importLayerLink = element(by.linkText('Import StoryLayer'));
    this.createLayerLink = element(by.linkText('Create StoryLayer'));
    this.uploadIconsLink = element(by.linkText('Upload Icons'));
    this.composeStoryLink = element(by.linkText('Compose Story'));

    this.makeid = function(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // Sets the default
        if (length < 1 ){ length = 7; }

        // Builds the string
        for( let i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    this.isLoggedIn = function() {
        return this.userAvatar.isPresent();
    };

    this.getUploadWizard = function() {
        this.isLoggedIn().then((loggedIn) => {
            expect(loggedIn).toBe(true);
        });


        this.menuCreate = element(by.linkText('Create'));
        expect(this.menuCreate.waitReady()).toBeTruthy();

        this.menuCreate.click();

        // Click the create story layer link
        expect(this.importLayerLink.waitReady()).toBeTruthy();
        this.importLayerLink.click();


    };

    /**
     * Completes Upload Layer - Step 1
     */
    this.uploadLayer_Step1 = function() {
        this.getUploadWizard();
        expect(this.step1.waitReady()).toBeTruthy();

        let title = this.step1.element(by.css('.step-title'));
        title.getText().then(function(text) {
            expect(text).toEqual('Before we begin');
        });

        let button = this.step1.element(by.buttonText('Let\'s Begin!'));
        expect(button.isDisplayed()).toBeTruthy();
        button.click();

        return true;
    };


    /**
     * Completes Upload Layer - Step 2
     */
    this.uploadLayer_Step2 = function(filename) {
        let selectFileButton = element(by.css('[for="my-file-selector"]'));
        expect(selectFileButton.waitReady()).toBeTruthy();

        // Firefox needs the element to be visible for interaction with the element to work
        browser.executeAsyncScript(function(callback) {
            document.querySelectorAll('#my-file-selector')[0].style.display = 'inline';
            callback();
        });

        // Now you can upload.
        const testLayerFile = path.resolve(__dirname, filename);
        element(by.css('#my-file-selector')).sendKeys(testLayerFile);

        let status = element(by.css('[ng-show="layer.state"]'));
        expect(status.waitReady()).toBeTruthy();

        status.getText().then(function(text){
            expect(text).toEqual('Status: UPLOADED');
        });

        let nextButton = this.step2.element(by.css('[value="Next Step"]'));
        expect(nextButton.waitReady()).toBeTruthy();
        nextButton.click();

        browser.sleep(2000);

        return true;
    };


    /**
     * Completes Upload Layer - Step 3
     */
    this.uploadLayer_Step3 = function() {
        let nextButton3 = this.step3.element(by.css('[value="Next Step"]'));
        expect(nextButton3.waitReady()).toBeTruthy();
        nextButton3.click();

        return true;
    };


    /**
     * Completes Upload Layer - Step 4
     */
    this.uploadLayer_Step4 = function(time_start) {
        let step = element(by.xpath('/html/body/div[6]/div/div/div[2]/div/div/div/section[8]'));

        let startTimeDropdown = step.element(by.id('start_date'));
        expect(startTimeDropdown.waitReady()).toBeTruthy();

        let cssSelectorString = '[value="' + time_start + '"]';
        startTimeDropdown.$(cssSelectorString).click();
        startTimeDropdown.sendKeys(protractor.Key.ENTER);

        let nextButton4 = this.step4.element(by.css('button[value="Next Step"]'));
        expect(nextButton4.waitReady()).toBeTruthy();
        nextButton4.click();

        return true;
    };


    /**
     * Completes Upload Layer - Step 5
     */
    this.uploadLayer_Step5 = function() {
        // Step 5
        let nextButton5 = this.step5.element(by.css('button[value="Next Step"]'));
        expect(nextButton5.waitReady()).toBeTruthy();
        nextButton5.click();

        return true;
    };


    /**
     * Completes Upload Layer - Step 6
     */
    this.uploadLayer_Step6 = function(wait_time) {
        // Starts the upload
        let importButton = this.step6.element(by.buttonText('Import Layer'));
        expect(importButton.waitReady()).toBeTruthy();
        importButton.click();

        // Wait for the upload to finish
        // browser.sleep(parseInt(wait_time, 10));
        let finishButton = this.step6.element(by.buttonText('View Layer'));
        let myself = this;
        browser.wait(EC.elementToBeClickable(finishButton), wait_time).then(function(){
            // Done
            expect(finishButton.waitReady()).toBeTruthy();

            // Success message
            let stepTitle = myself.step6.$$('.step-title').first();
            stepTitle.getText(function(text){
                expect(text).toEqual('Congratulations! Click below to view your new Layer.');
            });

            // Close the wizard
            finishButton.click();
        });
    };


    this.uploadLayer = function (filename, time_start, upload_time, is_published) {
        browser.sleep(500);
        console.log('\nUpload Layer Step 1...');
        let step1 = this.uploadLayer_Step1();

        browser.sleep(500);
        console.log('\nUpload Layer Step 2...');
        let step2 = this.uploadLayer_Step2(filename);

        browser.sleep(500);
        console.log('\nUpload Layer Step 3...');
        let step3 = this.uploadLayer_Step3();

        browser.sleep(500);
        console.log('\nUpload Layer Step 4...');
        let step4 = this.uploadLayer_Step4(time_start);

        browser.sleep(500);
        console.log('\nUpload Layer Step 5...');
        let step5 = this.uploadLayer_Step5();

        browser.sleep(500);
        console.log('\nUpload Layer Step 6...');
        let step6 = this.uploadLayer_Step6(upload_time);

        browser.sleep(2000);

        if(is_published) {
            let is_published_checkbox = element(by.css('#id_is_published'));
            expect(is_published_checkbox.waitReady()).toBeTruthy();

            is_published_checkbox.click();

            let saveButton = element(by.partialButtonText('Save'));
            saveButton.click();

        }
    };


};

module.exports = new LayerUpload();


