class TestClass {
  // This should trigger the 7-arg limit.
  constructor(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    this.arg4 = arg4;
    this.arg5 = arg5;
    this.arg6 = arg6;
    this.arg7 = arg7;
    this.arg8 = arg8;
    this.arg9 = arg9;
    this.arg10 = arg10;
  }

  // This should trigger the deprecation warning.
  /**
   * @deprecated use getArg1 instead.
   */
  getArg1Unsafe() {
    return this.arg1;
  }

  getArg1() {
    return this.arg1.trim();
  }

  // This should trigger the unused paramter warning.
  incrementArg2(value) {
    this.arg2++;
  }

  convertArg3ToString() {
    const arg3 = this.arg3;
    arg3.map((arg) => {
      // This should trigger the already declared in upper scope warning.
      const arg3 = arg;
      return arg3.toString();
    });
  }

  // This should trigger the cognitive complexity warning.
  generateAComplexObject() {
    if (this.arg5) {
      for (let i = 0; i < this.arg5; i++) {
        for (let j = 0; j < this.arg5; j++) {
          for (let k = 0; k < this.arg5; k++) {
            if (this.arg6 < i + j + k) {
              this.arg6 = i + j + k ?? 0;
            }
          }
        }
      }
    }
  }

  // This should trigger the "don't always return the same value" warning.
  getValueOfArg7() {
    if (this.arg7) {
      // Do nothing
    } else {
      return true;
    }

    return true;
  }

  assignToArg8(value) {
    // This should trigger the "useless assignment" warning.
    const intermediate = value;
  }

  calcArg9() {
    // This should trigger the "nested ternary" warning.
    this.arg9 = this.arg1 ? this.arg1 : this.arg2 ? this.arg2 : this.arg3;
  }

  cleanArg10() {
    // This should trigger the "regex should not contain multiple spaces" warning.
    this.arg10.replace(/  +g/, "");
  }

  isUrl(url) {
    // This should trigger the "use regex literal" warning.
    // This should trigger a complexity warning.
    // This should trigger a "use concise character class" warning.
    const checkUrlPattern = new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    );
    return checkUrlPattern.test(url);
  }

  processSomething(value) {
    // This should trigger a "remove commented code" warning.
    //return value.toString() + "-processed";
    return `${value}-processed`;
  }

  // This should trigger an "identical implementation" warning (see getArg1).
  getFirstArg() {
    return this.arg1.trim();
  }

  divide(divisor, dividend) {
    return divisor / dividend;
  }

  getRatio() {
    const divisor = 15;
    const dividend = 5;
    // This should trigger a "mixed up parameter order" warning.
    return this.divide(dividend, divisor);
  }

  doSomething() {
    // Should trigger the "super-linear runtime" security hotspot.
    const regForEveryWordCapitalize =
      /(^(\s*|[#"<>,':;*&^$%_@+=\`\-\(\)\[\]\{\}\|\\\/])\w|[\.\!\?\"\n]\s*\w)|^\s*\'\w/g;

    return this.arg1
      .toLowerCase()
      .replace(regForEveryWordCapitalize, function (c) {
        return c.toUpperCase();
      });
  }
}

class AnotherClass {
  // This should trigger the "use of http is insecure" security hotspot.
  healthCheckUrl = "http://some-insecure-health-check.com/health";
  credentials = {
    // This is a fake token from https://token.dev/ that should trigger a secret scanning issue.
    token:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkZha2UgVXNlciIsImFkbWluIjp0cnVlLCJpYXQiOjE2NTgxMzMzMzAsImV4cCI6MTY1ODEzNjkzMH0.bSUQsHa5_Q24KewFKNZDjuBJjdRhM_IRee2LqnRkS9I",
  };

  // This should trigger the empty constructor warning.
  constructor() {}

  performHealthCheck() {
    return fetch(this.healthCheckUrl, {
      headers: { Authorization: this.credentials.token },
    }).then((result) => result.ok);
  }
}

const temp = new TestClass(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// TODO: This should trigger a TODO warning. Also, not sure why this isn't triggering the deprecated warning?
// This should trigger the deprecation warning.
console.log("Arg 1 Unsafe: " + temp.getArg1Unsafe());
// This should trigger the void operator warning.
void temp.getValueOfArg7();

// "Exercising" all the other functions to make sure they're being analysed/scanned.
temp.incrementArg2(5);
temp.convertArg3ToString();
temp.generateAComplexObject();
temp.calcArg9();
temp.cleanArg10();
console.log("Is URL: " + temp.isUrl("http://some-insecure-url.com/"));
console.log("Process: " + temp.processSomething("myValue"));
console.log("First Arg: " + temp.getFirstArg());
console.log("Ratio: " + temp.getRatio());
console.log("Do Something: " + temp.doSomething());

const anotherTemp = new AnotherClass();
console.log("Health Check: " + anotherTemp.performHealthCheck());
