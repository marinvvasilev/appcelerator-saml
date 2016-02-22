var assert = require('assert');
var expect = require('expect');
var Arrow = require('arrow');
var SamlAuth = require('../');

describe('Array', function () {

    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });
        describe('Should be true and', function () {
            
            it('true is true', function () {
                expect(true).toBe(true);
            })
            it('an instance of SamlAuth', function() {
                var saml = new SamlAuth();
                expect(saml).to.be.ok()
            })
            
        });
    });

});
