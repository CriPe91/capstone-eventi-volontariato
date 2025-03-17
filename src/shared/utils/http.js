const urlBase = "http://localhost:8080/";
export const http = {
  getAuth: (url, config) => {
    return fetch(urlBase + url, config).then((res) => res.json());
  },
  postAuth: (url, data, config) => {
    return fetch(urlBase + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...config,
    }).then((res) => res.json());
  },
  post: (url, data, config) => {
    /*  console.log({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }); */
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

  // METODI PER IL BACKOFFICE(ADMIN)
  postFormDataAuth: (url, formData) => {
    return fetch(urlBase + url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    }).then((res) => res.json());
  },

  putAuth: (url, data, config) => {
    return fetch(urlBase + url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...config,
    }).then((res) => res.json());
  },

  deleteAuth: (url, config) => {
    return fetch(urlBase + url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      ...config,
    }).then((res) => res.json());
  },
  getWithParams: (url, params) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${urlBase}${url}?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};
