<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type Regulation = {
  id: string
  serialNumber: number
  publishedAt: string | null
  documentNumber: string | null
  name: string
  authority: string
  category: string
  officialUrl: string | null
  linkLabel: string
  linkStatus: 'verified' | 'pending' | 'invalid'
  verifiedAt: string | null
}

type RegulationData = {
  source: string
  importedAt: string
  recordCount: number
  verifiedLinkCount: number
  pendingLinkCount: number
  years: string[]
  authorityCounts: Record<string, number>
  records: Regulation[]
}

const data = ref<RegulationData | null>(null)
const keyword = ref('')
const authority = ref('全部机构')
const category = ref('全部类别')
const year = ref('全部年份')
const sortOrder = ref<'desc' | 'asc'>('desc')
const selected = ref<Regulation | null>(null)
const copiedField = ref('')
const loadError = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/data/regulations-2025.json')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    data.value = await response.json()
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : '法规数据加载失败'
  }
})

const authorities = computed(() => Object.keys(data.value?.authorityCounts ?? {}))
const categories = computed(() => [...new Set((data.value?.records ?? []).map((item) => item.category))].sort())
const filteredRecords = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()
  return [...(data.value?.records ?? [])]
    .filter((item) => {
      const searchable = `${item.name} ${item.documentNumber ?? ''}`.toLowerCase()
      return (
        (!normalizedKeyword || searchable.includes(normalizedKeyword)) &&
        (authority.value === '全部机构' || item.authority === authority.value) &&
        (category.value === '全部类别' || item.category === category.value) &&
        (year.value === '全部年份' || item.publishedAt?.startsWith(year.value))
      )
    })
    .sort((a, b) => {
      const left = a.publishedAt ?? ''
      const right = b.publishedAt ?? ''
      return sortOrder.value === 'desc' ? right.localeCompare(left) : left.localeCompare(right)
    })
})

const resetFilters = () => {
  keyword.value = ''
  authority.value = '全部机构'
  category.value = '全部类别'
  year.value = '全部年份'
  sortOrder.value = 'desc'
}

const formatDate = (value: string | null) => value || '日期待补充'
const openDetails = (item: Regulation) => {
  selected.value = item
  copiedField.value = ''
}
const copyText = async (value: string | null, field: string) => {
  if (!value) return
  await navigator.clipboard.writeText(value)
  copiedField.value = field
  window.setTimeout(() => {
    if (copiedField.value === field) copiedField.value = ''
  }, 1600)
}
</script>

<template>
  <div class="regulations-page">
    <section class="regulations-hero">
      <div>
        <p class="regulations-eyebrow">REGULATORY LIBRARY · 2025</p>
        <h1>上市公司法规库</h1>
        <p class="regulations-lede">集中整理上市公司相关法律法规、监管规章与交易所业务规则，按来源、类别、时间和关键词快速定位。</p>
      </div>
      <div class="regulations-source"><span>资料来源</span><strong>{{ data?.source || '2025年上市公司法规汇编.xlsx' }}</strong><small>数据整理：{{ data?.importedAt || '2026-08-23' }}</small></div>
    </section>

    <section v-if="data" class="regulations-stats" aria-label="法规统计">
      <div class="regulation-stat"><span>收录法规</span><strong>{{ data.recordCount.toLocaleString() }}</strong><small>来自 {{ authorities.length }} 个分类</small></div>
      <div class="regulation-stat"><span>已核验链接</span><strong>{{ data.verifiedLinkCount.toLocaleString() }}</strong><small>官方原文直达</small></div>
      <div class="regulation-stat"><span>待补充链接</span><strong>{{ data.pendingLinkCount.toLocaleString() }}</strong><small>不生成猜测地址</small></div>
      <div class="regulation-stat"><span>覆盖年份</span><strong>{{ data.years.join(' / ') }}</strong><small>按颁布时间整理</small></div>
    </section>

    <div class="regulations-layout">
      <aside class="regulations-filters" aria-label="法规筛选">
        <h2>筛选法规</h2>
        <label>关键词<input v-model="keyword" type="search" placeholder="名称或文号" /></label>
        <label>监管机构<select v-model="authority"><option>全部机构</option><option v-for="item in authorities" :key="item">{{ item }}</option></select></label>
        <label>法规类别<select v-model="category"><option>全部类别</option><option v-for="item in categories" :key="item">{{ item }}</option></select></label>
        <label>颁布年份<select v-model="year"><option>全部年份</option><option v-for="item in data?.years" :key="item">{{ item }}</option></select></label>
        <button class="regulations-reset" type="button" @click="resetFilters">重置筛选</button>
        <p class="regulations-filter-note">法规名称、文号和日期保留 Excel 原始信息。官方链接仅在完成核验后展示。</p>
      </aside>

      <section class="regulations-results" aria-live="polite">
        <div class="regulations-results-head"><p>共找到 <strong>{{ filteredRecords.length.toLocaleString() }}</strong> 条法规</p><select v-model="sortOrder" aria-label="排序方式"><option value="desc">按时间：新到旧</option><option value="asc">按时间：旧到新</option></select></div>
        <div v-if="loadError" class="regulations-error" role="alert">法规数据加载失败：{{ loadError }}</div>
        <div v-else-if="!data" class="regulations-loading">正在加载法规目录……</div>
        <div v-else-if="filteredRecords.length === 0" class="regulations-empty">没有找到匹配的法规，请调整筛选条件。</div>
        <div v-else class="regulations-table-wrap">
          <table class="regulations-table"><thead><tr><th>颁布时间</th><th>法规名称</th><th>文号</th><th>来源</th><th>操作</th></tr></thead><tbody>
            <tr v-for="item in filteredRecords" :key="item.id">
              <td class="regulations-date">{{ formatDate(item.publishedAt) }}</td>
              <td><div class="regulation-name-row"><a v-if="item.officialUrl" :href="item.officialUrl" target="_blank" rel="noopener noreferrer">{{ item.name }} ↗</a><button v-else class="regulation-name pending" type="button" @click="openDetails(item)">{{ item.name }}</button></div><span class="regulation-category">{{ item.category }}</span></td>
              <td class="regulations-number">{{ item.documentNumber || '文号待补充' }}</td><td class="regulations-authority">{{ item.authority }}</td><td><button class="regulation-details" type="button" @click="openDetails(item)">查看详情 →</button></td>
            </tr>
          </tbody></table>
        </div>
      </section>
    </div>
  </div>

  <div v-if="selected" class="regulation-modal-backdrop" role="presentation" @click.self="selected = null">
    <article class="regulation-modal" role="dialog" aria-modal="true" aria-labelledby="regulation-modal-title">
      <header><h2 id="regulation-modal-title">{{ selected.name }}</h2><button type="button" aria-label="关闭详情" @click="selected = null">×</button></header>
      <dl><dt>颁布时间</dt><dd>{{ formatDate(selected.publishedAt) }}</dd><dt>文号</dt><dd>{{ selected.documentNumber || '文号待补充' }} <button v-if="selected.documentNumber" type="button" @click="copyText(selected.documentNumber, 'documentNumber')">{{ copiedField === 'documentNumber' ? '已复制' : '复制' }}</button></dd><dt>来源机构</dt><dd>{{ selected.authority }}</dd><dt>法规类别</dt><dd>{{ selected.category }}</dd><dt>链接状态</dt><dd>{{ selected.linkStatus === 'verified' ? `已核验（${selected.verifiedAt}）` : '待补充官方原文链接' }}</dd></dl>
      <div class="regulation-modal-actions"><a v-if="selected.officialUrl" class="regulation-official-link" :href="selected.officialUrl" target="_blank" rel="noopener noreferrer">打开官方原文 ↗</a><span v-else class="regulation-pending-link">官方原文链接待补充</span><button type="button" @click="copyText(selected.name, 'name')">{{ copiedField === 'name' ? '名称已复制' : '复制法规名称' }}</button></div>
      <p class="regulation-modal-note">当前页面展示法规目录信息。官方原文链接仅在完成标题、文号、日期和官方域名核验后开放。</p>
    </article>
  </div>
</template>
