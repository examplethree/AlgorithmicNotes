// 深拷贝
function deepClone2(source){
    let dataType = Object.prototype.toString.call(source).slice(8, -1);
    if(source && (dataType === 'Object' || dataType === 'Array')){
        const res = Array.isArray(source)? []:{};
        const keys = Object.keys(source);
        keys.forEach(key =>{
            res[key] = deepClone2(source[key]);
        })
        return res;
    }
    return source;
}

// 浅拷贝
function copy(source){
    let dataType = Object.prototype.toString.call(source).slice(8, -1);
    if(source && (dataType === 'Object' || dataType === 'Array')){
        let res = Array.isArray(source)? []: {};
        let keys = Object.keys(source);
        for (key of keys){
            res[key] = source[key];
        }
        return res;
    }
    return source;
}