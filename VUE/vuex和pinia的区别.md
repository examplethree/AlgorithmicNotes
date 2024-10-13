1. 设计理念上：
  VUEX强调严格的状态管理，使用Flux架构，适用于大型应用程序。Pinia更轻量级，设计理念更*接近* *Composition API*，提供更直观的方式。
2. 语法上，
  VUEX采用**Optional API**，需要定义state、mutations、actions和getter，状态修改通过`commit` mutation完成。Pinia使用defineStore创建一个存储，*支持* state、actions和getter。状态的修改可以在actions中直接进行。
3. 模块化：
  VUEX支持模块化，但需要手动管理模块（体现在需要额外创建一个主store用于注册子模块，见下）。大型应用中会增加复杂性
  Pinia自带模块化支持，多个Store可以轻松使用。

  #### 创建主 store 并注册模块：
  ```javascript
    // store/index.js
    import { createStore } from 'vuex';
    import user from './modules/user';
    import product from './modules/product';
    
    const store = createStore({
      modules: {
        user,    // 注册用户模块
        product  // 注册产品模块
      }
    });
    
    export default store;
  ```