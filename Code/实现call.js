// 主要思路是将方法添加为目标对象的属性中，然后调用属性方法
// 注意调用结束后删除属性
Function.prototype.myCall = function(obj, ...args){
    const context = obj || window;

    const funcKey = new Symbol('func');
    context[funcKey] = this;

    let res = context[funcKey](...args);
    delete context[funcKey];
    return res;
}