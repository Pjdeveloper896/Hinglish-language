document.addEventListener("DOMContentLoaded", function () {
    function executeHinglishCode(code, context = {}) {
        let lines = typeof code === "string" ? code.split("\n") : [code];
        let i = 0;

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

        function runLine(line) {
            line = line.trim();
            if (line === "" || line === "}") return;

            // Print
            let printMatch = line.match(/^likho\s+(.+)$/);
            if (printMatch) {
                console.log(eval(printMatch[1], context));
                return;
            }

            // Variable
            let varMatch = line.match(/^banao\s+(\w+)\s*=\s*(.+)$/);
            if (varMatch) {
                let [_, name, value] = varMatch;
                context[name] = eval(value, context);
                return;
            }

            // Set text
            let textMatch = line.match(/^badloText\s+"(.+)"\s+"(.+)"$/);
            if (textMatch) {
                let [_, id, text] = textMatch;
                let el = document.getElementById(id);
                if (el) el.innerText = text;
                return;
            }

            // Change style
            let styleMatch = line.match(/^badlo\s+"(.+)"\s+(.+)\s+"(.+)"$/);
            if (styleMatch) {
                let [_, id, property, value] = styleMatch;
                let el = document.getElementById(id);
                if (el) el.style[property] = value;
                return;
            }

            // Event Listener with curly braces
            let eventMatch = line.match(/^jab\s+"(.+)"\s+₹\s+"(.+)"\s*\{$/);
            if (eventMatch) {
                let [_, eventType, elementId] = eventMatch;
                let el = document.getElementById(elementId);
                let { block, nextIndex } = getBlock(i);
                i = nextIndex - 1;
                if (el) {
                    el.addEventListener(eventType, () => {
                        block.forEach(cmd => executeHinglishCode(cmd, context));
                    });
                }
                return;
            }
        }

        while (i < lines.length) {
            runLine(lines[i]);
            i++;
        }
    }

    document.querySelectorAll('script[type="text/hinglish"]').forEach(script => {
        executeHinglishCode(script.innerText);
    });
});
