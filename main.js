import "@/css/style.css";
import Pue from "@/pue";

/*
  @ Components
*/

const TemplateDemo = `
My count is {{ count }}
<button @click="inc">++</button>
`;

const components = {
  counter: {
    name: "counter",
    code: TemplateDemo,
    methods: {
      inc() {
        this.count++;
        store.ctx.count++;
        store.model.view.go();
      },
    },
    data: {
      count: 10,
    },
  },
  home: {
    name: "home",
    code: `
    <h1>
      {{ store.val.title }}
    </h1>
    <h3>
      {{ project }}
    </h3>
    <div v-scope="gui.counter({ count: 1 })"></div>    
    <div v-scope="gui.counter({ count: 10 })"></div>    
    `,
    data: {
      project: "DevOps",
    },
  },
};

/*
  @ Store
*/
const models = {
  view: {
    name: "View - 2",
    go() {
      console.log("Go");
      console.log(this.name);
      console.log(store.ctx.count);
      console.log(store.val.title);
    },
  },
};

const globalVars = {
  title: "Cloud-Manager",
};
const reactVars = {
  count: 0,
};

/*
console.log(store.val);
console.log(store.ctx);
console.log(store.model.view.name);
store.model.view.go();
*/

// const { app, store } = gui.app();

const { app, store, gui, inject } = Pue({
  val: globalVars,
  ctx: reactVars,
  model: models,
  component: components,
});

inject.html({
  id: "app",
  code: `<div v-scope="gui.home({
    project: 'Hell-Yeah',
  })" @mounted="console.log('mounted on: ', $el)"></div>`,
});

window.gui = gui;

app.mount();
