### ref是什么
  `ref` 和 `$refs` 是 Vue.js 提供的一种方便的方法，用于在父组件中操作子组件，它是 Vue 组件间通信的一种方式之一

  `ref` 属性: `ref` 是 Vue 提供的一个特殊属性，用于给 DOM 元素或子组件注册引用信息。出现在父组件引用子组件的位置。

  `$refs` 对象: 在父组件中，通过 `$refs` 属性可以访问到所有注册了 `ref` 的子组件。`$refs` 是一个对象，其属性名对应着你在 `ref` 中定义的引用名。

### 使用示例
  在引用处对组件定义一个`ref`的属性(名)——`popup`，然后在method中可以通过$refs.popup调用子组件的方法。
```
  <template>
    <div id="app">
      <button @click="openPopup">Open Popup</button>
      <Popup ref="popup">
        <p>This is the content of the popup!</p>
      </Popup>
    </div>
  </template>
  
  <script>
  import Popup from './components/Popup.vue';
  
  export default {
    components: {
      Popup
    },
    methods: {
      openPopup() {
        this.$refs.popup.openPopup();
      }
    }
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
```