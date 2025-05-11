
class Hinglish {
  constructor() {
    this.variables = {};
  }

  likho(likh) {
    console.log(likh);
  }

  banao(naam, value) {
    this.variables[naam] = value;
  }

  badlo(naam, nayaValue) {
    if (naam in this.variables) {
      this.variables[naam] = nayaValue;
    } else {
      console.error(`Variable '${naam}' pehle banao.`);
    }
  }

  lelo(naam) {
    return this.variables[naam];
  }

  agar(condition, haanKaro, nahiKaro = () => {}) {
    if (condition) {
      haanKaro();
    } else {
      nahiKaro();
    }
  }

  ghoom(start, end, step = 1, callback) {
    for (let i = start; i < end; i += step) {
      callback(i);
    }
  }

  // Arrays
  jodoArray(naam, item) {
    if (Array.isArray(this.variables[naam])) {
      this.variables[naam].push(item);
    } else {
      console.error(`${naam} ek array nahi hai.`);
    }
  }

  leloArrayKa(naam, index) {
    if (Array.isArray(this.variables[naam])) {
      return this.variables[naam][index];
    }
    console.error(`${naam} ek array nahi hai.`);
    return null;
  }

  // Objects
  setKaroObj(naam, key, value) {
    if (typeof this.variables[naam] === 'object' && !Array.isArray(this.variables[naam])) {
      this.variables[naam][key] = value;
    } else {
      console.error(`${naam} ek object nahi hai.`);
    }
  }

  leloObjKa(naam, key) {
    if (typeof this.variables[naam] === 'object' && !Array.isArray(this.variables[naam])) {
      return this.variables[naam][key];
    }
    console.error(`${naam} ek object nahi hai.`);
    return null;
  }

  // Functions
  banaoFunction(naam, fn) {
    if (typeof fn === 'function') {
      this.variables[naam] = fn;
    } else {
      console.error(`Function ke liye ek valid function pass karo.`);
    }
  }

  chalaoFunction(naam, ...args) {
    if (typeof this.variables[naam] === 'function') {
      return this.variables[naam](...args);
    } else {
      console.error(`${naam} koi function nahi hai.`);
    }
  }
}

class Dom {
  addKaro(content, tag, id = "") {
    const el = document.createElement(tag);
    el.innerHTML = content;
    if (id) el.id = id;
    document.body.appendChild(el);
  }

  likhoInner(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = text;
  }

  setAttr(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  getAttr(selector, attr) {
    const el = document.querySelector(selector);
    return el ? el.getAttribute(attr) : null;
  }

  hatao(selector) {
    const el = document.querySelector(selector);
    if (el) el.remove();
  }

  laoElement(selector) {
    return document.querySelector(selector);
  }
}

class Events {
  lagaEvent(selector, eventType, callback) {
    const el = document.querySelector(selector);
    if (el) {
      el.addEventListener(eventType, callback);
    }
  }

  lagaSabko(selector, eventType, callback) {
    document.addEventListener(eventType, (e) => {
      if (e.target.matches(selector)) {
        callback(e);
      }
    });
  }
}


// ✅ Export a bundled runtime class
class HinglishRuntime {
  constructor() {
    this.core = new Hinglish();
    this.dom = new Dom();
    this.events = new Events();
    this.date = new DateHinglish();
    this.math = new MathHinglish();
  }
}

// ✅ Expose globally for CDN use
window.HinglishRuntime = HinglishRuntime;
