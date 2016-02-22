var ConfigurationObject = (function () {
    function ConfigurationObject() {
    }
    ConfigurationObject.prototype.createResultObject = function (profile, configuration) {
        var result = new Object;
        var resultObject;
        if (configuration) {
            resultObject = configuration.resultObject;
        }
        else {
            resultObject = this.resultObject;
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
        return result;
    };
    ConfigurationObject.prototype._checkResultObject = function () {
        return this.resultObject;
    };
    return ConfigurationObject;
})();
exports.ConfigurationObject = ConfigurationObject;
//# sourceMappingURL=Configuration.js.map