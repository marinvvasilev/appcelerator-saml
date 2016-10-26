import { PassportConfigurationObject } from './PassportConfiguration';


export class ConfigurationObject {
    //Login Url
    public loginUrl: string;
    //Allowed Paths
    public allowedPaths: Array<string>;
    //Location of the .pem file
    privateCertLocation: string;
    //Location of the .cert file
    certLocation: string;
    //Expected Result
    resultObject: Object;
    //Passport configuration
    public passport: PassportConfigurationObject;

    /**
     * Returns an object, that has the structure of resultObject and the 
     * data supplied with profile.
     * You can optionaly pass a configuration object
     * 
     */
    public createResultObject(profile, configuration?: ConfigurationObject) {
        let result: Object = {};
        let resultObject: Object;

        if (configuration && configuration.resultObject) {
            resultObject = configuration.resultObject;
        } else {
            resultObject = this.resultObject = {
                id: 'uid',
                email: 'email',
                firstName: 'firstName',
                lastName: 'lastname'
            };
        }

        if (this._checkResultObject) {
            for (var key in resultObject) {
                if (resultObject.hasOwnProperty(key))
                    result[key] = profile[resultObject[key]];
            }
        } else {
            result = {
                id: profile.uid,
                email: profile.email,
                displayName: profile.cn,
                firstName: profile.givenName,
                lastName: profile.sn
            };
        }
        result['saml'] = {
            nameID: profile.nameID,
            nameIDFormat: profile.nameIDFormat
        };
        return result;
    }

    private _checkResultObject() {
        return this.resultObject;
    }

}