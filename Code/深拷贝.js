// 深拷贝
function deepClone(source){
    let copy = Array.isArray(source)? [] : {};
    if (source){
        for( key in source){
            if(source[key] !== null && Object.prototype.toString.call(source[key]) === '[object Object]'){
                copy[key] = deepClone(source[key]);
            }
            else{
                copy[key] = source[key];
            }
        }
    }
    return source;
}