// Hinglish Language - Tokenizer, Parser, Interpreter, Runtime

// Token Types
const TOKEN_TYPES = {
  KEYWORD: "KEYWORD",
  IDENTIFIER: "IDENTIFIER",
  STRING: "STRING",
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
  SYMBOL: "SYMBOL"
};

// Hinglish keywords
const KEYWORDS = ["likho", "agar", "warna", "loopKaro", "kaam", "wapis", "jabKaro", "banao"];

// Tokenizer
function tokenize(input) {
  const tokens = [];
  const regex = /\s*(=>|\{|\}|\(|\)|"[^"]*"|\d+|\w+|==|!=|<=|>=|<|>|\+|\-|\*|\/|=|₹|#)/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    let [value] = match;
    value = value.trim();
    if (!value) continue;

    if (KEYWORDS.includes(value)) tokens.push({ type: TOKEN_TYPES.KEYWORD, value });
    else if (/^\d+$/.test(value)) tokens.push({ type: TOKEN_TYPES.NUMBER, value: Number(value) });
    else if (/^".*"$/.test(value)) tokens.push({ type: TOKEN_TYPES.STRING, value: value.slice(1, -1) });
    else if (["=", "+", "-", "*", "/", "==", "!=", "<", ">", "<=", ">=", "=>"].includes(value)) tokens.push({ type: TOKEN_TYPES.OPERATOR, value });
    else if (["{", "}", "(", ")", "₹", "#"].includes(value)) tokens.push({ type: TOKEN_TYPES.SYMBOL, value });
    else tokens.push({ type: TOKEN_TYPES.IDENTIFIER, value });
  }
  return tokens;
}

// Parser and AST Generator
function parse(tokens) {
  let current = 0;

  function eat(type, value) {
    const token = tokens[current];
    if (!token || token.type !== type || (value && token.value !== value)) {
      throw new SyntaxError(`Expected ${value || type}, got ${token?.value}`);
    }
    current++;
    return token;
  }

  function parseStatement() {
    let token = tokens[current];

    if (token.type === TOKEN_TYPES.KEYWORD) {
      switch (token.value) {
        case "likho":
          current++;
          const expr = parseExpression();
          return { type: "PrintStatement", expression: expr };

        case "banao":
          current++;
          const varName = eat(TOKEN_TYPES.IDENTIFIER).value;
          eat(TOKEN_TYPES.OPERATOR, "=");
          const value = parseExpression();
          return { type: "VariableDeclaration", name: varName, value };

        case "agar":
          current++;
          eat(TOKEN_TYPES.SYMBOL, "(");
          const condition = parseExpression();
          eat(TOKEN_TYPES.SYMBOL, ")");
          eat(TOKEN_TYPES.SYMBOL, "{");
          const consequent = parseBlock();
          let alternate = null;
          if (tokens[current] && tokens[current].value === "warna") {
            current++;
            eat(TOKEN_TYPES.SYMBOL, "{");
            alternate = parseBlock();
          }
          return { type: "IfStatement", condition, consequent, alternate };

        case "loopKaro":
          current++;
          eat(TOKEN_TYPES.SYMBOL, "(");
          const init = parseStatement();
          const conditionLoop = parseExpression();
          eat(TOKEN_TYPES.SYMBOL, ";");
          const after = parseExpression();
          eat(TOKEN_TYPES.SYMBOL, ")");
          eat(TOKEN_TYPES.SYMBOL, "{");
          const body = parseBlock();
          return { type: "LoopStatement", init, condition: conditionLoop, after, body };

        case "kaam":
          current++;
          const fname = eat(TOKEN_TYPES.IDENTIFIER).value;
          eat(TOKEN_TYPES.SYMBOL, "(");
          const params = [];
          while (tokens[current].value !== ")") {
            params.push(eat(TOKEN_TYPES.IDENTIFIER).value);
            if (tokens[current].value === ",") current++;
          }
          eat(TOKEN_TYPES.SYMBOL, ")");
          eat(TOKEN_TYPES.SYMBOL, "{");
          const fnBody = parseBlock();
          return { type: "FunctionDeclaration", name: fname, params, body: fnBody };

        case "jabKaro":
          current++;
          const event = parseExpression();
          const symbol = eat(TOKEN_TYPES.SYMBOL);
          const target = parseExpression();
          eat(TOKEN_TYPES.SYMBOL, "{");
          const eBody = parseBlock();
          return { type: "EventListener", event, target, body: eBody, delegated: symbol.value === "₹" };
      }
    }

    return parseExpression();
  }

  function parseExpression() {
    const token = tokens[current++];
    if (!token) throw new SyntaxError("Unexpected end of input");
    return { type: "Literal", value: token.value };
  }

  function parseBlock() {
    const body = [];
    while (tokens[current] && tokens[current].value !== "}") {
      body.push(parseStatement());
    }
    eat(TOKEN_TYPES.SYMBOL, "}");
    return body;
  }

  const body = [];
  while (current < tokens.length) {
    body.push(parseStatement());
  }
  return { type: "Program", body };
}

// Interpreter with runtime
async function evaluate(node, context = {}) {
  switch (node.type) {
    case "Program":
      for (let stmt of node.body) await evaluate(stmt, context);
      break;
    case "PrintStatement":
      console.log(await evaluate(node.expression, context));
      break;
    case "VariableDeclaration":
      context[node.name] = await evaluate(node.value, context);
      break;
    case "Literal":
      return typeof node.value === "string" && context[node.value] !== undefined ? context[node.value] : node.value;
    case "IfStatement":
      if (await evaluate(node.condition, context)) await evaluate({ type: "Program", body: node.consequent }, context);
      else if (node.alternate) await evaluate({ type: "Program", body: node.alternate }, context);
      break;
    case "LoopStatement":
      await evaluate(node.init, context);
      while (await evaluate(node.condition, context)) {
        await evaluate({ type: "Program", body: node.body }, context);
        await evaluate(node.after, context);
      }
      break;
    case "FunctionDeclaration":
      context[node.name] = async (...args) => {
        const fnContext = { ...context };
        node.params.forEach((p, i) => fnContext[p] = args[i]);
        await evaluate({ type: "Program", body: node.body }, fnContext);
      };
      break;
    case "EventListener": {
      const eventName = await evaluate(node.event, context);
      const targetId = await evaluate(node.target, context);
      const handler = async (e) => await evaluate({ type: "Program", body: node.body }, { ...context, event: e });
      if (node.delegated) {
        document.addEventListener(eventName, (e) => e.target.id === targetId && handler(e));
      } else {
        const el = document.getElementById(targetId);
        if (el) el.addEventListener(eventName, handler);
      }
      break;
    }
  }
}

// Entry point
async function runHinglish(code) {
  const tokens = tokenize(code);
  const ast = parse(tokens);
  await evaluate(ast);
}

window.runHinglish = runHinglish;

// Auto run if script tag type="text/hinglish"
window.addEventListener("load", () => {
  document.querySelectorAll('script[type="text/hinglish"]').forEach(async script => {
    try {
      await runHinglish(script.textContent);
    } catch (err) {
      console.error("Hinglish Error:", err);
    }
  });
});
