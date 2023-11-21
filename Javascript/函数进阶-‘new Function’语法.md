## 不形成闭包的函数
* 闭包涉及到的数据结构
所有的函数在“诞生”时都会记住 **创建它们的词法环境**。从技术上讲，这里没有什么魔法：所有函数都有名为 `[[Environment]]` 的隐藏属性，该属性保存了对创建该函数的词法环境的引用。

但是如果使用 `new Function` 创建一个函数，那么该函数的 `[[Environment]]` 并不指向当前的词法环境，而是指向 *全局环境*。  
因此，此类函数无法访问外部（outer）变量，只能访问全局变量。

## 如果这个函数能够访问外部（outer）变量会怎么样？
问题在于，在将 JavaScript 发布到生产环境之前，需要使用 压缩程序（minifier） 对其进行压缩 —— 一个特殊的程序，通过删除多余的注释和空格等压缩代码 —— 更重要的是，将**局部变量**命名为较短的变量(也因此，需要确保只引用全局变量)。

例如，如果一个函数有 `let userName`，压缩程序会把它替换为 `let a`（如果 `a` 已被占用了，那就使用其他字符），剩余的局部变量也会被进行类似的替换。

**当使用 `new Function` 动态创建函数时，这个函数在运行时才被创建，而此时代码压缩已经完成。因此，如果在 `new Function` 内部引用了在压缩时被重命名的变量，就会导致问题。**

让我们通过一个简单的例子来说明：
```
function createFunction() {
  let userName = "John";
  return new Function('alert(userName)');
}

let dynamicFunction = createFunction();
dynamicFunction(); // 会抛出 ReferenceError: userName is not defined

```

若确实需要字符串创建函数，并且希望新的函数能访问到内部变量，可以按以下方法传递参数，但需确保注入到的值是否可信任，避免潜在的安全问题：
```
function createFunction(userName) {
  return new Function('alert("' + userName + '")');
}

let dynamicFunction = createFunction("John");
dynamicFunction(); // 弹出 "John"

```