<script setup lang="ts">
import { computed, ref } from 'vue'

interface Amount {
  key: string
  label: string
  desc: string
}

const methods: { key: 'wechat' | 'alipay'; label: string; color: string }[] = [
  { key: 'wechat', label: '微信支付', color: '#07c160' },
  { key: 'alipay', label: '支付宝', color: '#1677ff' },
]

const amounts: Amount[] = [
  { key: 'any', label: '随意打赏', desc: '🙏 随缘打赏，全凭心意' },
  { key: '1', label: '1 元', desc: '请作者喝杯水' },
  { key: '3', label: '3 元', desc: '请作者喝可乐' },
  { key: '6', label: '6 元', desc: '给作者加鸡腿' },
  { key: '9', label: '9 元', desc: '请作者喝咖啡' },
]

// 二维码图片需放置在 .vuepress/public/assets/images/donate/ 目录下，命名规则为 `${支付方式}-${金额}.png`
const qrMap: Record<string, string> = {
  'wechat-any': '/assets/images/donate/wechat-any.JPG',
  'wechat-1': '/assets/images/donate/wechat-1.JPG',
  'wechat-3': '/assets/images/donate/wechat-3.JPG',
  'wechat-6': '/assets/images/donate/wechat-6.JPG',
  'wechat-9': '/assets/images/donate/wechat-9.JPG',
  'alipay-any': '/assets/images/donate/alipay-any.JPG',
  'alipay-1': '/assets/images/donate/alipay-1.JPG',
  'alipay-3': '/assets/images/donate/alipay-3.JPG',
  'alipay-6': '/assets/images/donate/alipay-6.JPG',
  'alipay-9': '/assets/images/donate/alipay-9.JPG',
}

const activeMethod = ref<'wechat' | 'alipay'>('wechat')
const activeAmount = ref('any')

const activeColor = computed(
  () => methods.find((item) => item.key === activeMethod.value)!.color
)
const activeAmountInfo = computed(
  () => amounts.find((item) => item.key === activeAmount.value)!
)
const qrSrc = computed(
  () => qrMap[`${activeMethod.value}-${activeAmount.value}`]
)
</script>

<template>
  <div class="donate-card" :style="{ '--active-color': activeColor }">
    <p class="donate-title">☕ 如果这篇文章对你有帮助，可以请作者喝杯咖啡</p>

    <div class="donate-body">
      <div class="donate-options">
        <div class="donate-methods">
          <button
            v-for="method in methods"
            :key="method.key"
            class="donate-method-btn"
            :class="{ active: activeMethod === method.key }"
            type="button"
            @click="activeMethod = method.key"
          >{{ method.label }}</button>
        </div>

        <div class="donate-amounts">
          <button
            v-for="amount in amounts"
            :key="amount.key"
            class="donate-amount-btn"
            :class="{ active: activeAmount === amount.key }"
            type="button"
            @click="activeAmount = amount.key"
          >{{ amount.label }}</button>
        </div>

        <p class="donate-desc">{{ activeAmountInfo.desc }}</p>
      </div>

      <transition name="donate-fade" mode="out-in">
        <img
          :key="qrSrc"
          class="donate-qr"
          :src="qrSrc"
          :alt="`${activeMethod === 'wechat' ? '微信支付' : '支付宝'} - ${activeAmountInfo.label}`"
          loading="lazy"
        />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.donate-card {
  width: 100%;
  margin: 2rem auto;
  margin-right: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 12px;
  background: var(--vp-c-bg-soft, #f8f8f8);
  text-align: center;
  box-sizing: border-box;
  max-width: calc(100% - 32px);
  container-type: inline-size;
}

.donate-title {
  margin: 0 0 1.25rem;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
}

.donate-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.donate-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.donate-methods {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.donate-method-btn {
  padding: 0.35rem 1rem;
  border: 1px solid var(--vp-c-border, #d1d5db);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.donate-method-btn.active {
  border-color: var(--active-color, #07c160);
  background: var(--active-color, #07c160);
  color: #fff;
}

.donate-amounts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.donate-amount-btn {
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--vp-c-border, #d1d5db);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.donate-amount-btn.active {
  border-color: var(--active-color, #3eaf7c);
  color: var(--active-color, #3eaf7c);
  font-weight: 600;
}

.donate-qr {
  flex-shrink: 0;
  width: 100%;
  max-width: 220px;
  height: auto;
  max-height: 440px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  padding: 4px;
  box-sizing: border-box;
}

.donate-desc {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2, #6b7280);
}

.donate-fade-enter-active,
.donate-fade-leave-active {
  transition: opacity 0.15s ease;
}

.donate-fade-enter-from,
.donate-fade-leave-to {
  opacity: 0;
}

@container (max-width: 260px) {
  .donate-card {
    padding: 1rem 0.75rem;
  }

  .donate-methods {
    gap: 0.3rem;
  }

  .donate-method-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }

  .donate-amount-btn {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
