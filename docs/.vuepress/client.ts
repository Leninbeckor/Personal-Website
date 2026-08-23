import { defineClientConfig } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
import RegulationsLibrary from './components/RegulationsLibrary.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('RegulationsLibrary', RegulationsLibrary)
  },
  layouts: {
    Layout,
  },
})
