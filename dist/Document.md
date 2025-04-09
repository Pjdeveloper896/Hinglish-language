
---

# **Hinglish Language Documentation**

A desi, beginner-friendly language to write JavaScript-style code in Hinglish syntax! Supports variables, functions, DOM manipulation, classes, event listeners (even delegated), and more.

---

## **1. Output**

```hinglish
likho "Namaste Duniya!"
```
Prints to console.

---

## **2. Variables**

```hinglish
banao naam = "Ravi"
banao umar = 25
```

---

## **3. Conditions (If-Else)**

```hinglish
agar (umar > 18) {
  likho "Adult"
}
warna {
  likho "Minor"
}
```

---

## **4. Loops**

```hinglish
loopKaro (banao i = 0; i < 5; i = i + 1) {
  likho i
}
```

---

## **5. Functions**

```hinglish
kaam bolNaam(naam) {
  likho "Namaste " + naam
}

bolNaam("Ravi")
```

---

## **6. Classes & Objects**

```hinglish
class Aadmi {
  this.kaam = "developer"
}

banao ravi = new Aadmi()
likho ravi.kaam
```

---

## **7. DOM Manipulation**

### **Change Style:**

```hinglish
badlo "btn1" background-color "red"
```

### **Change Text:**

```hinglish
badloText "msg" "Swagat hai!"
```

---

## **8. Event Listeners – `eventLaga`**

### **Basic Listener:**

```hinglish
eventLaga "click" ₹ "btn1" {
  likho "Button dabaya"
}
```

### **Multiple Events:**

```hinglish
eventLaga ["click", "mouseover"] ₹ "btn1" {
  likho "Clicked ya hover kiya"
}
```

### **Delegated Event Listener:**

```hinglish
eventLaga "click" ₹@ "dynamicBtn" {
  likho "Dynamic element click hua!"
}
```

- `₹@` is used for **delegated events** via `document`
- `event` object is available inside the block

---

## **9. Async Fetch**

```hinglish
banao data = await fetchKaro("https://api.example.com/data")
likho data
```

---

## **10. Import External Code**

```hinglish
import "https://example.com/utils.hl"
```

---

## **11. AI App Generator (Experimental)**

```hinglish
banao app "todo list"
```

Triggers an alert simulating AI-generated app creation. (Extendable with real AI APIs.)

---

## **12. Advanced**

- `this` works inside classes
- Function context supports variables and arguments
- Supports JavaScript expressions: `Math.random()`, `arr.length`, etc.
- Uses `eval` internally — write powerful expressions safely!

---

## **13. Tips & Tricks**

- Use `event` inside `eventLaga` blocks to access the actual DOM event
- `likho` is your best friend for debugging
- Keep functions short and Hinglish-style for fun!

---

## **Coming Soon / Ideas**

- `banaoElement` to create elements dynamically
- `jodo` to append to DOM
- `setTimeout`, `setInterval` in Hinglish
- `try/catch` blocks
- File/module system with `import/export`
- AI-assisted code generation with APIs like OpenAI/Gemini

---

