/**
 * Login Wizard Page Object
 * =========================
 */

'use strict';

let yaml = require('js-yaml');
let fs   = require('fs');

const defaultTestUser = 'Moofasa';
const defaultLastName = 'Test';
const defaultEmail = 'testing@testmail.com';
const defaullTestPassword = 'testPassword2001!';

let EC = protractor.ExpectedConditions;

require('../tools/waitReady.js');

// const targetURL = 'http://demo.mapstory.org';
const targetURL = 'http://192.168.56.151';

let AuthWizard = function() {
    this.loginIcon = element(by.linkText('Log In'));
    this.loginModal = element(by.css('.modal-content'));
    this.navigationTabs = element(by.css('.nav.nav-tabs'));
    this.adminLink = element(by.linkText('admin'));
    this.logoutLink =  element(by.linkText('Log out'));
    this.login_close_button = element(by.css('.close.pull-right'));
    this.loginForm = element(by.css('form[action="/account/login/?next=/"]'));
    this.userAvatar = element(by.css('.nav-avatar'));
    this.usernameInput = this.loginForm.element(by.css('input.form-control[name="username"]'));
    this.passwordInput = this.loginForm.element(by.css('input.form-control[name="password"]'));
    this.loginButton = this.loginForm.element(by.partialButtonText('Sign in'));
    this.signUpButton = element(by.buttonText('Join MapStory'));

    // Getters
    this.getUsername = function() { return defaultTestUser; };
    this.getPassword = function() { return defaullTestPassword; };
    this.getEmail = function() { return defaultEmail; };
    this.getLastName = function() { return defaultLastName; };


    /**
     * Gets the Auth Wizard
     */
    this.get = function() {
        // Refresh page
        browser.get(targetURL);
        browser.waitForAngular();

        let myself = this;

        // Logout if we are already authorized
        this.isLoggedIn().then(function(isAuth){
            if(isAuth === true) {
                myself.logout();
            }
            expect(myself.loginIcon.waitReady()).toBeTruthy();
            myself.loginIcon.click();
        });
    };


    /**
     * Creates a random string of the length given.
     *
     * Defaults to length 5
     *
     * @param  {uint} length The length of the string to be generated
     * @return {string} A random alpha-numeric string of the length
     */
    this.makeid = function(length)
    {
        let text = '';
        const possible_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // Default to 5
        if (length < 1 ){
            length = 5;
        }

        // Builds a random string from the possible_characters
        for( let i=0; i < length; i++ )
            text += possible_characters.charAt(Math.floor(Math.random() * possible_characters.length));

        return text;
    };


    /**
     * Logs in with user and password
     * @param username The user's name
     * @param password The password as a string (not the hash)
     */
    this.login = function(username, password) {
        // Click the login Icon
        expect(this.loginIcon.waitReady()).toBeTruthy();
        this.loginIcon.click();

        expect(this.loginForm.isPresent()).toBe(true);
        browser.wait(EC.visibilityOf(this.loginForm), 5000);
        expect(this.loginForm.isDisplayed()).toBeTruthy();


        // Input username
        expect(this.usernameInput.isPresent()).toBe(true);
        this.usernameInput.sendKeys(username);

        // Input password
        expect(this.passwordInput.isPresent()).toBe(true);
        this.passwordInput.sendKeys(password);

        // Press the login button
        expect(this.loginButton.isPresent()).toBe(true);
        this.loginButton.click();

    };


    /**
     * Indicates if a user is logged in
     *
     * Note
     * ----
     * THIS RETURNS A PROMISE!
     *
     * Consider how protactor's `isDisplayed()` returns a promise.
     * This means we must handle the promise like this:
     *
     * ```javascript
     * page.isLoggedIn().then(function(userLoggedIn){
	 * 	if(userLoggedIn == true) {
	 * 		// Can asume he is logged in
	 * 	}
	 * });
     * ```
     * @return {Promise} A promise that indicates ifLoggedIn
     */
    this.isLoggedIn = function() {
        return this.userAvatar.isPresent();
    };


    /**
     * Logs out. Assumes this is called from the Home Page.
     */
    this.logout = function() {
        let myself = this;
        this.isLoggedIn().then(function(loggedIn){
            if(loggedIn === true) {
                // Click the login button
                let userLink = element(by.css('#id_userlink'));
                userLink.click();
                expect(myself.logoutLink.waitReady()).toBeTruthy();

                // Click the logout link
                myself.logoutLink.click();

                // Refresh page
                browser.get(targetURL);
            }
        });
    };

    this.showSignUpForm = function () {
        this.logout();

        browser.driver.manage().window().setSize(1440, 800);
        browser.driver.manage().window().setPosition(0, 0);
        browser.get(targetURL);
        browser.waitForAngular();

        expect(this.loginIcon.waitReady()).toBeTruthy();
        this.loginIcon.click();

        expect(this.loginForm.waitReady()).toBeTruthy();

        // Click signup
        let button = element(by.linkText('Sign Up'));
        expect(button.waitReady()).toBeTruthy();
        button.click();
    };


    /**
     * Signs up a new user
     *
     * If no data is provided, random is used.
     * @param  {Object} userData {name, email, password}
     */
    this.createUser = function(userData) {

        if(userData.username === null) {
            userData.username = 'tester_' + this.makeid(7);
        }

        if(userData.name === null) {
            userData.name = defaultTestUser + '_' + this.makeid(7);
        }

        if(userData.lastName === null) {
            userData.lastName = 'Testerson';
        }

        if(userData.password === null) {
            userData.password = defaullTestPassword;
        }

        if(userData.email === null) {
            userData.email = userData.username + '@testing.com';
        }

        let usernameInput = element(by.css('#id_username'));
        let nameInput = element(by.css('#id_first_name'));
        let lastNameInput = element(by.css('#id_last_name'));
        let emailInput = element(by.css('#id_email'));
        let passwordInput = element(by.css('#id_password'));
        let confirmPasswordInput = element(by.css('#password_confirm'));

        this.showSignUpForm();

        expect(usernameInput.waitReady()).toBeTruthy();

        usernameInput.sendKeys(userData.username);

        // Set First Name
        nameInput.sendKeys(userData.name);

        // Set Last name
        lastNameInput.sendKeys(userData.lastName);

        // Set email
        emailInput.sendKeys(userData.email);

        // Set password
        passwordInput.sendKeys(userData.password);

        // Confirm password
        confirmPasswordInput.sendKeys(userData.password);

        // Accept terms
        let termsCheckbox = element(by.model('agreed'));
        termsCheckbox.click();

        // Click Join
        this.signUpButton.click();
    };

    this.createUsersFromList = function (list_of_users) {
        let myself = this;
        list_of_users.forEach( (userData) => {
            myself.createUser(userData);
        });
    };

    this.login = function(username, password) {
        // Click the login Icon
        expect(this.loginIcon.waitReady()).toBeTruthy();
        this.loginIcon.click();

        expect(this.loginForm.isPresent()).toBe(true);
        browser.wait(EC.visibilityOf(this.loginForm), 5000);
        expect(this.loginForm.isDisplayed()).toBeTruthy();


        // Input username
        expect(this.usernameInput.isPresent()).toBe(true);
        this.usernameInput.sendKeys(username);

        // Input password
        expect(this.passwordInput.isPresent()).toBe(true);
        this.passwordInput.sendKeys(password);

        // Press the login button
        expect(this.loginButton.isPresent()).toBe(true);
        this.loginButton.click();

    };
};

module.exports = new AuthWizard();

