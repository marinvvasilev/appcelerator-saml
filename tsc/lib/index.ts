/// <reference path="../d.ts/require.d.ts" />

var Cookies = require("cookies")
var fs = require('fs');

//Lib imports
import {Authentication} from './Authentication';
import {ConfigurationObject} from './model/Configuration';
import {Dispatcher} from './Dispatcher';

export class SamlAuth {

    public server;
    public config: ConfigurationObject;
    public auth: Authentication;
    public passport;

    constructor(server) {
        this.server = server;
        let dispatcher: Dispatcher = this.getDispatcher();
        //Set the module configuration
        this.config = dispatcher.getConfig();
        //Get an instance of the Authentication object
        this.auth = dispatcher.getInstanceOf('Authentication');
        this.passport = this.auth.passport;
    }
    
    /**
     * Get an instance of the dispatcher
     */
    public getDispatcher(): Dispatcher {
        let dispatcher: Dispatcher = new Dispatcher(this.server, this.config)
        return dispatcher;
    }

    /**
     * called by the server before calling validateRequest to determine if you want
     * to require authentication for this url
     */
    public matchURL(request) {
        return true;
    }
    
    /**
     * called by the server to request validation of the incoming request. return true if
     * a valid request, return false (or undefined) to deny the request
     */
    public validateRequest(request, response) {
        var cookies = new Cookies(request, response);
        if (!request.isAuthenticated()) {
            //In case user wants to log in
            return this._authenticateRoute(request);
        } else {
            return true;
        }
    }
    
    /**
     * Checks if current route should be authenticated, based on the 
     * the module configuration
     */
    private _authenticateRoute(request) {
        let paths: Array<string>;
        let should_pass: boolean = false;
        
        //If no paths are set, only the login url is added to the exception list
        if (!this.config.allowedPaths) {
            if (!this.config.loginUrl)
                throw new Error("You should pass a loginUrl in the module configuration");
            paths = new Array(this.config.loginUrl);
        } else {
            paths = this.config.allowedPaths;
        }
        //Loop trough all pathe
        for (var i = 0; i < paths.length; i++) {
            //If request path matches one from the configuration
            if (request.url.indexOf(paths[i]) === 0)
                should_pass = true;
        }
        return should_pass;
    }

}