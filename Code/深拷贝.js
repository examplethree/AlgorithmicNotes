// 深拷贝
function deepClone2(source){
    if(typeof source === 'object' && source){
        const res = Array.isArray(source)? []:{};
        const keys = Object.keys(source);
        keys.forEach(key =>{
            res[key] = deepClone2(source[key]);
        })
        return res;
    }
    return source;
}