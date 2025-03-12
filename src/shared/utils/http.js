const urlBase = "http://localhost:8080/";
export const http = {
  get: (url, config) => {
    return fetch(urlBase + url);
  },
};
