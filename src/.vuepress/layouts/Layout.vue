<script setup lang="ts">
// @ts-ignore
import { Layout } from 'vuepress-theme-hope/client'
import { usePageFrontmatter } from 'vuepress/client'
import DonateQRCode from '../components/DonateQRCode.vue'
import DonateButton from '../components/DonateButton.vue'

// 在页面 frontmatter 中设置 `donate: false` 可关闭该页面的捐赠二维码
const frontmatter = usePageFrontmatter<{ donate?: boolean }>()
</script>

<template>
  <Layout>
    <template #sidebarBottom>
      <DonateQRCode v-if="frontmatter.donate !== false" />
    </template>
    <template #contentAfter>
      <DonateButton v-if="frontmatter.donate !== false" />
    </template>
  </Layout>
</template>
