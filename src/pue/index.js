import Dict from "./core/dict";
import View from "./core/view";
import Pue from "./core/pue";
import UID from "./util/uid";
import Xtyle from "./util/xtyle";
import API from "./util/api";

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
    Xtyle.html({ code: codeComponents.join("\n") });
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
    const templateName = `${uid}-template`;
    const view = View(templateName, methods, data);
    this.$component[uid] = {
      id: uid,
      view,
      template: `<template id="${templateName}">${code}</template>`,
    };
  }
}

function createApp({ val = null, ctx = {}, model = {}, component = {} } = {}) {
  const admin = new GUI(val, ctx, model, component);
  const app = admin.app;
  return {
    ...app,
    inject: Xtyle,
  };
}

export default { createApp, inject: Xtyle, dict: Dict, api: API };
