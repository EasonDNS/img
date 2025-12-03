# 遇到的问题

## 导入时遇到`@/` 路径错误

> TypeScript 报错：找不到模块 “../views/Home.vue” / “../views/MainView.vue” / “../views/NotFound.vue” 或相应的类型声明。
> 根因有两个互相关联的原因：
> 项目中最初存在 @ 别名导入（@/views/...）与相对导入混用，导致在某些编辑器/分析上下文下解析失败（路径解析不一致）。
> 缺少 .vue 模块声明（没有 shim），TypeScript 无法把 .vue 文件识别为可导入的模块。

### 解决方法

    添加 `shims-vue.d.ts`这个文件 对其进行声明 
    声明内容:

``` ts
    declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
    }
   ```

## 导入`element-plus` 按需导入

* 安装两款插件 `unplugin-vue-components` 和 `unplugin-auto-import`

* ``` npm install -D unplugin-vue-components unplugin-auto-import ```
    * 然后在`vite.config.ts` 中添加配置
      ```ts 
      import { defineConfig } from 'vite'
      import AutoImport from 'unplugin-auto-import/vite'
      import Components from 'unplugin-vue-components/vite'
      import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
      export default defineConfig({
          plugins: [
  
      AutoImport({
      resolvers: [ElementPlusResolver()],
      }),
      Components({
      resolvers: [ElementPlusResolver()],
      }),
      ],
      })  
      ```
