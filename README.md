# Zkil | **Progressive Enhancement Tool**

## Usage via (CDN)

- Total Size **`18-KB`**

```html
<script src="https://cdn.jsdelivr.net/gh/hlop3z/zkil@main/release/zkil0.1.0.min.js"></script>
```

Slight modification to [`Petite-Vue`](https://github.com/vuejs/petite-vue)

---

## Store

```js
const globalValues = {
  title: "Zkil",
};

const reactValues = {
  count: 10,
};

const models = {
  table: {
    count: 20,
    add() {
      this.count++;
    },
  },
};
```

## Components

```js
const components = {};

const counterTemplate = `
<h1>
    Project Name: {{ store.val.title }}
</h1>
<h3>
    Model count is {{ store.model.table.count }} <br>
    React count is {{ store.ctx.count }} <br>
    Local count is {{ count }} <br>
</h3>
<button @click="buttonAction">
    Click Me
</button>
`;
components["counter"] = {
  name: "counter",
  code: counterTemplate,
  data: {
    count: 0,
  },
  methods: {
    buttonAction() {
      this.count++;
      store.ctx.count++;
      store.model.table.add();
    },
  },
};
```

## Main

```js
// Create Petite-Vue Project with { Zkil }
const { app, store, gui, inject } = zkil.createApp({
  val: globalValues,
  ctx: reactValues,
  model: models,
  component: components,
});

// Inject HTML App
inject.html({
  id: "app",
  code: `<div v-scope="gui.counter({ count: 2 })" @mounted="console.log('mounted on: ', $el)"></div>`,
});

// Inject CSS Styles-Sheet
inject.css({
  id: "main",
  code: `
  * { text-align: center; }
  button { padding: 8px 12px; font-weight: bold; }
  `,
});

// Mount App
app.mount();
```

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Zkil App</title>
    <script src="https://cdn.jsdelivr.net/gh/hlop3z/zkil@main/release/zkil0.1.0.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script src="app/store.js"></script>
    <script src="app/components.js"></script>
    <script src="app/main.js"></script>
  </body>
</html>
```

---

## Single File

> You can also use a **`Single-File`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Zkil App</title>
    <script src="https://cdn.jsdelivr.net/gh/hlop3z/zkil@main/release/zkil0.1.0.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      // STORE

      const globalValues = {
        title: "Zkil",
      };

      const reactValues = {
        count: 10,
      };

      const models = {
        table: {
          count: 20,
          add() {
            this.count++;
          },
        },
      };

      // COMPONENTS

      const components = {};

      const counterTemplate = `
<h1>
    Project Name: {{ store.val.title }}
</h1>
<h3>
    Model count is {{ store.model.table.count }} <br>
    React count is {{ store.ctx.count }} <br>
    Local count is {{ count }} <br>
</h3>
<button @click="buttonAction">
    Click Me
</button>
`;
      components["counter"] = {
        name: "counter",
        code: counterTemplate,
        data: {
          count: 0,
        },
        methods: {
          buttonAction() {
            this.count++;
            store.ctx.count++;
            store.model.table.add();
          },
        },
      };

      // Create Petite-Vue Project with { Zkil }
      const { app, store, gui, inject } = zkil.createApp({
        val: globalValues,
        ctx: reactValues,
        model: models,
        component: components,
      });

      // Inject HTML App
      inject.html({
        id: "app",
        code: `<div v-scope="gui.counter({ count: 2 })" @mounted="console.log('mounted on: ', $el)"></div>`,
      });

      // Inject CSS Styles-Sheet
      inject.css({
        id: "main",
        code: `
  * { text-align: center; }
  button { padding: 8px 12px; font-weight: bold; }
  `,
      });

      // Mount App
      app.mount();
    </script>
  </body>
</html>
```
