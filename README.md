# Hinglish-language
This is a new language created by me 
to use this copy config.js and create new javascript file as Config.js and then then paste it.
alse link this Config.js  with your html and add nes script tag with type attribute with text/hinglish.
now you are ready to write this new language 
Got it! Here's your updated `README.md` without the license section:

---

# Hinglish Programming Language (Browser Interpreter)

**Hinglish** is a custom interpreted programming language that lets you write code using Hindi-English keywords. This browser-based interpreter allows execution of `.hl` scripts directly in the browser via `<script type="text/hinglish">`.

---

## Features

- Variables with `banao`
- Print to console with `likho`
- If-else statements with `agar` and `warna`
- For loops with `loopKaro(init; condition; increment)`
- Functions using `kaam` keyword
- DOM text and style manipulation
- Event handling with `jab`
- Classes and object instantiation
- Code import from other files
- AI app command using `banao app`

---

## Quick Example

```hinglish
banao naam = "Duniya"
likho "Hello " + naam

kaam bolaKaro(msg) {
    likho msg
}
bolaKaro("Namaste!")

class Aadmi {
    this.naam = arguments[0]
    this.swaagat = function() {
        likho "Namaste " + this.naam
    }
}

banao main = new Aadmi("Lakshmi")
main.swaagat()

agar (naam === "Duniya") {
    likho "Yeh Duniya hai"
} warna {
    likho "Kuch aur hai"
}
```

---

## How to Use

### 1. Include Script

```html
<script src="hinglish.js"></script>
```

### 2. Add Hinglish Code

```html
<script type="text/hinglish">
    likho "Hinglish shuru ho gaya"
</script>
```

---

## Language Syntax Reference

| Hinglish Keyword | Description |
|------------------|-------------|
| `banao naam = value` | Create variable |
| `likho expression` | Print to console |
| `kaam naam(args) { ... }` | Define function |
| `naam(args)` | Call function |
| `loopKaro(init; condition; increment) { ... }` | For loop |
| `agar (condition) { ... } warna { ... }` | If-Else |
| `badloText "id" "text"` | Change element text |
| `badlo "id" styleProperty "value"` | Change element style |
| `jab "event" ₹ "id" { ... }` | Event listener |
| `class ClassName { ... }` | Define class |
| `banao obj = new ClassName(args)` | Instantiate object |
| `import "path/to/code.hl"` | Import Hinglish file |
| `banao app "idea"` | AI app trigger (placeholder) |

---

## DOM Integration

The interpreter allows direct DOM manipulation and event binding:

```hinglish
badloText "output" "Namaste Duniya"
jab "click" ₹ "btn" {
    likho "Button dabaya gaya!"
}
```

---

## File Structure

- `hinglish.js` - Main interpreter
- `.hl` files - Optional separate Hinglish script files to import

---

## Roadmap

- [x] Variables, loops, functions, conditionals
- [x] DOM and event support
- [x] Classes and objects
- [x] Module importing
- [x] AI integration command (`banao app`)
- [ ] Lambda functions & recursion
- [ ] Arrays and objects
- [ ] Async API calls
- [ ] Full IDE support and debugging

---


