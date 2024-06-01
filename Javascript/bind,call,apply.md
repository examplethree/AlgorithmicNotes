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