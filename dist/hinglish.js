// hinglish.js

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

window.hinglish = new Hinglish();
window.dom = new Dom();
window.events = new Events();
