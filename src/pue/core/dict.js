function Dict(initKwargs = {}) {
  /**
   *
   * @param {object} kwargs Python style Dict = Object(JavaScript)
   */
  const Vue = window.ENGINE;

  class PythonDict {
    constructor() {
      this.$init = false;
      this.$data = Vue.reactive({ ...initKwargs });
      this.$dir = Object.freeze([
        "keys",
        "values",
        "items",
        "get(key)",
        "set(key, value)",
        "del(key)",
        "update(json)",
        "reset",
        "forDict((key, value) => { console.log(key, value); });",
        "forList((item) => { console.log(item); });",
      ]);
      // Init
      this.update({ ...initKwargs });

      // Reset
      this.reset = () => {
        this.update({ ...initKwargs });
      };
    }

    static createClass() {
      return Object.create(new PythonDict());
    }

    get(key) {
      return this.$data[key];
    }

    set(key, value) {
      if (PythonDict.prototype[key] === undefined) {
        Object.defineProperty(PythonDict.prototype, key, {
          get() {
            return this.$data[key];
          },
          set(val) {
            this.$data[key] = val;
          },
        });
      }
      this.$data[key] = value;
    }

    update(kwargs) {
      const keys = Object.keys(kwargs);
      if (!this.$init) {
        this.$init = true;
        keys.forEach((key) => {
          this.set(key, kwargs[key]);
        });
      } else {
        keys.forEach((key) => {
          this.$data[key] = kwargs[key];
        });
      }
    }

    del(key) {
      delete this[key];
      delete this.$data[key];
    }

    keys() {
      return Object.keys(this.$data);
    }

    values() {
      return Object.values(this.$data);
    }

    items() {
      const keys = Object.keys(this.$data);
      const items = [];
      keys.forEach((key) => {
        items.push([key, this.$data[key]]);
      });
      return items;
    }

    get dir() {
      return this.$dir;
    }

    /*
    get value() {
      return this.$data;
    }
    get v() {
      return this.$data;
    }
    */

    forDict(method = null) {
      return this.items().map((i) => method(i[0], i[1]));
    }

    forList(method = null) {
      return this.items().map((i) => method(i));
    }
  }

  // Create New Object => Python-Style <dict>
  return PythonDict.createClass();
}

export default Dict;
