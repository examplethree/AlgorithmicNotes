要理解 z-index 的工作原理，必须先了解 CSS 定位系统。元素可以通过 position 属性进行定位，共有以下几种定位方式：

 * static： 默认定位方式，元素不会脱离其正常的文档流。
 * relative： 元素相对于其初始位置进行偏移，不会脱离文档流。
 * absolute： 元素相对于其最近的已定位祖先元素进行偏移，脱离文档流。
 * fixed： 元素相对于浏览器窗口进行偏移，始终处于固定位置，不受页面滚动影响,脱离文档流。

1. 只有当元素**设置了 position 属性(不是默认值)**，z-index 才会生效。

2. 堆叠上下文 (Stacking Context): z-index 属性只在堆叠上下文中有效。
  根元素 (<html>) 总是创建一个堆叠上下文。
  position: absolute 或 position: fixed 的元素会创建堆叠上下文。
  z-index 值不为 auto 的元素会创建堆叠上下文。
  opacity 值小于 1 的元素会创建堆叠上下文。
  transform、filter 等属性也会创建堆叠上下文。
  flex 布局和 grid 布局也会创建堆叠上下文。

3. 父元素的影响: 如果一个元素的 z-index 值为正数，但其父元素的 z-index 值为负数，则该元素仍然可能被其父元素遮挡。 z-index 的作用是在同一个堆叠上下文内进行比较。

