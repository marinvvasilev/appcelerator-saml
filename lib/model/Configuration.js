"use strict";
var ConfigurationObject = (function () {
    function ConfigurationObject() {
    }
    ConfigurationObject.prototype.createResultObject = function (profile, configuration) {
        var result = {};
        var resultObject;
        if (configuration && configuration.resultObject) {
            resultObject = configuration.resultObject;
        }
        else {
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
        }
        else {
            result = {
                id: profile.uid,
                email: profile.email,
                displayName: profile.cn,
                firstName: profile.givenName,
                lastName: profile.sn
            };
        }
        result.saml = {
            nameID: profile.nameID,
            nameIDFormat: profile.nameIDFormat
        };
        return result;
    };
    ConfigurationObject.prototype._checkResultObject = function () {
        return this.resultObject;
    };
    return ConfigurationObject;
}());
exports.ConfigurationObject = ConfigurationObject;
//# sourceMappingURL=Configuration.js.map