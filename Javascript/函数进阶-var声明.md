## 老旧的“var”

#### var允许重复声明
使用 `var`，可以重复声明一个变量，不管多少次都行。**对一个已经声明的变量使用 `var`，这条新的声明语句会被忽略**：
但随后的赋值有效
```
var user = "Pete";

var user = "John"; // 这个 "var" 无效（因为变量已经声明过了）
// ……不会触发错误

alert(user); // John 赋值有效
```

#### “var” 声明的变量，可以在其声明语句前被使用
**声明会被提升，但是赋值不会。**

#### IIFE “立即调用函数表达式”（immediately-invoked function expressions，IIFE）
…………
JavaScript 不允许立即调用函数声明：
```
// 下面的括号会导致语法错误
function go() {

}(); // <-- 不能立即调用函数声明
```

因此，需要使用圆括号把该函数表达式包起来，以告诉 JavaScript，这个函数是在另一个表达式的上下文中创建的，因此它是一个**函数表达式**：它不需要函数名，可以立即调用。
除了使用括号，还有其他方式可以告诉 JavaScript 在这我们指的是函数表达式：
```
// 创建 IIFE 的方法，将函数声明的立即调用转换为表达式

( function(){
    console.log("IIFE");
} ) ();

( function(){
    console.log("IIFE");
}() );

! function(){
    console.log("IIFE");
}();

+ function(){
    console.log("IIFE");
}();

var sum = function(a,b){
    return a+b
}(1,2);
```
再次注意：如今我们没有理由来编写这样的代码。

#### 例题
分析以下代码输出：
```
var foo = {n:1};
(function(foo){
    console.log(foo.n);
    foo.n = 3;
    var foo = {n:2};
    console.log(foo.n);
})(foo);
console.log(foo.n);
```
考察声明、形参实参、引用类型变量
解答：1 2 3