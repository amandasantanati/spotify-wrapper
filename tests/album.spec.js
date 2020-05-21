import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album methods', () => {
  let stubbedFetch;

  beforeEach(() => {
    stubbedFetch = sinon.stub(global, 'fetch');
    stubbedFetch.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('Smoke test', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });
  });

  describe('getAlbum method', () => {
    it('should call fetch method', () => {
      getAlbum();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should called fetch with correct URL', () => {
      getAlbum('41MnTivkwTO3UUJ8DrqEJJ');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJJ');

      getAlbum('41MnTivkwTO3UUJ8DrqEJX');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJX');
    });

    it('should return expected data from promise', () => {
      const album = getAlbum('41MnTivkwTO3UUJ8DrqEJJ');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
