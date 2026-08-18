<script setup lang="ts">
// @ts-ignore
import { Blog } from 'vuepress-theme-hope/blog'
// @ts-ignore
import BingHeroBackground from 'vuepress-theme-hope/presets/BingHeroBackground.js'
// @ts-ignore
import HitokotoBlogHero from 'vuepress-theme-hope/presets/HitokotoBlogHero.js'

// 解决一言组件中的类型不兼容错误
// 插槽数据中的 text 和 tagline 可能是 null，但组件期望的是 string。
// 解决方案是创建一个 processBlogHeroData 函数来处理数据，将 null 值转换为空字符串。
const processBlogHeroData = (data: any) => ({
  ...data,
  text: data.text ?? '',
  tagline: data.tagline ?? '',
})
</script>

<template>
  <Blog>
    <!--注释：使用必应壁纸组件替换默认 hero 背景 -->
    <template #heroBg>
      <BingHeroBackground />
    </template>
    <!--注释：使用一言组件替换默认 hero 信息 -->
    <template #heroInfo="data">
      <HitokotoBlogHero v-bind="processBlogHeroData(data)" />
    </template>
  </Blog>
</template>