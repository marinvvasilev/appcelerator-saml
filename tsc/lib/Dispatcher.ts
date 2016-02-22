var fs = require('fs');

import {ConfigurationObject} from './model/Configuration';
import {Authentication} from './Authentication';

/**
 * Dispatcher class
 * Constructs selected class and returns its instance 
 */
export class Dispatcher {

    public server;
    public config: ConfigurationObject;
    
    /**
     * Most of the files, that are instantiated by this file
     * require an instance of Arrow server and the configuration
     * file
     */
    constructor(server, config) {
        this.server = server;
        this.config = config;
    }
       
    
    /**
     * Get instance of selected class
     */
    public getInstanceOf(className: string) {
        var classInstance;
        switch (className) {
            case 'Authentication':
                classInstance = new Authentication(this.server, this.config)
                break;

            default:
                classInstance = {};
                break;
        }
        return classInstance;
    }

    /**
     * Returns an instance of ConfigurationObject
     * The method first checks if ./conf/appc.saml.default.js file is present
     * If not searches the ./default.js file for configuration data
     * @throws Error if configuration doesn't exist
     */
    public getConfig() {
        //Check if file exists in config folder
        let config: ConfigurationObject;

        try {
            //check if file exists
            //throws error if file doesn't exist
            fs.accessSync('conf/appc.saml.default.js');
            var realPath = fs.realpathSync('conf/appc.saml.default.js');
            //Set configuration object
            config = require(realPath);
        } catch (error) {
            //Display error
            this.server.logger.debug('Could not load configuration file. Error was : ' + error);
            //Set configuration from default.js
            if (this.server.config && this.server.config.SamlAuth) {
                config = this.server.config.SamlAuth;
            }
        }
        if (!config) {
            throw new Error('Please provide a valid configuration object for the appcelerator-saml module.');

        }
        this.config = config;
        return config;
    }

}
 