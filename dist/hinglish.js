(function () {
  class HinglishInterpreter {
    constructor() {
      this.functions = {};
      this.globalContext = {};
    }

    tokenize(code) {
      const tokens = [];
      const regex = /\s*(\w+|".+?"|#|{|}|=>|=|\(|\)|,|\+|\-|\*|\/|==|!=|<|>)/g;
      let match;
      while ((match = regex.exec(code)) !== null) {
        tokens.push(match[1]);
      }
      return tokens;
    }

    parse(tokens) {
      const ast = [];
      let index = 0;

      while (index < tokens.length) {
        const token = tokens[index];

        if (token === 'jabKaro') {
          const eventType = tokens[++index].replace(/"/g, '');
          if (tokens[++index] !== '#') throw new SyntaxError("Expected # for ID selector");
          const elementId = tokens[++index].replace(/"/g, '');
          if (tokens[++index] !== '{') throw new SyntaxError("Expected { after element ID");

          const { block, endIndex } = this.parseBlock(tokens, ++index);
          ast.push({
            type: 'eventListener',
            event: eventType,
            elementId,
            block
          });
          index = endIndex;
        } else if (token === 'likho') {
          const message = tokens[++index].slice(1, -1);
          ast.push({
            type: 'log',
            message
          });
          index++;
        } else {
          index++;
        }
      }

      return ast;
    }

    parseBlock(tokens, index) {
      const blockTokens = [];
      let openBraces = 1;
      while (openBraces > 0 && index < tokens.length) {
        const token = tokens[index];
        if (token === '{') openBraces++;
        else if (token === '}') openBraces--;
        else blockTokens.push(token);
        index++;
      }
      return { block: this.parse(blockTokens), endIndex: index };
    }

    async execute(ast) {
      for (const node of ast) {
        if (node.type === 'eventListener') {
          this.addEventListener(node);
        } else if (node.type === 'log') {
          console.log(node.message);
        }
      }
    }

    addEventListener(node) {
      document.addEventListener(node.event, (e) => {
        if (e.target.id === node.elementId) {
          this.execute(node.block);
        }
      });
    }

    async run(code) {
      const tokens = this.tokenize(code);
      const ast = this.parse(tokens);
      await this.execute(ast);
    }
  }

  // Auto-run any <script type="text/hinglish">
  function autoRunHinglish() {
    const interpreter = new HinglishInterpreter();
    const scripts = document.querySelectorAll('script[type="text/hinglish"]');
    scripts.forEach((script) => {
      const code = script.innerText || script.textContent;
      interpreter.run(code);
    });
  }

  // Make globally accessible
  window.Hinglish = {
    Interpreter: HinglishInterpreter,
    run: autoRunHinglish
  };

  // Wait for DOM to load before running
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    autoRunHinglish();
  } else {
    document.addEventListener('DOMContentLoaded', autoRunHinglish);
  }
})();
