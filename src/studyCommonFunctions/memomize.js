//  缓存函数
function memomize(fn, content) {
    let cache = {};
    const self = content || this;
    return (...args) => {
        const key = JSON.stringify(args);
        if(cache[key]) {
            return cache[key];
        } else {
            return fn.apply(self, args);
        }
    }
}

//  应用： 密集型函数，斐波那些
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  const memoizedFibonacci = memoize(fibonacci);
  
  console.log(memoizedFibonacci(40)); // 输出: 102334155
  
