console.log("1");
setTimeout(function() { console.log("2"); }, 0);
Promise.resolve().then(function() { console.log("3"); });
console.log("4");

// 1 - no async operations, 4 - no async operations, 3 - async operation, microtask queue, 2 - async, callback queue