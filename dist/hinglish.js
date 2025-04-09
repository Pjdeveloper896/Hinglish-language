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

    // Print
    if (m = line.match(/^likho\s+(.+)$/)) return console.log(await evalInContext(m[1], context));

    // Variable
    if (m = line.match(/^banao\s+(\w+)\s*=\s*(.+)$/)) return context[m[1]] = await evalInContext(m[2], context);

    // Style change
    if (m = line.match(/^badlo\s+"(.+)"\s+([\w-]+)\s+"(.+)"$/)) {
      let el = document.getElementById(m[1]);
      if (el) el.style.setProperty(m[2], m[3]);
      return;
    }

    // Text change
    if (m = line.match(/^badloText\s+"(.+)"\s+"(.+)"$/)) {
      let el = document.getElementById(m[1]);
      if (el) el.innerText = m[2];
      return;
    }

    // Event binding
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

      if (delegated) {
        eventTypes.forEach(eventType => {
          document.addEventListener(eventType, async e => {
            if (e.target.id === targetId) {
              try {
                await executeHinglishCode([...block], { ...context, event: e });
              } catch (err) {
                console.error("Delegated event error:", err);
              }
            }
          });
        });
      } else {
        let el = document.getElementById(targetId);
        if (!el) return;
        eventTypes.forEach(eventType => {
          el.addEventListener(eventType, async e => {
            try {
              await executeHinglishCode([...block], { ...context, event: e });
            } catch (err) {
              console.error("EventLaga error:", err);
            }
          });
        });
      }
      return;
    }

    // Conditionals
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

    // Loops
    if (m = line.match(/^loopKaro\s*\((.+);(.+);(.+)\)\s*\{$/)) {
      let { block, nextIndex } = getBlock(i); i = nextIndex - 1;
      await evalInContext(m[1], context);
      while (await evalInContext(m[2], context)) {
        await executeHinglishCode(block, context);
        await evalInContext(m[3], context);
      }
      return;
    }

    // Functions
    if (m = line.match(/^kaam\s+(\w+)\((.*)\)\s*\{$/)) {
      let { block, nextIndex } = getBlock(i);
      functions[m[1]] = { params: m[2].split(",").map(p => p.trim()), block };
      i = nextIndex - 1;
      return;
    }

    // Function call
    if ((m = line.match(/^(\w+)\((.*)\)$/)) && functions[m[1]]) {
      let fn = functions[m[1]], args = await Promise.all(m[2].split(",").map(a => evalInContext(a, context)));
      let ctx = { ...context }; fn.params.forEach((p, i) => ctx[p] = args[i]);
      await executeHinglishCode(fn.block, ctx);
      return;
    }

    // Classes
    if (m = line.match(/^class\s+(\w+)\s*\{$/)) {
      let { block, nextIndex } = getBlock(i); i = nextIndex - 1;
      classes[m[1]] = (...args) => {
        const inst = {};
        executeHinglishCode(block, { ...context, this: inst, arguments: args });
        return inst;
      };
      return;
    }

    // Class instantiation
    if (m = line.match(/^banao\s+(\w+)\s*=\s*new\s+(\w+)\((.*)\)$/)) {
      let args = await Promise.all(m[3].split(",").map(a => evalInContext(a, context)));
      if (classes[m[2]]) context[m[1]] = classes[m[2]](...args);
      return;
    }

    // Import
    if (m = line.match(/^import\s+"(.+)"$/)) {
      let res = await fetch(m[1]), importedCode = await res.text();
      await executeHinglishCode(importedCode, context);
      return;
    }

    // Fetch
    if (m = line.match(/^fetchKaro\((.+)\)$/)) {
      let url = await evalInContext(m[1], context), res = await fetch(url);
      return await res.json();
    }

    // AI App Generation
    if (m = line.match(/^banao\s+app\s+"(.+)"$/)) {
      return alert("AI app bana raha hai: " + m[1]);
    }

    try {
      await evalInContext(line, context);
    } catch (e) {
      console.error("Error evaluating line:", line, e);
    }
  }

  while (i < lines.length) await runLine(lines[i++]);
}

async function evalInContext(js, context) {
  return await Function("with(this) { return (" + js + ") }").call(context);
}

window.executeHinglishCode = executeHinglishCode;
