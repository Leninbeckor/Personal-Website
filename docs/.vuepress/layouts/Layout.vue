<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <footer class="site-footer" vp-footer>
        <SiteFooter />
      </footer>
    </template>
  </ParentLayout>
</template>
