## Javascript中普通对象的原型

JavaScript 中所有的对象都有一个内置属性，称为它的 prototype（原型）。它本身是一个对象，故原型对象也会有它自己的原型，逐渐构成了原型链。原型链终止于拥有 null 作为其原型的对象上。

> 备注： 指向对象原型的属性并**不**是 `prototype`。它的名字不是标准的，但实际上所有浏览器都使用 `__proto__`。访问对象原型的标准方法是 `Object.getPrototypeOf()`。

```
   class Animal { 
      constructor(name) {
         this.name = name;
      }
   }
   let animal = new Animal("My animal");
```
   对象 `animal` 和class `Animal`的图形化表示
   ![类对象](../Pictures/类的原型链.jpg "图形化")

```
   const myDate = new Date();
   let object = myDate;

   do {
    object = Object.getPrototypeOf(object);
    console.log(object);
   } while (object);

   // Date.prototype
   // Object { }
   // null
```
![对象实例包含的原型链](../Pictures/mydate-prototype-chain.svg "原型链")

## extend怎么实现继承的
  extends语法糖做的事
  ![extends实现继承的过程中做了什么](../Pictures/whatextendsdo.png "what extends do")
  
  手动实现继承，也就是原型链和调用构造函数的组合方法实现继承，做的事
  ![手动继承的过程中做了什么](../Pictures/画手动继承原型链.png "without Syntactic sugar")