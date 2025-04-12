(function(global) {
  const context = {
    console,
    document,
    window,
    fetch,
    Math,
    likho: (...args) => console.log(...args),
    bolo: (...args) => {}, // parsed as var declarations
    pakdo: (selector) => {
      const el = document.querySelector(selector);
      return {
        textBadlo: (txt) => el && (el.textContent = txt),
        rangBadlo: (rang) => el && (el.style.color = rang),
        htmlBadlo: (html) => el && (el.innerHTML = html),
        jabKaro: (event, callback) => el && el.addEventListener(event, callback),
      };
    }
  };

  function transpileHinglish(code) {
    return code
      .replace(/bolo\s+([a-zA-Z0-9_]+)\s*=\s*(.*)/g, "let $1 = $2")
      .replace(/likho\s*\((.*?)\)/g, "context.likho($1)")
      .replace(/pakdo\s*\((.*?)\)/g, `context.pakdo($1)`)
      .replace(/jabKaro/g, "jabKaro") // used inside pakdo return
      .replace(/rangBadlo/g, "rangBadlo")
      .replace(/textBadlo/g, "textBadlo")
      .replace(/htmlBadlo/g, "htmlBadlo")
      .replace(/\bbanao function\s+([a-zA-Z0-9_]+)\s*\((.*?)\)/g, "function $1($2)")
      .replace(/\bagar\s*\((.*?)\)/g, "if ($1)")
      .replace(/\bnahiTo\s*\(/g, "else if (")
      .replace(/\bnahiTo\b/g, "else")
      .replace(/\bjabTak\s*\((.*?)\)/g, "while ($1)")
      .replace(/\bkeLiye\s*\((.*?)\)/g, "for ($1)")
      .replace(/\bbreak karo\b/g, "break")
      .replace(/\bcontinue karo\b/g, "continue")
      .replace(/\bwapas bhejo\s+(.*)/g, "return $1")
      .replace(/\basync function\b/g, "async function")
      .replace(/\bawait\b/g, "await")
      .replace(/\bbanao class\s+([a-zA-Z0-9_]+)/g, "class $1")
      .replace(/\bconstructor\b/g, "constructor")
      .replace(/\bthis\b/g, "this")
  }

  async function runHinglish(code) {
    const jsCode = transpileHinglish(code);
    const asyncFn = new Function("context", `"use strict"; return (async () => { ${jsCode} })()`);

    try {
      await asyncFn(context);
    } catch (err) {
      console.error("Hinglish Error:", err.message);
    }
  }

  function initInterpreter() {
    document.querySelectorAll('script[type="text/hinglish"]').forEach(async (script) => {
      const code = script.innerText;
      await runHinglish(code);
    });
  }

  window.addEventListener("DOMContentLoaded", initInterpreter);
  global.runHinglish = runHinglish;
})(window);
