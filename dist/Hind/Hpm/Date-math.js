// DateHinglish Module
class DateHinglish {
  abhi() {
    return new Date();
  }

  milisek(deet) {
    return deet.getTime();
  }

  saal(deet) {
    return deet.getFullYear();
  }

  mahina(deet) {
    return deet.getMonth() + 1;
  }

  din(deet) {
    return deet.getDate();
  }

  ghanta(deet) {
    return deet.getHours();
  }

  minute(deet) {
    return deet.getMinutes();
  }

  second(deet) {
    return deet.getSeconds();
  }

  poora(deet) {
    return deet.toLocaleString();
  }
}

// MathHinglish Module
 class MathHinglish {
  jod(a, b) {
    return a + b;
  }

  ghat(a, b) {
    return a - b;
  }

  guna(a, b) {
    return a * b;
  }

  bhaag(a, b) {
    return a / b;
  }

  power(a, b) {
    return Math.pow(a, b);
  }

  jadh(a) {
    return Math.sqrt(a);
  }

  random() {
    return Math.random();
  }

  round(a) {
    return Math.round(a);
  }

  floor(a) {
    return Math.floor(a);
  }

  ceil(a) {
    return Math.ceil(a);
  }

  max(...nums) {
    return Math.max(...nums);
  }

  min(...nums) {
    return Math.min(...nums);
  }
}
