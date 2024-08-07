<!-- .vuepress/components/BlogHero.vue -->
<script setup lang="ts">
import BlogHero from './modules/blog/components/BlogHero'
import BingHeroBackground from './presets/BingHeroBackground'
import HitokotoBlogHero from './presets/HitokotoBlogHero'
</script>

<template>
  <BlogHero>
    <template #bg>
      <BingHeroBackground />
    </template>
    <template #info="info">
      <HitokotoBlogHero v-bind="info" />
    </template>
  </BlogHero>
</template>