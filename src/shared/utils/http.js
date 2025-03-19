const urlBase = "http://localhost:8080/";

/* const getConfig = (config = {}) => {

  const token = localStorage.getItem("token")

  return{
    ...config, 
    headers : {
      Authorization : "Bearer " + token,
    }
  };
}; */
export const http = {
  getAuth: (url, config) => {
    return fetch(urlBase + url, config).then((res) => res.json());
  },
  post: (url, data, config) => {
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
  postAuth: async (url, data, config) => {
    const response = await fetch(urlBase + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...config,
    });

    if (!response.ok) throw new Error("Errore nella richiesta POST");

    return response.json();
  },

  postFormDataAuth: async (url, formData) => {
    const response = await fetch(urlBase + url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData, // Non impostiamo il Content-Type manualmente
    });

    /* console.log("Status della risposta:", response.status); */

    if (!response.ok) throw new Error(`Errore nella richiesta POST FormData - Status: ${response.status}`);

    return response.json();
  },

  putAuth: async (url, data, config) => {
    const response = await fetch(urlBase + url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...config,
    });

    if (!response.ok) throw new Error("Errore nella richiesta PUT");

    return response.json();
  },

  deleteAuth: async (url, config) => {
    const response = await fetch(urlBase + url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      ...config,
    });

    if (!response.ok) throw new Error("Errore nella richiesta DELETE");

    return response.json();
  },

  getWithParams: async (url, params) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${urlBase}${url}?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Errore nella richiesta GET");

    return response.json();
  },
};
