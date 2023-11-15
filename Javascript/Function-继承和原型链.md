# 继承和原型链

> 遵循 ECMAScript 标准，符号 `someObject.[[Prototype]]` 用于标识 `someObject` 的原型。内部插槽 `[[Prototype]]` 可以通过 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 函数来访问。这个等同于 JavaScript 的非标准但被许多 JavaScript 引擎实现的属性 `__proto__` 访问器。为在保持简洁的同时避免混淆，在我们的符号中会避免使用 `obj.__proto__`，而是使用 `obj.[[Prototype]]` 作为代替。其对应于 `Object.getPrototypeOf(obj)`。
 
>**它不应与函数的 `func.prototype` 属性混淆，后者指定在给定函数被用作构造函数时分配给所有对象实例的 `[[Prototype]]`。**  通过构造函数创建的每一个实例都会自动将构造函数的 `prototype` 属性作为其 `[[Prototype]]`。

## 构造函数
 `Constructor.prototype` 默认具有一个自有属性：`constructor`，它引用了构造函数本身。即，`Box.prototype.constructor === Box`。**这允许我们在任何实例中访问原始构造函数。**

## 原型链
 `Constructor.prototype`表示某个构造函数的 `prototype`属性，它将成为这个构造函数实例的 `[[Prototype]]`, 也包括 `Constructor`自身的 `[[Prototype]]`。
 一个典型的构造函数将构建以下原型链：
 ```
    function Constructor() {}

    const obj = new Constructor();
    // 以下箭头均表示访问[[prototype]]，即箭首对象的[[prototype]]是箭尾对象
    // obj ---> Constructor.prototype ---> Object.prototype ---> null
 ```
 要构建更长的原型链，可用通过 Object.setPrototypeOf() 函数设置 Constructor.prototype 的 [[Prototype]]。

### 深入的研究
 JavaScript 中的函数总有一个默认的原型属性，箭头函数没有默认的原型属性，**而构造函数`new`出来的实例对象不属于函数**，但作为一个对象，它也有`[[Prototype]]` 。
 >
 ```
    function doSomething() {}
    doSomething.prototype.foo = "bar"; // 向原型上添加一个属性
    const doSomeInstancing = new doSomething();
    doSomeInstancing.prop = "some value"; // 向该对象添加一个属性
    console.log(doSomeInstancing);
 ```
如上所示，`doSomeInstancing` 的 `[[Prototype]]` 是 `doSomething.prototype`。但是，这是做什么的呢？当你访问 `doSomeInstancing` 的属性时，运行时首先会查找 `doSomeInstancing` 是否有该属性。  

如果 `doSomeInstancing` 没有该属性，**那么运行时会在 `doSomeInstancing.[[Prototype]]`（也就是 `doSomething.prototype`）中查找该属性。注意不是在doSomething上查找，而是它的`[[Prototype]]`** 要在对象自身上查找，而不是在其原型链上的某个地方，则有必要使用 `hasOwnProperty` 或 `Object.hasOwn` 方法。[示例](#性能)

 > 理解以下代码的输出，向构造函数的原型中添加属性

 ```
    function doSomething() {}
    doSomething.prototype.foo = "bar";
    const doSomeInstancing = new doSomething();
    console.log("doSomeInstancing.foo:      ", doSomeInstancing.foo); //bar
    console.log("doSomething.foo:           ", doSomething.foo); //undefined
    console.log("doSomething.prototype.foo: ", doSomething.prototype.foo); //bar
 ```

 ## 使用不同的方法来创建对象 (和改变原型链)
 ### 使用语法结构创建对象
 ```
    const o = { a: 1 };
    // 新创建的对象 o 以 Object.prototype 作为它的 [[Prototype]]
    // Object.prototype 的原型为 null。
    // o ---> Object.prototype ---> null

    const b = ["yo", "whadup", "?"];
    // 数组继承了 Array.prototype（具有 indexOf、forEach 等方法）
    // b ---> Array.prototype ---> Object.prototype ---> null

    function f() {
        return 2;
    }
    // 函数继承了 Function.prototype（具有 call、bind 等方法）
    // f ---> Function.prototype ---> Object.prototype ---> null

    const p = { b: 2, __proto__: o };
    // 可以通过 __proto__ 字面量属性将新创建对象的 [[Prototype]] 指向另一个对象。
    // （不要与 Object.prototype.__proto__ 访问器混淆）
    // p ---> o ---> Object.prototype ---> null
 ```
 ### 使用构造函数
 结合[Javascript-Garden关于构造函数中 `this`的指向的说明](https://github.com/BonsaiDen/JavaScript-Garden/blob/master/doc/zh/function/constructors.md)，了解构造函数创建对象的原理
 ```
    function Graph() {
        this.vertices = [];
        this.edges = [];
    }

    Graph.prototype.addVertex = function (v) {
        this.vertices.push(v);
    };

    const g = new Graph();
    // g 是一个带有自有属性“vertices”和“edges”的对象。
    // 在执行 new Graph() 时，g.[[Prototype]] 是 Graph.prototype 的值。
    // g：Graph {vertices: Array(0), edges: Array(0)}
 ```
 ### 使用 Object.create()
 还允许使用 `Object.create(null)` 创建没有原型的对象
 ```
    const a = { a: 1 };
    // a ---> Object.prototype ---> null

    const b = Object.create(a);
    // b ---> a ---> Object.prototype ---> null
    console.log(b.a); // 1 (inherited)

    const c = Object.create(b);
    // c ---> b ---> a ---> Object.prototype ---> null

    const d = Object.create(null);
    // d ---> null（d 是一个直接以 null 为原型的对象）
    console.log(d.hasOwnProperty);
    // undefined，因为 d 没有继承 Object.prototype
 ```

 ### 使用类
 ```
    class Polygon {
        constructor(height, width) {
            this.height = height;
            this.width = width;
        }
    }

    class Square extends Polygon {
        constructor(sideLength) {
            super(sideLength, sideLength);
        }

        get area() {
            return this.height * this.width;
        }

        set sideLength(newLength) {
            this.height = newLength;
            this.width = newLength;
        }
    }

    const square = new Square(2);
    // square ---> Square.prototype ---> Polygon.prototype ---> Object.prototype ---> null
 ```
 ### 使用 `Object.setPrototypeOf()`修改原型链
 虽然上面的所有方法都会在对象**创建时**设置原型链，但是 Object.setPrototypeOf() 允许修改**现有对象**的 `[[Prototype]]` 内部属性。
 ```
    const obj = { a: 1 };
    const anotherObj = { b: 2 };
    Object.setPrototypeOf(obj, anotherObj);
    // obj ---> anotherObj ---> Object.prototype ---> null
 ```
 ### 使用 __proto__ 访问器
 所有对象都继承了  `Object.prototype.__proto__` 访问器，它可以用来设置现有对象的 `[[Prototype]]`（如果对象没有覆盖 `__proto__` 属性）。
 > `Object.prototype.__proto__ `访问器是非标准的，且已被弃用。你几乎总是应该使用 `Object.setPrototypeOf` 来代替。
 ```
    const obj = {};
    // 请不要使用该方法：仅作为示例。
    obj.__proto__ = { barProp: "bar val" };
    obj.__proto__.__proto__ = { fooProp: "foo val" };
    console.log(obj.fooProp);
    console.log(obj.barProp);
 ```

 ## 性能
 原型链上较深层的属性的查找时间可能会对性能产生负面影响，这在性能至关重要的代码中可能会非常明显。此外，尝试访问不存在的属性始终会遍历整个原型链。  

 此外，在遍历对象的属性时，原型链中的每个可枚举属性都将被枚举。要检查对象是否具有在其自身上定义的属性，而不是在其原型链上的某个地方，则有必要使用 `hasOwnProperty` 或 `Object.hasOwn` 方法。除 `[[Prototype]]`为 `null` 的对象外，所有对象都从 `Object.prototype` 继承 `hasOwnProperty`——除非它已经在原型链的更深处被覆盖。

 ```
    function Graph() {
        this.vertices = [];
        this.edges = [];
    }
    Graph.prototype.addVertex = function (v) {
        this.vertices.push(v);
    };
    const g = new Graph();
    // g ---> Graph.prototype ---> Object.prototype ---> null

    g.hasOwnProperty("vertices"); // true
    Object.hasOwn(g, "vertices"); // true

    g.hasOwnProperty("nope"); // false
    Object.hasOwn(g, "nope"); // false

    g.hasOwnProperty("addVertex"); // false
    Object.hasOwn(g, "addVertex"); // false

    Object.getPrototypeOf(g).hasOwnProperty("addVertex"); // true
 ```


 > 此外，除非是为了与新的 JavaScript 特性兼容，否则永远不应扩展原生原型。