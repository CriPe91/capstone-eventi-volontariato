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
  postAuth: async (url, data = null, config = {}) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    // Aggiunge il Content-Type solo se c'è un body JSON
    if (data) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(urlBase + url, {
      method: "POST",
      headers,
      body: data ? JSON.stringify(data) : null, // Se data è null, non manda il body
      ...config,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Errore nella richiesta POST: ${errorMessage}`);
    }

    return response.json();
  },

  postFormDataAuth: async (url, formData) => {
    const response = await fetch(urlBase + url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData, // Non impostiamo manualmente il Content-Type lo fa in automatico
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Errore nella richiesta POST FormData - Status: ${response.status} - ${errorMessage}`);
    }

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
