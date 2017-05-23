'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('Day', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.bulk_exports.exports('resourceType')
                                               .days.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        resourceType: 'resourceType'
      };
      var url = _.template('https://preview.twilio.com/BulkExports/Exports/<%= resourceType %>/Days')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read response',
    function() {
      var body = JSON.stringify({
          'days': [
              {
                  'day': '2017-05-01',
                  'size': 1234,
                  'resource_type': 'Calls'
              }
          ],
          'meta': {
              'key': 'days',
              'page_size': 50,
              'url': 'https://preview.twilio.com/BulkExports/Exports/Calls/Days?PageSize=50&Page=0',
              'page': 0,
              'first_page_url': 'https://preview.twilio.com/BulkExports/Exports/Calls/Days?PageSize=50&Page=0',
              'previous_page_url': null,
              'next_page_url': null
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.bulk_exports.exports('resourceType')
                                               .days.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

