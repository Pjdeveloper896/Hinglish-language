
---

# 🇮🇳 Hinglish Programming Language – Full Tutorial

> Learn to code in Hinglish, a Hindi-English mixed programming language that works in the browser via a CDN. Inspired by simplicity, this language is built on top of JavaScript.

---

## 🚀 Getting Started

### 📦 CDN Include

Add this to your HTML file to use Hinglish:

```html
<script src="https://pjdeveloper896.github.io/Hinglish-language/hinglish.min.js"></script>
```

---

## 🧠 Basic Concepts

### 🖨️ Print to Console

```js
hinglish.likho("Namaste Duniya");
```

---

### 🧮 Variables

```js
hinglish.banao("naam", "Amit");
hinglish.likho(hinglish.lelo("naam")); // Output: Amit
```

---

### 🔄 Update Variables

```js
hinglish.badlo("naam", "Ravi");
```

---

## 📏 Conditions: `agar`

```js
hinglish.agar(hinglish.lelo("age") >= 18, 
  () => hinglish.likho("Adult ho"),
  () => hinglish.likho("Bachcha ho")
);
```

---

## 🔁 Loops: `ghoom`

```js
hinglish.ghoom(0, 5, 1, (i) => {
  hinglish.likho("Number: " + i);
});
```

---

## 🔧 Functions

```js
hinglish.banaoFunction("namaste", () => {
  hinglish.likho("Namaste Bharat");
});

hinglish.chalaoFunction("namaste");
```

---

## 📦 Arrays

```js
hinglish.banao("fruits", ["seb", "kela", "aam"]);
hinglish.likho(hinglish.lelo("fruits")[1]); // Output: kela
```

---

## 📦 Objects

```js
hinglish.banao("insaan", { naam: "Ravi", umar: 25 });
hinglish.likho(hinglish.lelo("insaan").naam);
```

---

## 🏗️ DOM Manipulation

```js
dom.addKaro("Hello", "h1", "heading");
dom.likhoInner("#heading", "Naya Title");
dom.setAttr("#heading", "class", "titleClass");
```

---

## 🖱️ Events

```js
events.lagaEvent("#btn", "click", () => {
  hinglish.likho("Button dabaya gaya");
});

events.lagaSabko(".box", "click", (e) => {
  hinglish.likho("Box pe click hua: " + e.target.innerText);
});
```

---

## ⏰ DateTime Module

```js
const date = new HinglishDateTime();
hinglish.likho(date.aaj()); // 2025-05-11
```

---

## 🔄 Async Module

```js
const async = new HinglishAsync();

// Delay with timeout
async.setTimeoutHinglish(() => {
  hinglish.likho("3 seconds baad likha");
}, 3000);

// Fetch Example
async.banaoAsync("loadData", async () => {
  const data = await async.leAao("https://jsonplaceholder.typicode.com/posts/1");
  hinglish.likho(data.title);
});

await async.chalaoFunction("loadData");
```

---

## ✅ Real HTML Example

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://pjdeveloper896.github.io/Hinglish-language/hinglish.min.js"></script>
<script src="https://pjdeveloper896.github.io/Hinglish-language/Hind/Hpm/Hingasync.js "></script>
<script src="https://pjdeveloper896.github.io/Hinglish-language/Hind/Hpm/Date-math.js"></script>
</head>
<body>
  <h2 id="demo">Shuruat ho gayi...</h2>
  <script>
    hinglish.banao("naam", "ChatGPT");
    dom.likhoInner("#demo", "Namaste, " + hinglish.lelo("naam"));

    const date = new HinglishDateTime();
    dom.addKaro("Aaj: " + date.aaj(), "p");

    const async = new HinglishAsync();
    async.setTimeoutHinglish(() => {
      dom.addKaro("3 seconds baad!", "p");
    }, 3000);
  </script>
</body>
</html>
```

---

## 📘 Advanced Features (Coming Soon)

* Classes
* Modules (`importKaro`)
* Async `await` inside functions
* AI-based `banao app "..."` integration

---
