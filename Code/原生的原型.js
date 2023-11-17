/**
 * 在所有函数的原型中添加 defer(ms) 方法，该方法返回一个包装器，将函数调用延迟 ms 毫秒。

   下面是它应该如何执行的例子：

    function f(a, b) {
    alert( a + b );
    }

    f.defer(1000)(1, 2); // 1 秒后显示 3
 */

//答：
// 在沙箱中运行正确，但无法实现“将包装器函数作为对象方法调用”
    Function.prototype.defer = function(delay){
      return function(...args){
        setTimeout(()=>{
          this(...args);
        }, delay);
      };
    }


//参考答案解决方案：
  Function.prototype.defer = function(ms) {
    let f = this;
    return function(...args) {
      setTimeout(() => {
        f.apply(this, args);
    }, ms);
    }
  };


//样例测试
// 函数
  function f(a, b) {
    alert( a + b );
  }
  
  f.defer(1000)(1, 2); // 1 秒后显示 3
// 对象方法调用
  let user = {
    name: "John",
    sayHi() {
      alert(this.name);
    }
  }
  
  user.sayHi = user.sayHi.defer(1000);
  
  user.sayHi();
