/**
 * NOTE: This file is simply for testing this connector and will not
 * be used or packaged with the actual connector when published.
 */
var Arrow = require('arrow'),
    server = new Arrow();
server.port = 8086;

server.on('starting', function() {
    server.config.APIKeyAuthType = 'plugin';
    server.config.APIKeyAuthPlugin = 'appcelerator-saml';
    server.config.apiPrefix = '/api';
    server.config.SamlAuth = {
        loginUrl: '/saml/login',
        callbackUrl: '/saml/response/callback',
        privateCertLocation: './pk/login.axway.com.pem',
        certLocation: './pk/login.axway.com.crt',
        allowedPaths: ['/saml/response/callback', '/saml/login', '/successed'],
        resultObject: {
            firstName: 'firstname',
            lastName: 'lastname',
            email: 'email',
            username: 'username',
            language: 'preferredLanguage'
        },
        passport: {
            strategy: 'saml',
            saml: {
                callbackUrl: 'https://localhost:8080/response/callback',
                entryPoint: 'https://login.axway.com/saml2/idp/SSOService.php',
                issuer: 'cloud:passport:saml',
                authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',
                logoutCallbackUrl: 'https://localhost:8080/saml/logout'//,
            }
        }
    };
});

server.start();


