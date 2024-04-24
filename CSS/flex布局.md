> https://css-tricks.com/snippets/css/a-guide-to-flexbox/

#### flexbox 是什么
  弹性盒子（flexbox）是一个完整的模块，包括设置在父元素和子元素上的一系列属性。将子元素（items）沿着主轴（main-axis）或十字轴（cross-axis）进行布局。
  
  注意：主轴不一定是水平的，十字轴也不一定是垂直的，但十字轴一定是垂直于主轴的。

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
  ```
  .container {
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
  }
  ```
  6. align-items：定义子项沿cross axis方向的布局方式，视为justify-content的cross-axis版
  7. align-content：定义了多条主轴的对其方式，如果只有一条主轴，则不起作用。
  stretch（默认值）：轴线占满整个交叉轴。
  ```
  .box {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  }
  ```

#### 子项属性
> 请注意，**float、clear、vertical-align** 对 flex 子项没有影响。
  1. order：所有子项按照order从小到大排序，出现相同值时，恢复为源顺序
  2. flex-grow：接受一个作为比例的无单位的值，规定了子项占用剩余空间的量
  > 如果所有项目都 flex-grow 设置为 1 ，则容器中的剩余空间将平均分配给所有子项。如果其中一个子项的值为 2 ，则该子项将占用其他子项的两倍空间（或者它至少会尝试）。
  ```
    .item {
      flex-grow: 4; /* default 0 */
    }
  ```
  3. flex-shink：定义了项目在必要时的收缩能力
  4. flex-basis：定义了分配剩余空间之前子项本身默认大小
  5. **flex**：是**2.3.4.三项的依次的组合简写**，默认值0 1 auto。如果*使用单个数值*，则**该值只对flex-grow有效**，且自动将flex-basis修改为0%，flex-shink为默认值。
  6. align-self：允许覆盖子项的默认对齐方式，或由父项的align-items指定的对齐方式。

#### 一些用例
* 将网页的导航栏，设置为在中型屏幕上居中1，在小型设备上单列
