export default function search() {
  return {
    albums: (query) => this.request(`${this.apiURL}/search?q=${query}&type=album`),
    artists: (query) => this.request(`${this.apiURL}/search?q=${query}&type=artist`),
    tracks: (query) => this.request(`${this.apiURL}/search?q=${query}&type=track`),
    playlists: (query) => this.request(`${this.apiURL}/search?q=${query}&type=playlist`),
  };
}
