import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Search methods', () => {
  let stubbedFetch;
  let spotify;

  beforeEach(() => {
    stubbedFetch = sinon.stub(global, 'fetch');
    stubbedFetch.resolves({json: () => ({})});

    spotify = new SpotifyWrapper({ token: 'foo' });
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('Smoke tests', () => {
    it('should exist the searchAlbums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('Albums search', () => {
    it('should call fetch function', () => {
      spotify.search.albums('Roxette');

      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should fetch by album', () => {
      spotify.search.albums('Roxette');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Roxette&type=album');
    });
  });

  describe('Artists search', () => {
    it('should call fetch function', () => {
      spotify.search.artists('Roxette');

      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should fetch by artist', () => {
      spotify.search.artists('Roxette');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Roxette&type=artist');
    });
  });

  describe('Tracks search', () => {
    it('should call fetch function', () => {
      spotify.search.tracks('Roxette');

      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should fetch by track', () => {
      spotify.search.tracks('Roxette');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Roxette&type=track');
    });
  });

  describe('Playlists search', () => {
    it('should call fetch function', () => {
      spotify.search.playlists('Roxette');

      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should fetch by playlist', () => {
      spotify.search.playlists('Roxette');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Roxette&type=playlist');
    });
  });
});
