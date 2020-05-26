/* to run: babel-node albums.js */
import SpotifyWrapper from "../src/index";

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({ token: 'need token here' });

const albums = spotify.search.albums('The Cranberries');

albums.then((data) => data.albums.items.map((item) => console.log(item.name)));
