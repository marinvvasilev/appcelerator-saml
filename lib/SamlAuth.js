var default_1 = require('./conf/default');
var SamlAuth = (function () {
    function SamlAuth() {
        this.default_conf = new default_1.DefaultConf();
        console.log(this.default_conf.logs);
    }
    return SamlAuth;
})();
exports.SamlAuth = SamlAuth;
//# sourceMappingURL=SamlAuth.js.map