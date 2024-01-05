#### Shadow DOM
  Shadow DOM是创建组件级别的DOM的一种方法。

  1. `shadowRoot = elem.attachShadow({mode: open|closed})` —— 为 `elem` 创建 `shadow DOM`。如果 `mode="open`"，那么它可以通过 `elem.shadowRoot` 接口被访问。
  2. 我们可以使用 `innerHTML` 或者其他 DOM 方法来扩展 `shadowRoot`。如下：
  ```
    //创建元素
    const host = document.querySelector("#host");
    const shadow = host.attachShadow({ mode: "open" });
    const span = document.createElement("span");
    span.textContent = "I'm in the shadow DOM";
    shadow.appendChild(span);
    
    //使用shadowRoot属性访问
    const upper = document.querySelector("button#upper");
    upper.addEventListener("click", () => {
      const spans = Array.from(host.shadowRoot.querySelectorAll("span"));
      for (const span of spans) {
        span.textContent = span.textContent.toUpperCase();
      }
    });
  ```

#### Shadow DOM 元素的特点
  - 有自己的 id 空间。其id可能和light DOM（普通子元素）相同
  - 对主文档的 JavaScript 选择器隐身，比如 `querySelector`。
  - 只使用 shadow tree 内部的样式，不使用主文档的样式。