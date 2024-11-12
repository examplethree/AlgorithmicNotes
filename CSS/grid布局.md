[Grid布局指南](https://css-tricks.com/snippets/css/complete-guide-grid)

#### 容器元素属性
  1. display: grid | inline-grid;
    可以生成块级网络或内联级网络。

  2. grid-template-columns：
  3. grid-template-rows：<track-size>｜<line-name> 
  4. grid-template-areas: "<grid-area-name> | . | none | ..."  "..."; 语法本身提供了网格结构的可视化。

  5. grid-column-gap：
  6. grid-row-gap：
  7. grid-gap（gap）：

  8. justify-items:
  9. align-items:
  10. place-items: <align-items> / <justify-items> 8和9的简写。第一个值设置align-items ，第二个值justify-items 。如果省略第二个值，则将第一个值**分配给这两个属性**。

  11. justify-content：start｜end｜center｜stretch；有时网格的总大小可能小于其网格容器的大小。
  12. align-content:
  13. place-content:

  14. grid-auto-columns: <track-size> ...;
  15. grid-auto-rows: <track-size> ...; 用于设置隐式创建的网格的宽度和高度。也就是没有在grid-templete- area中创建的网格。（详见指南图解）
  
  16. grid-auto-flow：row | column | row dense | column dense; 有未明确位置的网格项，根据该属性自动放置这些项。

#### 子项属性
  1. grid-column-start
  2. grid-column-end
  3. grid-row-start
  4. grid-row-end
  5. grid-column: 上述1和2的简写
  6. grid-row：上述3和4 的简写

  7. grid-area：<name> | <row-start> / <column-start> / <row-end> / <column-end>。为子项命名，或作为上述1、2、3和4的进一步简写。

  8. justify-self：start、end、center、stretch（默认）。子项填充其所在网格的方式
  9. align-self:start、end、center、stretch（默认）。与8相垂直方向的对齐
  10. place-self：<align-self> / <justify-self>。作为9和8的简写。如果省略第二个值，则将第一个值分配给这两个属性。。