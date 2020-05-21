import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Search methods', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({json: () => ({})})
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic search', () => {
    it('should call fetch function', () => {
      search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        search('Roxette', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Roxette&type=album');
      });

      context('passing more than one type', () => {
        search('Roxette', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Roxette&type=artist,album');
      });
    });

    it('should return JSON data from the promise', () => {
      const artists = search('Roxette', 'artist');

      artists.then((data) => {
        expect(data).to.be.eql({});
      });
    });
  });

  describe('Albums search', () => {
    it('should call fetch function', () => {
      searchAlbums('Home');

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should fetch by album', () => {
      searchAlbums('Home');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Home&type=album');
    });
  });

  describe('Artists search', () => {
    it('should call fetch function', () => {
      searchArtists('Roxette');

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should fetch by artist', () => {
      searchArtists('Roxette');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Roxette&type=artist');
    });
  });

  describe('Tracks search', () => {
    it('should call fetch function', () => {
      searchTracks('Joyride');

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should fetch by track', () => {
      searchTracks('Joyride');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Joyride&type=track');
    });
  });

  describe('Playlists search', () => {
    it('should call fetch function', () => {
      searchPlaylists('Quarentena');

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should fetch by playlist', () => {
      searchPlaylists('Quarentena');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Quarentena&type=playlist');
    });
  });
});
