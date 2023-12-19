> https://css-tricks.com/snippets/css/a-guide-to-flexbox/

#### flexbox 是什么

#### 父项的属性
  1. display: flex 为其所有子项启用了flex 上下文（context）。
  2. flex-direction：建立主轴的方向，cross axis总是垂直主轴，随主轴而变
  ```
  .container {
    flex-direction: row | row-reverse | column | column-reverse;
  }
  ```
  3. flex-wrap：默认将所有元素放在一行
  ```
  .container {
    flex-wrap: nowrap | wrap | wrap-reverse;
  }
  ```
  4. flex-flow：以上两个属性的合并简写
  ```
  .container {
    flex-flow: column wrap;
  }
  ```
  5. justify-content：定义了子项沿主轴**方向**布局的方式
  > 请注意，浏览器对这些值的支持是微妙的。例如， space-between 从未获得某些版本的 Edge 的支持，并且 start/end/left/right 尚未在 Chrome 中。MDN 有详细的图表。最安全的值是 flex-start 、 flex-end 和 center 。
  6. align-items：定义子项沿cross axis的布局方式，视为justify-content的cross-axis版

#### 子项属性
> 请注意，float、clear、vertical-align 对 flex 子项没有影响。