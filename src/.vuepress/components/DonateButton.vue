<script setup lang="ts">
import { ref } from 'vue'
import DonateQRCode from './DonateQRCode.vue'

const show = ref(false)
</script>

<template>
  <div class="donate-trigger" @mouseenter="show = true" @mouseleave="show = false">
    <button class="donate-trigger-btn" type="button">☕ 打赏作者</button>
    <transition name="donate-popover">
      <div v-if="show" class="donate-popover">
        <DonateQRCode />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.donate-trigger {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.donate-trigger-btn {
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--vp-c-border, #d1d5db);
  border-radius: 999px;
  background: var(--vp-c-bg-soft, #f8f8f8);
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.donate-trigger:hover .donate-trigger-btn {
  border-color: var(--vp-c-brand, #3eaf7c);
  color: var(--vp-c-brand, #3eaf7c);
}

.donate-popover {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: min(360px, 90vw);
  margin-bottom: 0.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
}

.donate-popover :deep(.donate-card) {
  margin: 0;
  max-width: 100%;
}

.donate-popover-enter-active,
.donate-popover-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.donate-popover-enter-from,
.donate-popover-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}
</style>
