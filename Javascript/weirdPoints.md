## 构造函数
 
 JavaScript 中的构造函数和其它语言中的构造函数是不同的。通过 `new` 关键字方式调用的函数都被认为是构造函数。
 在构造函数内部 - 也就是被调用的函数内 - `this` 指向新创建的对象 `Object`
 如果被调用的函数没有显式的 `return` 表达式，则隐式的会返回 `this` 对象 - 也就是新创建的对象。
 显式的 `return` 表达式将会影响返回结果，但**仅限**于返回的是一个对象。                                 
 ```
    function Bar() {
        return 2;
    }
    new Bar(); // 返回新创建的对象
	
	function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // 返回的对象
 ```
 `new Bar()` 返回的是新创建的对象，而不是数字的字面值 2。

 ```
    function Bar() {
	   return new Number(2); //去掉此处的new则下面得到false
    }
    new Bar().constructor === Number
 ```

**总结以上**
 `new`关键字创建调用后的表达式的值一定是一个对象。`new`调用的函数有显式返回一个对象时，则返回该对象，否则返回新创建的函数对象。

### 工厂模式

为了不使用 `new` 关键字，构造函数必须显式的返回一个值。

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

上面两种对 `Bar` 函数的调用返回的值完全相同，一个新创建的拥有 `method` 属性的对象被返回，
其实这里创建了一个闭包。

还需要注意， `new Bar()` 并**不会**改变返回对象的原型（**注：**也就是返回对象的原型不会指向 `Bar.prototype`）。 **因为构造函数的原型会*被*指向到刚刚创建的新对象，而这里的 `Bar` 没有把这个新对象返回（而是返回了一个包含 `method` 属性的自定义对象）。**

**也就是工厂模式的使用，使得新创建的对象不能共享原型上的方法，它放弃了原型链的使用**
