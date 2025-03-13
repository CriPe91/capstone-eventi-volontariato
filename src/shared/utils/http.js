const urlBase = "http://localhost:8080/";
export const http = {
  get: (url, config) => {
    return fetch(urlBase + url);
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
};
