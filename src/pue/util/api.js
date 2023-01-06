const Api = (function () {
  // API - Handler
  function APIHandler(URL, OPTIONS) {
    return new Promise((myResolve, myReject) => {
      fetch(URL, OPTIONS)
        .then((response) => response.json())
        .then((json) => myResolve(json))
        .catch((error) => myReject(error));
    });
  }

  // URL - Fixer
  function URLFixer(baseURL, url) {
    const mainURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";
    const apiURL = !url.startsWith("/") ? url : url.substring(1);
    return mainURL + apiURL;
  }

  class API {
    constructor(baseURL, options) {
      this.host = baseURL;
      this.options = options;
      this.baseURL = (url) => URLFixer(this.host, url);
    }

    /* Create - API */
    static createAPI(baseURL, options = {}) {
      const OPTIONS = {
        mode: "cors",
        credentials: "same-origin", // same-origin include
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      return new API(baseURL, { ...OPTIONS, ...options });
    }

    /* GET */
    ["get"](url = null, data = false) {
      const params = !data ? "" : `?${new URLSearchParams(data).toString()}`;
      const path = `${this.baseURL(url)}${params}`;
      const myoptions = { method: "GET" };
      const options = { ...this.options, ...myoptions };
      return APIHandler(path, options);
    }

    /* POST */
    ["post"](url = null, data = false) {
      const path = `${this.baseURL(url)}`;
      const params = !data ? data : JSON.stringify(data);
      const myoptions = { method: "POST" };
      if (data) {
        myoptions.body = params;
      }
      const options = { ...this.options, ...myoptions };
      return APIHandler(path, options);
    }

    /* GraphQL */
    ["graphql"](query = null, props = {}) {
      const $props = props ? props : {};
      const myoptions = { query: query };
      const operationName = $props.operationName ? $props.operationName : null;
      const variables = $props.variables ? $props.variables : null;
      if (variables) {
        myoptions.variables = variables;
      }
      if (operationName) {
        myoptions.operationName = operationName;
      }
      return this.post("graphql", myoptions);
    }
  }

  return API.createAPI;
})();

export default Api;
