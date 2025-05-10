

---


# 💥 Hinglish Programming Language Runtime: Code Ka Tadka

Welcome to Hinglish — the ultimate blend of Hindi and English, making programming fun, intuitive, and a little bit desi! Say goodbye to boring syntax and hello to a language that feels like home.

---

## 🚀 CDN Usage

Add Hinglish magic to your project with this simple script tag:

```html 
<script src="https://pjdeveloper896.github.io/Hinglish-language/dist/hinglish.js"></script>
```

That's it! No need for complicated setups. Your Hinglish code is ready to rock and roll.

---

## 💡 API Reference: Get Ready to Break the Code Barrier

Here’s how Hinglish helps you code with style:

### 🔹 Hinglish Core

| Command                                | Description                                        |
| -------------------------------------- | -------------------------------------------------- |
| `hinglish.likho(cheez)`                | Print something out loud, or well, to the console  |
| `hinglish.banao(naam, value)`          | Declare a variable. No complex syntax, just banao! |
| `hinglish.badlo(naam, value)`          | Update your variable and watch it transform.       |
| `hinglish.lelo(naam)`                  | Grab the current value of any variable.            |
| `hinglish.agar(shart, haanFn, nahiFn)` | If condition, but Hinglish style.                  |
| `hinglish.ghoom(start, end, step, fn)` | Loop it up, Hinglish-style!                        |

### 🔹 DOM Functions: Add, Change, and Remove in Style

Use `dom` to make your webpage feel alive:

| Command                              | Description                                 |
| ------------------------------------ | ------------------------------------------- |
| `dom.addKaro(innerHTML, tag, id?)`   | Add elements — the Hinglish way!            |
| `dom.likhoInner(selector, text)`     | Change the inner content of an element.     |
| `dom.setAttr(selector, attr, value)` | Set attributes like a boss.                 |
| `dom.getAttr(selector, attr)`        | Retrieve an element’s attribute.            |
| `dom.hatao(selector)`                | Remove the element like it was never there. |

### 🔹 Events: Let’s Interact

Your web page needs some action, right? Well, events got you covered:

| Command                                 | Description                              |
| --------------------------------------- | ---------------------------------------- |
| `events.lagaEvent(selector, event, fn)` | Attach an event to a single element      |
| `events.lagaSabko(selector, event, fn)` | Attach an event to all matching elements |

---

## ✨ Example: The Desi Counter App

Here’s a cool example that counts your clicks and prints the result in Hinglish:

### 💻 Full HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hinglish Counter Example</title>
</head>
<body>

  <button id="gintiBtn">Ginti Badhao</button>
  <div id="gintiValue">Ginti: 0</div>

  <script src="https://yourusername.github.io/hinglish-runtime/hinglish.js"></script>

  <script>
    hinglish.banao("ginti", 0);

    events.lagaEvent("#gintiBtn", "click", () => {
      const abhi = hinglish.lelo("ginti");
      hinglish.badlo("ginti", abhi + 1);
      dom.likhoInner("#gintiValue", "Ginti: " + hinglish.lelo("ginti"));
    });
  </script>

</body>
</html>
```

### What’s Happening Here:

1. We declared a variable called `ginti` (that’s "count" in Hinglish).
2. When the button is clicked, `ginti` is incremented, and the result is updated in the `gintiValue` div.
3. It's simple, it's easy, and it’s *very Hinglish*.

---

## 💥 Why Hinglish?

* **User-Friendly**: Feel at home while coding, with a syntax that’s a mix of Hindi and English.
* **Quick Setup**: Drop in the CDN and start coding, no extra configurations needed.
* **Flexible & Powerful**: Whether you're making a small project or a big app, Hinglish gives you full control without the unnecessary complexity.

---

## 🛠️ Contribute: Let's Make Hinglish Even Better!

Hinglish is always evolving, and you can be a part of its growth! Whether you're fixing bugs, adding new features, or creating localized commands, your contribution will make Hinglish even better. Fork the repo, make your magic happen, and send a PR!

---

Got questions, feedback, or an idea for a new command? [Open an issue](https://pjdeveloper896.github.io/Hinglish-language/issues) or just drop us a line.

---

Let’s code like never before, with Hinglish! 🚀

```

---

```
> Hinglish using cli


---


# Hinglish Programming Language (Python Interpreter via CDN)

This is a simple CLI-based interpreter for the Hinglish Programming Language. You can run Hinglish code using a `.hl` file or interactively in the console — without downloading the interpreter manually!

---

## 🔗 Run via Python and GitHub CDN

> ✅ Works on Android, Linux, Termux, Windows (with Python installed)

### 📦 Requirements

- Python 3
- `requests` module

Install `requests` if not installed:

```bash
pip install requests
```

---

## 🚀 Quick Start (Console Mode)

Create a file named `hinglish_cdn.py` with the following code:

```python
import sys
import requests
import subprocess
import os

# URL of the Hinglish interpreter hosted on GitHub Pages
script_url = 'https://pjdeveloper896.github.io/Hinglish-language/dist/Hinglish.py'

def download_script():
    try:
        response = requests.get(script_url)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error downloading the script: {e}")
        sys.exit(1)

def execute_script(script_content):
    try:
        temp_file = 'Hinglish.py'
        with open(temp_file, 'w') as file:
            file.write(script_content)

        subprocess.run(['python', temp_file, '--console'], check=True)
        os.remove(temp_file)
    except subprocess.CalledProcessError as e:
        print(f"Error executing the script: {e}")
        sys.exit(1)

def main():
    print("Downloading Hinglish Interpreter...")
    script_content = download_script()
    
    print("Running Hinglish Interpreter...")
    execute_script(script_content)

if __name__ == '__main__':
    main()
```

### 🧪 Run it!

```bash
python hinglish_cdn.py
```

---

## 📂 Run Hinglish Code from File (`.hl`)

Save your Hinglish code in a file, for example `example.hl`:

```hl
ghoom 3
agar true
meraNaam
```

Then modify the Python script to pass your `.hl` file like this:

```python
subprocess.run(['python', temp_file, '--file', 'example.hl'], check=True)
```

Or run it manually after download:

```bash
python Hinglish.py --file example.hl
```

---

## 📁 Hinglish Syntax Examples

```hl
# Conditional (agar)
agar true
# Output: Condition met!

agar false
# Output: Condition not met.

# Loop (ghoom)
ghoom 5
# Output: Loop iteration. (x5)

# Variable-like identifier
meraNaam
# Output: Variable: meraNaam
```

---

## 🌐 CDN Used

[Hinglish Interpreter Python File](https://pjdeveloper896.github.io/Hinglish-language/dist/Hinglish.py)

---

## 🧠 Author

Created by [@pjdeveloper896](https://github.com/pjdeveloper896)

---
