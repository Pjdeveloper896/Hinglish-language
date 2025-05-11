
---

# 📘 Hinglish Modules Documentation

## 🧩 Modules: `HinglishDateTime` & `HinglishAsync`

### 🔗 CDN Include

```html
<script src="https://pjdeveloper896.github.io/Hinglish-language/Hind/Hpm/Hingasync.js "></script>
<script src="https://pjdeveloper896.github.io/Hinglish-language/Hind/Hpm/Date-math.js"></script>
```

---

## ⏰ HinglishDateTime Module

### 👉 Object banao:

```js
const date = new HinglishDateTime();
```

### 🧪 Functions:

| Hinglish Syntax                 | Kaam kya karta hai                     |
| ------------------------------- | -------------------------------------- |
| `date.aaj()`                    | Aaj ki tareekh (YYYY-MM-DD)            |
| `date.abhi()`                   | Abhi ka samay (HH\:MM\:SS)             |
| `date.pooraSamay()`             | Date + Time dono ek sath               |
| `date.dinKaNaam()`              | Aaj ka weekday jaise "Sunday"          |
| `date.mahineKaNaam()`           | Mahine ka naam jaise "May"             |
| `date.customDate("YYYY-MM-DD")` | Date ko readable format me badalta hai |
| `date.customTime("HH:MM:SS")`   | Time ko 12-hour format me badalta hai  |

### 🧪 Example:

```js
likho(date.aaj()); // 2025-05-11
likho(date.abhi()); // 15:23:00
likho(date.pooraSamay()); // 2025-05-11 15:23:00
likho(date.dinKaNaam()); // Sunday
likho(date.mahineKaNaam()); // May
likho(date.customDate("2025-08-15")); // 15 August 2025
likho(date.customTime("14:30:00")); // 02:30 PM
```

---

## 🔄 HinglishAsync Module

### 👉 Object banao:

```js
const async = new HinglishAsync();
```

### 🕒 Timers:

| Hinglish Syntax                     | Kaam kya karta hai           |
| ----------------------------------- | ---------------------------- |
| `async.setTimeoutHinglish(fn, ms)`  | Delay ke baad kaam karo      |
| `async.setIntervalHinglish(fn, ms)` | Har interval par repeat karo |
| `async.clearIntervalHinglish(id)`   | Interval band karo           |

### 🔍 Fetch API:

| Hinglish Syntax          | Kaam kya karta hai        |
| ------------------------ | ------------------------- |
| `await async.leAao(url)` | JSON API data le aata hai |

### ⌛ Delay Utility:

| Hinglish Syntax        | Kaam kya karta hai                   |
| ---------------------- | ------------------------------------ |
| `await async.ruko(ms)` | Execution rokta hai kuch der ke liye |

### 🧠 Promises:

| Hinglish Syntax                            | Kaam kya karta hai                         |
| ------------------------------------------ | ------------------------------------------ |
| `async.promiseAllHinglish([...promises])`  | Saare promises ka result ek saath deta hai |
| `async.promiseRaceHinglish([...promises])` | Pehla complete hone wala promise return    |

### 💾 Storage:

| Hinglish Syntax               | Kaam kya karta hai                    |
| ----------------------------- | ------------------------------------- |
| `async.setItem("key", value)` | LocalStorage me value store karta hai |
| `async.getItem("key")`        | Value wapas laata hai                 |
| `async.removeItem("key")`     | Storage se hataata hai                |

### 📞 Custom Async Functions:

| Hinglish Syntax                               | Kaam kya karta hai          |
| --------------------------------------------- | --------------------------- |
| `async.banaoAsync("naam", asyncFn)`           | Function register karta hai |
| `await async.chalaoFunction("naam", ...args)` | Function run karta hai      |

---

### 🧪 Hinglish-style Example:

```js
async.banaoAsync("postLao", async () => {
  const data = await async.leAao("https://jsonplaceholder.typicode.com/posts/1");
  likho(data.title);
});

await async.chalaoFunction("postLao");
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
  <h2 id="info">Loading...</h2>
  <script>
    const hinglish = new Hinglish();
    const async = new HinglishAsync();
    const date = new HinglishDateTime();

    dom.likhoInner("#info", `Aaj hai ${date.aaj()} aur samay hai ${date.abhi()}`);

    async.setTimeoutHinglish(() => {
      dom.likhoInner("#info", "3 second ke baad yeh likha");
    }, 3000);
  </script>
</body>
</html>
```

---
