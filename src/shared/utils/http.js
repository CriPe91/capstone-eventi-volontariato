const urlBase = "http://localhost:8080/";
export const http = {
  getAuth: (url, config) => {
    return fetch(urlBase + url, config).then((res) => res.json());
  },
  post: (url, data, config) => {
    console.log({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return fetch(urlBase + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  get: (url, config) => {
    return fetch(urlBase + url);
  },
};
