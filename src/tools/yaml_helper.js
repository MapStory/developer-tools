/**
 * YAML File Helper
 */
/**
 * Login Wizard Page Object
 * =========================
 */
'use strict';

let yaml = require('js-yaml');
let fs   = require('fs');

require('../tools/waitReady.js');

let YAML_helper = function() {
    this.loadYAML = function(filename) {
        // Get document, or throw exception on error
        try {
            return yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
        } catch (e) {
            console.log(e);
        }
    };

};

module.exports = new YAML_helper();

