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