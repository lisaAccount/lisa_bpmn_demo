

JSON.stringify() //  会忽略undefined、symbol和函数

function deepClone(obj, hash = new WeakMap()) {
    // 如果 obj 不是对象或是 null，直接返回 obj
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    // 处理循环引用
    if (hash.has(obj)) {
      return hash.get(obj);
    }
  
    // 处理 Date 对象
    if (obj instanceof Date) {
      return new Date(obj);
    }
  
    // 处理 RegExp 对象
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
  
    // 创建一个新的对象或数组
    const cloneObj = Array.isArray(obj) ? [] : {};
  
    // 将对象存储在 hash 中，以便处理循环引用
    hash.set(obj, cloneObj);
  
    // 遍历对象的属性
    for (let key in obj) {  // 专门用来遍历对象的，单数数组也能用，一般更推荐用for of 
      if (obj.hasOwnProperty(key)) {  // 数组同样适用这个方法
        // 递归拷贝每个属性
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
  
    return cloneObj;
  }