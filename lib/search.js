"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchArtists = exports.searchAlbums = exports.search = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* global fetch */
var search = function search(query, type) {
  return fetch("".concat(_config["default"], "/search?q=").concat(query, "&type=").concat(type)).then(function (data) {
    return data.json();
  });
};

exports.search = search;

var searchAlbums = function searchAlbums(query) {
  return search(query, 'album');
};

exports.searchAlbums = searchAlbums;

var searchArtists = function searchArtists(query) {
  return search(query, 'artist');
};

exports.searchArtists = searchArtists;

var searchTracks = function searchTracks(query) {
  return search(query, 'track');
};

exports.searchTracks = searchTracks;

var searchPlaylists = function searchPlaylists(query) {
  return search(query, 'playlist');
};

exports.searchPlaylists = searchPlaylists;