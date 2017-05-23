'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('ExportConfiguration', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.bulk_exports.exportConfiguration('resourceType').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        resourceType: 'resourceType'
      };
      var url = _.template('https://preview.twilio.com/BulkExports/Exports/<%= resourceType %>/Configuration')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'url': 'https://preview.twilio.com/BulkExports/Exports/Calls/Configuration',
          'enabled': true,
          'webhook_url': '',
          'webhook_method': '',
          'resource_type': 'Calls',
          'email': ''
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.bulk_exports.exportConfiguration('resourceType').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid update request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.bulk_exports.exportConfiguration('resourceType').update();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        resourceType: 'resourceType'
      };
      var url = _.template('https://preview.twilio.com/BulkExports/Exports/<%= resourceType %>/Configuration')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid update response',
    function() {
      var body = JSON.stringify({
          'url': 'https://preview.twilio.com/BulkExports/Exports/Calls/Configuration',
          'enabled': true,
          'email': 'bogus@twilio.com',
          'webhook_url': '',
          'resource_type': 'Calls',
          'webhook_method': ''
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.bulk_exports.exportConfiguration('resourceType').update();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

