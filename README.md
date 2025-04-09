# Hinglish Programming Language (Stable)

Welcome to the official documentation for the **Hinglish Programming Language** – a beginner-friendly, Hindi-English hybrid language designed for intuitive coding.

## CDN Link
Include this in your HTML file:
```html
<script src="https://pjdeveloper896.github.io/Hinglish-language/hinglish.min.js"></script>
```

---

## 1. Basic Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hinglish App</title>
  <script src="https://pjdeveloper896.github.io/Hinglish-language/hinglish.min.js"></script>
</head>
<body>
  <button id="btn1">Click Me</button>
  <script type="text/hinglish">
    likho "Hinglish loaded!"

    jabKaro "click" ₹ "btn1" {
      likho "Button dabaya"
      badloText "btn1" "Dubaara mat dabao"
    }
  </script>
</body>
</html>
```

---

## 2. Syntax Reference
```hinglish
likho "Hello world"
banao naam = "Amit"
badlo "btn1" background-color "red"
badloText "btn1" "Naya text"
```

---

## 3. Event Listeners
### Direct:
```hinglish
jabKaro "click" ₹ "btn1" {
  likho "Click hua"
}
```
### Delegated:
```hinglish
jabKaro "click" ₹@"dynamicBtn" {
  likho "Dynamic button dabaya"
}
```

---

## 4. Conditional
```hinglish
agar (x > 5) {
  likho "Bada hai"
} warna {
  likho "Chhota ya barabar hai"
}
```

---

## 5. Loop
```hinglish
loopKaro(i = 0; i < 5; i++) {
  likho i
}
```

---

## 6. Functions
```hinglish
kaam greet(naam) {
  likho "Hello " + naam
}

greet("Amit")
```

---

## 7. Classes and Objects
```hinglish
class Aadmi {
  constructor() {
    this.naam = "Hero"
    likho "Ek aadmi bana"
  }

  kaam bol() {
    likho this.naam + " bol raha hai"
  }
}

banao insaan = new Aadmi()
insaan.bol()
```

---

## 8. Arrays and Objects
```hinglish
banao fruits = ["seb", "kela", "aam"]
likho fruits[1]

banao aadmi = {
  naam: "Ravi",
  umr: 25
}

likho aadmi.naam
```

---

## 9. Import External Hinglish File
```hinglish
import "https://example.com/mera-code.hl"
```

---

## 10. Fetch API with Async/Await
```hinglish
kaam loData() {
  banao data = await fetchKaro("https://jsonplaceholder.typicode.com/todos/1")
  likho data.title
}

loData()
```

---

## 11. AI App Generation
```hinglish
banao app "todo list"
```

---

## Deployment Tips
- Wrap Hinglish code inside `<script type="text/hinglish">`.
- Code runs automatically after `DOMContentLoaded`.
- Interpreter supports full JS-like behavior: variables, classes, arrays, async/await, DOM, AI, and more.

---

## FAQ

**Q: Do I need to run any JS manually?**  
A: No, the Hinglish interpreter auto-executes your code after the DOM is ready.

**Q: Can I use Hinglish with frameworks like React or Vue?**  
A: Hinglish is best suited for vanilla HTML/JS projects.

**Q: Can I contribute?**  
A: Yes! Fork the repo and submit a PR with your improvements.

---

## Changelog

**v1.0.0**  
- Initial public release with full feature support
- Stable CDN
- AI app generation feature

---

## Troubleshooting

**Problem:** Hinglish code doesn't run.  
**Solution:** Ensure `<script src=".../hinglish.min.js">` is included and your Hinglish code is inside `<script type="text/hinglish">`.

**Problem:** Import doesn't work.  
**Solution:** Make sure the external `.hl` file has CORS headers and is publicly accessible.

---

**Made with love for developers who think in Hinglish.**
