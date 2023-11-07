# `for in`在循环内
 和 `in`操作符一样，`for in`循环同样在查找对象属性时遍历原型链上的所有属性

# 对象使用和属性
 JavaScript 中所有变量都可以当作对象使用，除了两个例外 `null` 和 `undefined`
 `false.toString(); // 'false'`
 数字的字面值也可以当作对象使用，但通常会因为JavaScript解析器的错误让人误以为这样不行。  
 通常需要将字面量使用括号包围，使得解析正常进行
 `(2).toString(); //2先被计算`

 ## 对象作为数据类型
 JavaScript 的对象可以作为 *哈希表* 使用，主要用来保存命名的键与值的对应关系。
 ## 访问属性
 ```
    var foo = {name: 'kitten'}
    foo.name; // kitten
    foo['name']; // kitten

    var get = 'name';
    foo[get]; // kitten

    foo.1234; // SyntaxError
    foo['1234']; // works 中括号操作的特点
 ```
 两种语法是等价的，但是中括号操作符在下面两种情况下依然有效
 * 动态设置属性
 * 属性名不是一个有效的变量名（**注：**比如属性名中包含空格，或全数字，或是 JS 的关键词）
 ## 属性名的语法
 ```
    var test = {
        'case': 'I am a keyword so I must be notated as a string',
        delete: 'I am a keyword too so me' // 出错：SyntaxError
    };
 ```
 对象的属性名可以使用 *字符串* 或者*普通字符* 声明。但是由于 JavaScript 解析器的另一个错误设计， 上面的第二种声明方式在 ECMAScript 5 之前会抛出 `SyntaxError` 的错误。  

 这个错误的原因是 `delete` 是 JavaScript 语言的一个关键词；因此为了在更低版本的 JavaScript 引擎下也能正常运行， 必须使用字符串字面值声明方式。