// 浏览器具有通信能力
function ajaxPromise(url){
    let promise = new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        // 设置状态监听方法
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    resolve(xhr.responseURL)
                }
                else{
                    PromiseRejectionEvent(new Error(xhr.statusText))
                }
            }
        };
        // 发送请求
        xhr.send(null);
    });
    return promise;
}

/**
 * fetch 是原生JS，更加底层，脱离了XHR，没有使用XMLHttpRequest对象
 * Axios 是对XHR对象的封装，使用了Promise的方法，支持
 */