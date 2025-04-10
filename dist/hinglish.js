const classes = {}, globalContext = {}, functions = {};

async function executeHinglishCode(code, context = globalContext) {
  let lines = Array.isArray(code) ? code : code.split("\n"), i = 0;

  function getBlock(start) {
    const block = []; let open = 1, j = start + 1;
    while (j < lines.length && open > 0) {
      let line = lines[j].trim();
      if (line === "") { j++; continue; }
      if (line.includes("{")) open++;
      if (line.includes("}")) open--;
      if (open > 0) block.push(line);
      j++;
    }
    return { block, nextIndex: j };
  }

  async function runLine(line) {
    if (typeof line !== "string") return;
    line = line.trim(); if (line === "" || line === "}") return;

    let m;

    if (m = line.match(/^likho\s+(.+)$/)) return console.log(await evalInContext(m[1], context));

    if (m = line.match(/^banao\s+(\w+)\s*=\s*(.+)$/)) return context[m[1]] = await evalInContext(m[2], context);

    if (m = line.match(/^badlo\s+"(.+)"\s+([\w-]+)\s+"(.+)"$/)) {
      let el = document.getElementById(m[1]);
      if (el) el.style.setProperty(m[2], m[3]);
      return;
    }

    if (m = line.match(/^badloText\s+"(.+)"\s+"(.+)"$/)) {
      let el = document.getElementById(m[1]);
      if (el) el.innerText = m[2];
      return;
    }

    if (m = line.match(/^eventLaga\s+(.+)\s+₹(@?)\s*"(.+)"\s*\{$/)) {
      let eventPart = m[1].trim(), delegated = m[2] === "@", targetId = m[3];
      let { block, nextIndex } = getBlock(i); i = nextIndex - 1;

      let eventTypes = [];
      try {
        eventTypes = JSON.parse(eventPart);
        if (!Array.isArray(eventTypes)) throw new Error("Not array");
      } catch {
        eventTypes = [eventPart.replace(/^"|"$/g, "")];
      }

      eventTypes.forEach(eventType => {
        if (delegated) {
          document.addEventListener(eventType, async e => {
            if (e.target.id === targetId) {
              try {
                await executeHinglishCode([...block], { ...context, event: e });
              } catch (err) {
                console.error("Delegated event error:", err);
              }
            }
          });
        } else {
          const handler = async () => {
            let el = document.getElementById(targetId);
            if (!el) return;
            el.addEventListener(eventType, async e => {
              try {
                await executeHinglishCode([...block], { ...context, event: e });
              } catch (err) {
                console.error("EventLaga error:", err);
              }
            });
          };
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", handler);
          } else {
            handler();
          }
        }
      });
      return;
    }

    if (m = line.match(/^agar\s+\((.+)\)\s*\{$/)) {
      let cond = m[1], { block, nextIndex } = getBlock(i), elseBlock = null;
      let next = lines[nextIndex]?.trim();
      if (next?.startsWith("warna {")) {
        let parsed = getBlock(nextIndex);
        elseBlock = parsed.block;
        nextIndex = parsed.nextIndex;
      }
      i = nextIndex - 1;
      if (await evalInContext(cond, context)) await executeHinglishCode(block, context);
      else if (elseBlock) await executeHinglishCode(elseBlock, context);
      return;
    }

    if (m = line.match(/^loopKaro\s*\((.+);(.+);(.+)\)\s*\{$/)) {
      let { block, nextIndex } = getBlock(i); i = nextIndex - 1;
      await evalInContext(m[1], context);
      while (await evalInContext(m[2], context)) {
        await executeHinglishCode(block, context);
        await evalInContext(m[3], context);
      }
      return;
    }

    if (m = line.match(/^kaam\s+(\w+)\((.*)\)\s*\{$/)) {
      let { block, nextIndex } = getBlock(i);
      functions[m[1]] = { params: m[2].split(",").map(p => p.trim()), block };
      i = nextIndex - 1;
      return;
    }

    if ((m = line.match(/^(\w+)\((.*)\)$/)) && functions[m[1]]) {
      let fn = functions[m[1]], args = await Promise.all(m[2].split(",").map(a => evalInContext(a, context)));
      let ctx = { ...context }; fn.params.forEach((p, i) => ctx[p] = args[i]);
      await executeHinglishCode(fn.block, ctx);
      return;
    }

    if (m = line.match(/^class\s+(\w+)\s*\{$/)) {
      let { block, nextIndex } = getBlock(i); i = nextIndex - 1;
      classes[m[1]] = (...args) => {
        const inst = {}; executeHinglishCode(block, { ...context, this: inst, arguments: args });
        return inst;
      };
      return;
    }

    if (m = line.match(/^banao\s+(\w+)\s*=\s*new\s+(\w+)\((.*)\)$/)) {
      let args = await Promise.all(m[3].split(",").map(a => evalInContext(a, context)));
      if (classes[m[2]]) context[m[1]] = classes[m[2]](...args);
      return;
    }

    if (m = line.match(/^import\s+"(.+)"$/)) {
      let res = await fetch(m[1]), importedCode = await res.text();
      await executeHinglishCode(importedCode, context);
      return;
    }

    if (m = line.match(/^fetchKaro\((.+)\)$/)) {
      let url = await evalInContext(m[1], context), res = await fetch(url);
      return await res.json();
    }

    if (m = line.match(/^banao\s+app\s+"(.+)"$/)) return alert("AI app bana raha hai: " + m[1]);

    try { await evalInContext(line, context); }
    catch (e) { console.error("Error evaluating line:", line, e); }
  }

  while (i < lines.length) await runLine(lines[i++]);
}

async function evalInContext(js, context) {
  return await Function("with(this) { return (" + js + ") }").call(context);
}

window.executeHinglishCode = executeHinglishCode;

// Auto-run Hinglish code in <script type="text/hinglish">
window.addEventListener("load", () => {
  document.querySelectorAll('script[type="text/hinglish"]').forEach(async (script) => {
    try {
      await executeHinglishCode(script.textContent);
    } catch (e) {
      console.error("Hinglish error:", e);
    }
  });
});
