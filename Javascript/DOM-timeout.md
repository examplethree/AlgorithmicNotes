# timeout 函数
 > 不太理解，先记下的
 绝对不要使用字符串作为 setTimeout 或者 setInterval 的第一个参数， 这么写的代码明显质量很差。当需要向回调函数传递参数时，可以创建一个匿名函数，在函数内执行真实的回调函数。
 ```
    function foo(a, b, c) {}

    // 不要这样做
    setTimeout('foo(1,2, 3)', 1000)

    // 可以使用匿名函数完成相同功能
    setTimeout(function() {
        foo(1, 2, 3);
    }, 1000)
 ```