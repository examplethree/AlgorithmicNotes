### 防抖函数
 * 应用场景：
 1. 搜索框输入：用户在输入搜索关键字时，不希望每次敲击键盘都触发搜索，而是等用户停止输入一段时间后再执行搜索操作。
 2. 窗口大小调整：在窗口大小调整过程中，为防止频繁调整，可以使用防抖来确保只有在调整完成后才触发事件。
```
    function debounce(cb, delay){
        let timer;
        return (...args)=>{
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(()=>{
                cb(...args);
            }, delay);
        };
    }
```
### 节流函数
 * 应用场景：
  1. 页面滚动：在页面滚动事件中，为防止滚动过程中频繁触发事件，可以使用节流。
  2. 鼠标移动：在处理鼠标移动事件时，节流可确保一定时间内只执行一次。
 * 实现：
  1. 设置一个标志位记录是否允许执行函数
  2. 在执行函数后，设定一个时间间隔，在间隔内标志位不再被设置为允许执行
  3. 重复上述步骤
 ```
    function throttle(cbFunc, delay){
        let executable = true;
        return function(...args){
            if(executable){
                cbFunc(...args);
                executable = false;
                setTimeout(()=>{
                    executable = true;
                }, delay);
            }
        };
    };
 ```
 > 如果将 节流函数 *用在搜索框输入* 场景，则需要在每次用户停止输入后，再执行一次搜索操作，这时候需要添加一个变量，记录在时间间隔内函数的调用，实现如下
 ```
    function throttle_ext(cb, delay){
        let executable=true, waitargs=null;

        function timeoutFun(){
            if(waitargs){
                cb(...waitargs);
                waitargs = null;
                setTimeout(timeoutFunc, delay);
            }
            else{
                executable = true;
            }
        };

        return function(...agrs){
            if(exectutable){
                cb(...args);
                executable = false;
                setTimeout(timeoutFunc, delay);
            }
            else{
                waitargs = args;
            }
        };
    }
 ```