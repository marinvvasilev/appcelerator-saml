console.log('Intercepted')
function SamlAuth(server) {
    this.server = server;
    this.config = server.config || {secret: null};
}
    
/**
 * called by the server before calling validateRequest to determine if you want
 * to require authentication for this url
 */
SamlAuth.prototype.matchURL = function (request) {
	return true;request.url.indexOf('/api/v1/user') !== 0;
};

/**
 * called by the server to request validation of the incoming request. return true if
 * a valid request, return false (or undefined) to deny the request
 */
SamlAuth.prototype.validateRequest = function(request, response) {
    if (request.headers['x-secret'] && request.headers['x-secret'] === this.config.secret) {
        return true;
    } else {
        return false;
    }
};

module.exports = SamlAuth;
//# sourceMappingURL=SamlAuth.js.map