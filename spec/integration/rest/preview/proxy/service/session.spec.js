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

describe('Session', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/Sessions/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'service_sid': 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'status': 'in-progess',
          'unique_name': 'unique_name',
          'start_time': '2015-07-30T20:00:00Z',
          'links': {
              'interactions': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions',
              'participants': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants'
          },
          'ttl': 100,
          'date_updated': '2015-07-30T20:00:00Z',
          'date_created': '2015-07-30T20:00:00Z',
          'end_time': '2015-07-30T20:00:00Z',
          'url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
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
                                        .sessions.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/Sessions')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function() {
      var body = JSON.stringify({
          'sessions': [],
          'meta': {
              'previous_page_url': null,
              'next_page_url': null,
              'url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions?PageSize=50&Page=0',
              'page': 0,
              'first_page_url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions?PageSize=50&Page=0',
              'page_size': 50,
              'key': 'sessions'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .sessions.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid create request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .sessions.create();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/Sessions')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid create response',
    function() {
      var body = JSON.stringify({
          'service_sid': 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'status': 'in-progess',
          'unique_name': 'unique_name',
          'start_time': '2015-07-30T20:00:00Z',
          'links': {
              'interactions': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions',
              'participants': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants'
          },
          'ttl': 100,
          'date_updated': '2015-07-30T20:00:00Z',
          'date_created': '2015-07-30T20:00:00Z',
          'end_time': '2015-07-30T20:00:00Z',
          'url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(201, body));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .sessions.create();
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
                                        .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/Sessions/<%= sid %>')(solution);

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
                                        .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function(response) {
        expect(response).toBe(true);
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid update request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/Proxy/Services/<%= serviceSid %>/Sessions/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid update response',
    function() {
      var body = JSON.stringify({
          'service_sid': 'KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'status': 'in-progess',
          'unique_name': 'unique_name',
          'start_time': '2015-07-30T20:00:00Z',
          'links': {
              'interactions': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions',
              'participants': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants'
          },
          'ttl': 100,
          'date_updated': '2015-07-30T20:00:00Z',
          'date_created': '2015-07-30T20:00:00Z',
          'end_time': '2015-07-30T20:00:00Z',
          'url': 'https://preview.twilio.com/Proxy/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.proxy.services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

