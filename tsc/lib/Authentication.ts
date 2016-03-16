var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
var Cookies = require("cookies");
var fs = require('fs');

//Lib imports
import {ConfigurationObject} from './model/Configuration';

export class Authentication {

    //The Arrow instance
    public server;
    //Configuration Object
    public config: ConfigurationObject;
    private _request: Object;
    private _response: Object;
    private _passport;

    constructor(server, config) {
        this.server = server;
        this.setConfig(config);
        this._passport = passport;
        //If server object is passed
        this._initializePassport(this._passport);
        if (this.server && this.server.app) {
            this.initPassport();
        }

    }

    /**
     * Return passport
     */
    public get passport(): Object {
        return this._passport;
    }

    public initPassport() {
        this.server.app.use(this._passport.initialize());
        this.server.app.use(this._passport.session());
    }

    /**
     * Sets the configuration object
     * If configuration data is not passed, sets this.config to a new ConfigurationObject
     */
    public setConfig(config: ConfigurationObject) {
        if (config) {
            this.config = config;
        } else {
            this.config = new ConfigurationObject();
        }
    }

    /**
     * Initialize passport
     */
    private _initializePassport(passp) {

        passp.serializeUser(function(user, done) {
            done(null, user);
        });

        passp.deserializeUser(function(user, done) {
            done(null, user);
        });

        //Check if private key should be used
        if (this.config.passport.saml.privateCert && this.config.passport.saml.cert) {
            if (!fs.readFileSync(this.config.privateCertLocation, 'utf-8')) {
                throw "Specified certificate file was not found";
            }
            this.config.passport.saml.privateCert = fs.readFileSync(this.config.privateCertLocation, 'utf-8');
            this.config.passport.saml.cert = fs.readFileSync(this.config.certLocation, 'utf-8');
        }
        var configuration = this.config;

        let samlStartegy = new SamlStrategy(
            this.config.passport.saml,
            function(profile, done) {

                var resultConfig = new ConfigurationObject()
                var resultObject = resultConfig.createResultObject(profile, configuration);
                return done(null, resultObject);
            });

        if (this.config.passport.saml.privateCert) {
            samlStartegy.generateServiceProviderMetadata(this.config.passport.saml.privateCert);
        }
        passp.use(samlStartegy);
    }


}