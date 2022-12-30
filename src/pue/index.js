import UID from "./uid";
import View from "./core/view";
import Pue from "./core/pue";
import xtyle from "./util/xtyle";

class GUI {
  constructor(val, ctx, model, component) {
    this.$component = {};
    this.app = this.startProject(val, ctx, model, component);
  }

  startProject(val, ctx, model, component) {
    // Store
    const storeConfig = Pue.Store({
      val,
      ctx,
      model,
    });
    // Components
    const appComponents = {};
    const codeComponents = [];
    Object.keys(component).forEach((key) => {
      this.createComponent(component[key]);
      let current = this.$component[key];
      appComponents[key] = current.view;
      codeComponents.push(current.template);
    });
    // Xtyle Inject
    xtyle.html({ code: codeComponents.join("\n") });
    // App
    return Pue.App(appComponents, storeConfig);
  }

  createComponent({ name = null, code = null, methods = {}, data = {} } = {}) {
    /**
     * Petite-Vue (Component)
     * @param {string} uniqueID
     * @param {object} methods
     * @param {object} dataProps
     */

    const uid = name ? name : UID(32, "component");
    const view = View(uid, methods, data);
    this.$component[uid] = {
      id: uid,
      view,
      template: `<template id="${uid}">${code}</template>`,
    };
  }
}

function createApp({ val = null, ctx = {}, model = {}, component = {} } = {}) {
  const admin = new GUI(val, ctx, model, component);
  const app = admin.app;
  return {
    ...app,
    inject: xtyle,
  };
}

export default createApp;
