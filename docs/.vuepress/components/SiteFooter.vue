<script setup lang="ts">
const currentYear = new Date().getFullYear()
const icpNumber = import.meta.env.VITE_ICP_NUMBER || ''
const icpUrl = import.meta.env.VITE_ICP_URL || 'https://beian.miit.gov.cn/'
const publicSecurityNumber = import.meta.env.VITE_PUBLIC_SECURITY_NUMBER || ''
const publicSecurityUrl = import.meta.env.VITE_PUBLIC_SECURITY_URL || ''
</script>

<template>
  <div class="site-footer__content">
    <p>© {{ currentYear }} · 持续整理，保持好奇</p>
    <p class="site-footer__records">
      <a v-if="icpNumber" :href="icpUrl" target="_blank" rel="noopener noreferrer">
        {{ icpNumber }}
      </a>
      <span v-else>备案信息待补充</span>
      <template v-if="publicSecurityNumber && publicSecurityUrl">
        <span aria-hidden="true"> · </span>
        <a :href="publicSecurityUrl" target="_blank" rel="noopener noreferrer">
          {{ publicSecurityNumber }}
        </a>
      </template>
    </p>
  </div>
</template>
