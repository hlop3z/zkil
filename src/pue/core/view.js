export default function View(template, methods, data) {
  function Config(componentData) {
    const config = {
      ...componentData,
      ...methods,
    };
    if (template) {
      config.$template = `#${template}`;
    }
    return config;
  }
  function Component(props) {
    const userData = { ...data };
    if (props) {
      Object.keys(props).forEach((key) => {
        userData[key] = props[key];
      });
    }
    return Config(userData);
  }
  return Component;
}
