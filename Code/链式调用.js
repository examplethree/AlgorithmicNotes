// 实现一个可以链式调用的对象方法
let obj = {
    name: 'Bell',
    sayHi: function(){
        console.log("hi you")
        return this; //实现链式调用
    },
    sayBye: function(){
        console.log("bye you");
        return this;  //实现链式调用
    }
}