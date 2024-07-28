

function add(x, y) {
    return x + y;
}

function curry(add) {
    return function(x) {
        return function(y) {
            return add(x, y);
        }
    }
}

// 实现一个add方法, 使计算结果能够满足以下预期
add(1)(2)(3) = 6
add(1,2,3)(4) = 10
add(1)(2)(3)(4)(5) = 15

function add(...args) {
  // 定义一个数组进行参数的存储
  var _args = Array.prototype.slice.call(args) 
  //  或者简单点，用一个空数组来存
  //  let nums = []; nums.push(...args);

  // 存储所有参数
  var _adder = function(...nextArgs) {
    _args.push(nextArgs)
    return _adder
  }

  // 利用toString的隐式转换的特性，进行结果计算并返回
  _adder.toString = function() {
    return _args.reduce((a, b) => a + b)
  }

  return _adder
}

//  上述思路通用curry实现
function currying(fn) {
  let _args = [], max = fn.length
  let closure = function (...args) {
    const context = this;
    // 先把参数加进去
    _args.push(...args)
    // 如果参数没满，返回闭包等待下一次调用
    if (_args.length < max) return closure.bind(context);
    // 传递完成，执行
    return fn.apply(context, ..._args)
  }
  return closure
}

function f() {
  const sum = Array.from(arguments).reduce((a, b) => a + b, 0);

  function curry() {
    return add(sum, ...nextArgs);
  }

  return curry;
}

function add(x, y, z) {
  return x+y+z
}

var curryAdd = currying(add)
curryAdd(1, 2)(3) // 6





// 在 JavaScript 中，this 的值取决于函数是如何被调用的。在 curry 函数中，this 的值是在 curry 函数被调用时确定的。然而，在返回的 curried 函数中，this 的值可能会在不同的上下文中被调用。
// 为了确保在 curried 函数及其后续调用中都能正确地使用 this，我们需要在 curried 函数内部捕获当前的 this 上下文。这样，无论 curried 函数在何处被调用，都能确保使用的是正确的 this 上下文。
// 因此，const context = this; 这行代码写在 curried 函数内部的第一行，是为了捕获并保存当前的 this 上下文，以便在后续的函数调用中使用。

function curry(func) {

    function curried(...args) {
      const context = this; // 保存当前的 this 上下文
      if (args.length >= func.length) {  // 函数对象有一个 length 属性，它表示函数声明时所需的参数个数
        return func.apply(context, args);
      } else {   // 参数数量没达到，就继续返回函数
        return function(...nextArgs) {
          return curried.apply(context, args.concat(nextArgs));
        };
      }
    };
    return curried;
}

    function add(a, b, c) {
        return a + b + c;
    }
  
  const curriedAdd = curry(add);
  
  console.log(curriedAdd(1, 2, 3)); // 输出: 6
  console.log(curriedAdd(1)(2, 3)); // 输出: 6
  console.log(curriedAdd(1)(2)(3)); // 输出: 6
  
  