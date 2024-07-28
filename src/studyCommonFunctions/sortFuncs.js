

//  快排

function quickSort(arr) {
    if(arr.length < 2) return arr;
    let leftArr = [], rightArr = [];
    const mid = Math.floor(arr.length / 2);
    const midVal = arr[mid];

    //  不建议用forEach, 具体为啥我也没太搞懂，反正就是说不能跳过这个基准索引啥的
    // arr.forEach((v, index) => {   
    //     if(index === mid) return;
    //     v > midVal ? rightArr.push(v) : leftArr.push(v);
    // });

    for (let i = 0; i < arr.length; i++) {
        if (i !== Math.floor(arr.length / 2)) { // 排除枢轴
          if (arr[i] < pivot) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);
          }
        }
      }
    
    return quickSort(leftArr).concat(midVal, quickSort(rightArr));
}

//  归并

function merge(left, right) {
    let result = [];
    let lIndex = 0, rIndex = 0;
    while(lIndex < left.length && rIndex < right.length) {
        if(left[lIndex] < right[rIndex]) {
            result.push(left[lIndex]);
            lIndex++;
        } else {
            result.push(right[rIndex]);
            rIndex++;
        }
    }
    return result.concat(left.slice(lIndex), right.slice(rIndex));
}

function mergeSort(arr) {
    if(arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}

//  插入

function insertSort(arr) {
    if(arr.length < 2) return arr;
    for(let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        while(j >= 0 && arr[j] > current) { // 这个while循环保证了一定要找到最后一个比当前current大的数，也就是找到最终要插入的位置
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

//  冒泡
function bubbleSort(array) {
    let n = array.length;
    
    // 外层循环控制冒泡的轮数
    for (let i = 0; i < n - 1; i++) {
      // 内层循环控制每一轮冒泡过程
      for (let j = 0; j < n - 1 - i; j++) {
        // 比较相邻元素，如果前面的元素大于后面的元素，进行交换
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]]; // 使用解构赋值进行交换
        }
      }
    }
    
    return array;
  }




