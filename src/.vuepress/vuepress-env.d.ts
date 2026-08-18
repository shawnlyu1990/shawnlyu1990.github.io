// 这个文件是为了让 TypeScript 能够识别 .vue 文件的类型声明。

/// <reference types="vuepress/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
