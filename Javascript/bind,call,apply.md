####  手动实现
```javascript
Function.prototype.myCall = function (context, ...args){
    context = context || window
    // 这里的 this 是指向 fn 的，通过 this 就可以获取 fn，context 是我们的 obj，可以直接给 obj 添加一个函数属性
    context.fn = this
    delete context.fn(...args) //防止属性污染
    return
}
```
上述代码没有考虑**基本类型的情况**，原生的 call 函数也可以处理基本类型。

#### Function.prototype.apply()
* 语法
  参数为**数组形式**
``` javascript
  apply(thisArg)
  apply(thisArg, argsArray)
```

* 返回值
使用指定的 this 值和参数调用函数的结果。

#### Function.prototype.call()
* 语法
  参数逐个给出
``` javascript
call(thisArg)
call(thisArg, arg1)
call(thisArg, arg1, arg2, /* …, */ argN)
```

* 返回值
使用指定的 this 值和参数调用函数的结果。

#### Function.prototype.bind()
* 语法
  参数逐个给出
``` javascript
call(thisArg)
call(thisArg, arg1)
call(thisArg, arg1, arg2, /* …, */ argN)
```

* 返回值
使用指定的 this 值和初始参数（如果提供）创建的**给定函数的副本**。也就是会返回一个复制的新的函数。