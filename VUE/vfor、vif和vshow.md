### v-show和v-if的相同与不同
* 相同点：都是动态控制DOM元素的显示与隐藏的
* 区别
  1. 控制方式不同，v-if通过直接销毁或创建DOM元素,v-show通过控制`display`属性，让该DOM元素不占布局空间。
  2. 过程不同，v-if会涉及到局部的重新编译以及子组件的创建和销毁。v-show只是基于CSS的切换
    - v-if由false变为true的时候，触发组件的`beforeCreate`、`create`、`beforeMount`、`mounted`钩子，由true变为false的时候触发组件的`beforeDestory`、`destoryed`方法
    - v-show 由false变为true的时候不会触发组件的生命周期
  3. 因此开销大小也有区别

* 场景
  如果需要非常频繁地切换，则使用 v-show 较好
  如果在运行时条件很少改变，则使用 v-if 较好

### v-if和v-for的优先级
  VUE2中：v-for优先。同时使用会导致每次渲染都会先循环再进行条件判断。
  VUE3中：v-if优先。同时使用就会连满足if条件的组件都无法被创建，因为此时if无法获得for内的循环变量。
  > 以上是由VUE源码决定的

  #### 解决办法
  * 最好的就是不要同时使用（在同一个元素上使用），要么将v-if写在一个`<template>`上(页面渲染时不会保留，不生成dom节点)
  * 如果判断条件出现在循环内部，则使用**计算属性**，直接得到for循环内执行了if判断后，过滤得到的结果。再进行v-for渲染。