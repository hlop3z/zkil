/**
 * { @Petite-Vue }
 */

function createStore(props) {
  /**
   * Create Global Store with { Petite-Vue }.
   * @param {any} val
   * @param {any} ctx
   * @param {any} model
   */

  const Vue = window.ENGINE;

  // Static (HardCoded)
  const staticVariables = props.val ? props.val : {};

  // Reactive
  const reactiveVariables = props.ctx ? props.ctx : {};

  // Models
  const modelVariables = props.model ? props.model : {};
  const reactiveModels = {};
  Object.keys(modelVariables).forEach((key) => {
    // { PetiteVue.reactive }
    reactiveModels[key] = Vue.reactive(modelVariables[key]);
  });

  // Store
  return {
    // { PetiteVue.reactive }
    ctx: Vue.reactive(reactiveVariables),
    val: staticVariables,
    model: reactiveModels,
  };
}

function createApp(gui, store) {
  /**
   * Create App with { Petite-Vue }.
   * @param {any} store
   * @param {any} app
   */
  const Vue = window.ENGINE;

  // { PetiteVue.createApp }
  const app = Vue.createApp({
    store,
    app: gui,
  });

  return {
    app,
    store,
    gui,
  };
}

export default {
  Store: createStore,
  App: createApp,
};
