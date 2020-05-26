import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album methods', () => {
  let stubbedFetch;
  let spotify;

  beforeEach(() => {
    stubbedFetch = sinon.stub(global, 'fetch');
    stubbedFetch.resolves({ json: () => ({ album: 'name' }) });

    spotify = new SpotifyWrapper({ token: 'foo' });
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('Smoke test', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });
  });

  describe('getAlbum method', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbum();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should called fetch with correct URL', () => {
      spotify.album.getAlbum('41MnTivkwTO3UUJ8DrqEJJ');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJJ');

      spotify.album.getAlbum('41MnTivkwTO3UUJ8DrqEJX');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJX');
    });

    it('should return expected data from promise', () => {
      const album = spotify.album.getAlbum('41MnTivkwTO3UUJ8DrqEJJ');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbums method', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbums();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should called fetch with correct URL', () => {
      spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '41MnTivkwTO3UUJ8DrqEJX']);
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,41MnTivkwTO3UUJ8DrqEJX');
    });

    it('should return correct data from promise', () => {
      const albums = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '41MnTivkwTO3UUJ8DrqEJX']);
      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      })
    });
  });

  describe('getAlbumTracks method', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbumTracks();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should called fetch with correct URL', () => {
      spotify.album.getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJJ/tracks');
    });

    it('should return correct data from promise', () => {
      const tracks = spotify.album.getAlbumTracks('41MnTivkwTO3UUJ8DrqEJX');
      tracks.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      })
    });
  });
});
