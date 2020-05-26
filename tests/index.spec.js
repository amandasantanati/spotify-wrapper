import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('SpotifyWrapper library', () => {
  describe('Constructor method', () => {
    it('should return a instance of spotifyWrapper', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify).to.be.an.instanceof(SpotifyWrapper);
    });

    it('should receive apiURL as an option', () => {
      let spotify = new SpotifyWrapper({ apiURL: 'https://localhost' });
      expect(spotify.apiURL).to.be.equal('https://localhost');
    });

    it('should have an apiURL default', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
    });

    it('should receive token as an option', () => {
      let spotify = new SpotifyWrapper({ token: 'foo'});
      expect(spotify.token).to.be.equal('foo');
    });
  });

  describe('Request method', () => {
    let stubbedFetch;

    beforeEach(() => {
      stubbedFetch = sinon.stub(global, 'fetch');
      stubbedFetch.resolves({ json: () => {} });
    });

    afterEach(() => {
      stubbedFetch.restore();
    });

    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('should call fetch when call request', () => {
      let spotify = new SpotifyWrapper({ token: 'foo' });
      spotify.request('url');

      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call the correct url', () => {
      let spotify = new SpotifyWrapper({ token: 'foo' });
      spotify.request('url');

      expect(stubbedFetch).to.have.been.calledWith('url');
    });

    it('should call the correct url with the correct headears', () => {
      let spotify = new SpotifyWrapper({ token: 'foo' });
      spotify.request('url');

      const headers = {
        headers: {
          Authorization: `'Bearer foo'`,
        },
      };

      expect(stubbedFetch).to.have.been.calledWith('url', headers);
    });
  });
});

