const prefixCSS = "gui-design";
const prefixJavaScript = "gui-script";

function injectCSS(props) {
  /**
   * Inject replaceable CSS.
   * @param {string} id
   * @param {string} code
   */
  const ID = props.id;
  const stringTemplate = props.code;

  function getStyle(id) {
    /**
     * Add replaceable CSS.
     * @param {string} styleID
     * @param {string} styleString
     */
    const found = window.document.querySelectorAll(`[${prefixCSS}="${id}"]`);
    if (found.length > 0) {
      return found[0];
    } else {
      const style = window.document.createElement("style");
      style.setAttribute(prefixCSS, id);
      window.document.head.append(style);
      return style;
    }
  }

  function removeSpace(text) {
    /**
     * Clean CSS Code.
     * @param {string} text
     */
    return text
      .replace(/\s\s+/g, " ")
      .replace(/\r?\n|\r/g, "")
      .trim();
  }

  const elem = getStyle(ID);
  elem.textContent = removeSpace(stringTemplate);
}

function injectHTML(props) {
  /**
   * Inject replaceable HTML.
   * @param {string} id
   * @param {string} code
   */
  const ID = props.id;
  const stringTemplate = props.code;
  if (ID) {
    window.document.querySelector(`#${ID}`).innerHTML = stringTemplate;
  } else {
    const elem = document.createElement("div");
    elem.innerHTML = stringTemplate;
    document.body.insertBefore(elem, document.body.firstChild);
  }
}

function injectJavaScript(props) {
  /**
   * Inject replaceable HTML.
   * @param {string} id
   * @param {string} src
   */

  const ID = props.id;
  const SRC = props.src;
  if (SRC) {
    let elem = document.querySelectorAll(`[${prefixJavaScript}="${ID}"]`);
    if (elem.length > 0) {
      elem[0].remove();
    }
    elem = window.document.createElement("script");
    elem.setAttribute(prefixJavaScript, ID);
    // Inject SRC.js
    elem.src = SRC;
    const firstScript = window.document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(elem, firstScript);
  }
}

export default {
  html: injectHTML,
  css: injectCSS,
  js: injectJavaScript,
};
