"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* global fetch */
var getAlbum = function getAlbum(id) {
  return fetch("".concat(_config["default"], "/albums/").concat(id)).then(function (data) {
    return data.json();
  });
};

exports.getAlbum = getAlbum;

var getAlbums = function getAlbums(ids) {
  return fetch("".concat(_config["default"], "/albums/?ids=").concat(ids)).then(function (data) {
    return data.json();
  });
};

exports.getAlbums = getAlbums;

var getAlbumTracks = function getAlbumTracks(id) {
  return fetch("".concat(_config["default"], "/albums/").concat(id, "/tracks")).then(function (data) {
    return data.json();
  });
};

exports.getAlbumTracks = getAlbumTracks;