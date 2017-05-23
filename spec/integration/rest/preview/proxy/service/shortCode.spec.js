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

describe('ShortCode', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid create request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var opts = {
        sid: 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .shortCodes.create(opts);
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/ShortCodes')(solution);

      var values = {
        Sid: 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid create response',
    function() {
      var body = JSON.stringify({
          'sid': 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z',
          'short_code': '12345',
          'country_code': 'US',
          'capabilities': [],
          'url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(201, body));

      var opts = {
        sid: 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .shortCodes.create(opts);
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid remove request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .shortCodes('SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/ShortCodes/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function() {
      var body = JSON.stringify(null);

      holodeck.mock(new Response(204, body));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .shortCodes('SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function(response) {
        expect(response).toBe(true);
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .shortCodes.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/ShortCodes')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_full response',
    function() {
      var body = JSON.stringify({
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes?PageSize=50&Page=0',
              'previous_page_url': null,
              'next_page_url': null,
              'key': 'short_codes',
              'url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes?PageSize=50&Page=0'
          },
          'short_codes': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'service_sid': 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'sid': 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'short_code': '12345',
                  'country_code': 'US',
                  'capabilities': [],
                  'url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .shortCodes.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .shortCodes('SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/ShortCodes/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'sid': 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z',
          'short_code': '12345',
          'country_code': 'US',
          'capabilities': [],
          'url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .shortCodes('SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

