document.addEventListener("DOMContentLoaded", function () {
    const classes = {};
    const globalContext = {};

    async function executeHinglishCode(code, context = globalContext) {
        let lines = typeof code === "string" ? code.split("\n") : [code];
        let i = 0;
        const functions = {};

        function getBlock(startIndex) {
            const block = [];
            let openBraces = 1;
            let j = startIndex + 1;

            while (j < lines.length && openBraces > 0) {
                let line = lines[j].trim();
                if (line === "") {
                    j++;
                    continue;
                }
                if (line.includes("{")) openBraces++;
                if (line.includes("}")) openBraces--;

                if (openBraces > 0) block.push(line);
                j++;
            }

            return { block, nextIndex: j };
        }

        async function runLine(line) {
            line = line.trim();
            if (line === "" || line === "}") return;

            let printMatch = line.match(/^likho\s+(.+)$/);
            if (printMatch) {
                console.log(evalInContext(printMatch[1], context));
                return;
            }

            let varMatch = line.match(/^banao\s+(\w+)\s*=\s*(.+)$/);
            if (varMatch) {
                let [_, name, value] = varMatch;
                context[name] = evalInContext(value, context);
                return;
            }

            let textMatch = line.match(/^badloText\s+\"(.+)\"\s+\"(.+)\"$/);
            if (textMatch) {
                let [_, id, text] = textMatch;
                let el = document.getElementById(id);
                if (el) el.innerText = text;
                return;
            }

            let styleMatch = line.match(/^badlo\s+\"(.+)\"\s+(.+)\s+\"(.+)\"$/);
            if (styleMatch) {
                let [_, id, property, value] = styleMatch;
                let el = document.getElementById(id);
                if (el) el.style[property] = value;
                return;
            }

            let eventMatch = line.match(/^jab\s+\"(.+)\"\s+₹\s+\"(.+)\"\s*\{$/);
            if (eventMatch) {
                let [_, eventType, elementId] = eventMatch;
                let el = document.getElementById(elementId);
                let { block, nextIndex } = getBlock(i);
                i = nextIndex - 1;
                if (el) {
                    el.addEventListener(eventType, () => {
                        executeHinglishCode(block.join("\n"), context);
                    });
                }
                return;
            }

            let ifMatch = line.match(/^agar\s+\((.+)\)\s*\{$/);
            if (ifMatch) {
                let condition = ifMatch[1];
                let { block, nextIndex } = getBlock(i);
                let elseLine = lines[nextIndex]?.trim();
                let elseBlock = null;

                if (elseLine?.startsWith("warna {")) {
                    let parsed = getBlock(nextIndex);
                    elseBlock = parsed.block;
                    nextIndex = parsed.nextIndex;
                }

                i = nextIndex - 1;

                if (evalInContext(condition, context)) {
                    await executeHinglishCode(block, context);
                } else if (elseBlock) {
                    await executeHinglishCode(elseBlock, context);
                }
                return;
            }

            let loopMatch = line.match(/^loopKaro\s*\((.+);(.+);(.+)\)\s*\{$/);
            if (loopMatch) {
                let [_, init, condition, increment] = loopMatch;
                let { block, nextIndex } = getBlock(i);
                i = nextIndex - 1;
                evalInContext(init, context);
                while (evalInContext(condition, context)) {
                    await executeHinglishCode(block, context);
                    evalInContext(increment, context);
                }
                return;
            }

            let funcMatch = line.match(/^kaam\s+(\w+)\((.*)\)\s*\{$/);
            if (funcMatch) {
                let [_, name, params] = funcMatch;
                let { block, nextIndex } = getBlock(i);
                functions[name] = { params: params.split(",").map(p => p.trim()), block };
                i = nextIndex - 1;
                return;
            }

            let callMatch = line.match(/^(\w+)\((.*)\)$/);
            if (callMatch && functions[callMatch[1]]) {
                let [_, name, argsRaw] = callMatch;
                let { params, block } = functions[name];
                let args = argsRaw.split(",").map(a => evalInContext(a, context));
                let localContext = { ...context };
                params.forEach((p, idx) => (localContext[p] = args[idx]));
                await executeHinglishCode(block, localContext);
                return;
            }

            let classMatch = line.match(/^class\s+(\w+)\s*\{$/);
            if (classMatch) {
                let [_, name] = classMatch;
                let { block, nextIndex } = getBlock(i);
                i = nextIndex - 1;
                let classBody = new Function("context", `with(context) { ${block.join("\n")} }`);
                classes[name] = function (...args) {
                    const instance = {};
                    classBody({ ...context, this: instance, arguments: args });
                    return instance;
                };
                return;
            }

            let newObjMatch = line.match(/^banao\s+(\w+)\s*=\s*new\s+(\w+)\((.*)\)$/);
            if (newObjMatch) {
                let [_, varName, className, argsRaw] = newObjMatch;
                let args = argsRaw.split(",").map(a => evalInContext(a, context));
                if (classes[className]) {
                    context[varName] = classes[className](...args);
                }
                return;
            }

            let importMatch = line.match(/^import\s+\"(.+)\"$/);
            if (importMatch) {
                let [_, src] = importMatch;
                let res = await fetch(src);
                let importedCode = await res.text();
                await executeHinglishCode(importedCode, context);
                return;
            }

            let aiMatch = line.match(/^banao\s+app\s+\"(.+)\"$/);
            if (aiMatch) {
                let [_, appIdea] = aiMatch;
                alert(`AI App bana raha hai: ${appIdea}`);
                return;
            }

            // Evaluate any raw JS code in Hinglish
            try {
                evalInContext(line, context);
            } catch (e) {
                console.error("Error evaluating line:", line, e);
            }
        }

        while (i < lines.length) {
            await runLine(lines[i]);
            i++;
        }
    }

    function evalInContext(js, context) {
        return Function("with(this) { return (" + js + ") }").call(context);
    }

    document.querySelectorAll('script[type="text/hinglish"]').forEach(script => {
        executeHinglishCode(script.innerText);
    });
});
