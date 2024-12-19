Array.prototype.myflat = function (depth=1){
    if(depth <= 0){
        return [...this];
    }
    return this.reduce((accu=[], value)=>{
        if(Array.isArray(value)){
            accu.push(...value.myflat(depth -1));
        } else {
            accu.push(value);
        }
        return accu; //显式返回
    }, [])
}