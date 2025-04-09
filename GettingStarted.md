# Hinglish Programming Language Documentation

Hinglish is a custom programming language that lets you write JavaScript-like code using Hindi-English keywords. It works directly in the browser and supports variables, functions, classes, loops, conditionals, DOM manipulation, and more.

## Getting Started

Include the Hinglish interpreter using this CDN link:

```html
<script src="https://pjdeveloper896.github.io/Hinglish-language/dist/hinglish.js"></script>
```

Then include your Hinglish code in a script tag like this:

```html
<script id="hinglish-code" type="text/hinglish">
  likho "Hello from Hinglish!"
</script>

<script>
  // Wait for interpreter to load
  window.addEventListener("load", () => {
    const code = document.getElementById("hinglish-code").textContent;
    if (window.executeHinglishCode) {
      executeHinglishCode(code);
    } else {
      console.error("Hinglish interpreter not loaded.");
    }
  });
</script>
```

## Features

### Variables
```hinglish
banao x = 10
banao name = "Amit"
```

### Print to Console
```hinglish
likho "Hello, world!"
likho x + 5
```

### If/Else Conditions
```hinglish
agar (x > 5) {
  likho "Bada hai"
} warna {
  likho "Chhota ya barabar hai"
}
```

### Loops
```hinglish
loopKaro(i = 0; i < 5; i = i + 1) {
  likho i
}
```

### Functions
```hinglish
kaam greet(name) {
  likho "Namaste " + name
}

greet("Ravi")
```

### Classes and Objects
```hinglish
class Aadmi {
  likho "Object bana"
}

banao insaan = new Aadmi()
```

### DOM Manipulation
```hinglish
badlo "title" color "red"
badloText "title" "Naya Title"
```

### Event Listeners
```hinglish
jab "click" ₹ "btn" {
  likho "Button dabaya"
}
```

### Importing Other Hinglish Files
```hinglish
import "./dosra-file.hl"
```

### Fetch API
```hinglish
banao data = fetchKaro("https://jsonplaceholder.typicode.com/todos/1")
likho data.title
```

### AI App Generator (Planned Feature)
```hinglish
banao app "todo list"
```

> This will trigger an alert for now. Future versions will generate real apps using AI.

---

Visit the live demo:
**[Hinglish Language on GitHub Pages](https://pjdeveloper896.github.io/Hinglish-language/)**

For full examples and source code, see:
**[GitHub Repository](https://github.com/pjdeveloper896/Hinglish-language)**
