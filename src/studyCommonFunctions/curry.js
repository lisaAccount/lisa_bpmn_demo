

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


// 在 JavaScript 中，this 的值取决于函数是如何被调用的。在 curry 函数中，this 的值是在 curry 函数被调用时确定的。然而，在返回的 curried 函数中，this 的值可能会在不同的上下文中被调用。
// 为了确保在 curried 函数及其后续调用中都能正确地使用 this，我们需要在 curried 函数内部捕获当前的 this 上下文。这样，无论 curried 函数在何处被调用，都能确保使用的是正确的 this 上下文。
// 因此，const context = this; 这行代码写在 curried 函数内部的第一行，是为了捕获并保存当前的 this 上下文，以便在后续的函数调用中使用。

function curry(func) {
    return function curried(...args) {
      const context = this; // 保存当前的 this 上下文
      if (args.length >= func.length) {  // 函数对象有一个 length 属性，它表示函数声明时所需的参数个数
        return func.apply(context, args);
      } else {   // 参数数量没达到，就继续返回函数
        return function(...nextArgs) {
          return curried.apply(context, args.concat(nextArgs));
        };
      }
    };
}

    function add(a, b, c) {
        return a + b + c;
    }
  
  const curriedAdd = curry(add);
  
  console.log(curriedAdd(1, 2, 3)); // 输出: 6
  console.log(curriedAdd(1)(2, 3)); // 输出: 6
  console.log(curriedAdd(1)(2)(3)); // 输出: 6
  
  