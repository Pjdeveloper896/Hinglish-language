class HinglishAsync {
  constructor() {
    this.functions = {};
    this.asyncFunctions = {};
  }

  // ✅ Create and store async functions
  banaoAsync(naam, asyncFn) {
    this.asyncFunctions[naam] = asyncFn;
  }

  // ✅ Call any registered async or normal function
  async chalaoFunction(naam, ...args) {
    if (this.asyncFunctions[naam]) {
      return await this.asyncFunctions[naam](...args);
    } else {
      console.error(`Async Function '${naam}' nahi mili.`);
    }
  }

  // ✅ Fetch JSON data from an API
  async leAao(url) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  }

  // ✅ Await any custom promise
  async intezaarKaro(promise) {
    try {
      return await promise;
    } catch (err) {
      console.error("Async error:", err);
      return null;
    }
  }

  // ✅ Simple delay (for demo/testing)
  ruko(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ✅ Set a timeout (like setTimeout)
  setTimeoutHinglish(callback, delay) {
    return setTimeout(callback, delay);
  }

  // ✅ Set an interval (like setInterval)
  setIntervalHinglish(callback, interval) {
    return setInterval(callback, interval);
  }

  // ✅ Clear the interval (like clearInterval)
  clearIntervalHinglish(intervalId) {
    clearInterval(intervalId);
  }

  // ✅ LocalStorage methods (get, set, remove)
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }

  // ✅ Promise.all (run multiple promises simultaneously)
  async promiseAllHinglish(promises) {
    try {
      return await Promise.all(promises);
    } catch (err) {
      console.error("Promise.all error:", err);
      return null;
    }
  }

  // ✅ Promise.race (run promises, first to resolve wins)
  async promiseRaceHinglish(promises) {
    try {
      return await Promise.race(promises);
    } catch (err) {
      console.error("Promise.race error:", err);
      return null;
    }
  }
}

// Export to window for CDN
window.HinglishAsync = HinglishAsync;
