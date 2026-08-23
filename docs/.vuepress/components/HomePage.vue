<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SiteFooter from './SiteFooter.vue'

type RegulationPreviewItem = {
  id: string
  name: string
  publishedAt: string | null
  authority: string
  officialUrl: string | null
}

const regulationCount = ref(629)
const verifiedLinkCount = ref(4)
const regulationPreviewItems = ref<RegulationPreviewItem[]>([])

onMounted(async () => {
  try {
    const response = await fetch('/data/regulations-2025.json')
    if (!response.ok) return
    const payload = await response.json()
    regulationCount.value = payload.recordCount
    verifiedLinkCount.value = payload.verifiedLinkCount
    regulationPreviewItems.value = payload.records
      .filter((item: RegulationPreviewItem) => item.officialUrl)
      .slice(0, 2)
  } catch {
    // Keep the compact fallback totals when the static data file is unavailable.
  }
})

const modules = [
  {
    index: '02',
    title: '自动化办公',
    description: '沉淀可复用的工作方法、自动化流程与效率提升实践。',
    link: '/office-automation/',
    label: '效率与流程',
    icon: 'automation',
  },
  {
    index: '03',
    title: '投资实战分析',
    description: '记录投资研究、分析框架、决策依据与真实复盘。',
    link: '/investment-analysis/',
    label: '研究与决策',
    icon: 'investment',
  },
  {
    index: '04',
    title: '会计准则区分及影响',
    description: '比较主要会计准则的处理差异，以及对财务报表和决策的影响。',
    link: '/accounting-standards/',
    label: '准则与财务',
    icon: 'accounting',
  },
  {
    index: '05',
    title: 'DSH 开发实践',
    description: '实时记录项目进度、工程实践、版本变化与开发心得。',
    link: '/ai-finance/',
    label: 'AI 与工程',
    icon: 'development',
  },
]
</script>

<template>
  <main class="vp-home custom-home">
    <div class="home-layout">
      <a href="/regulations/" class="module-card regulation-preview-card home-regulations-mini" aria-label="进入上市公司法规库">
        <div class="module-card__meta">
          <span>法规库</span>
          <span>官方原文入口</span>
        </div>
        <div class="regulation-preview__header">
          <div class="module-card__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M8 5h16v22H8zM12 10h8M12 15h8M12 20h5" />
            </svg>
          </div>
          <div>
            <h3>上市公司法规库</h3>
            <p>监管规则与官方原文入口</p>
          </div>
        </div>
        <div class="regulation-preview__search"><span aria-hidden="true">⌕</span> 搜索法规名称或文号</div>
        <div class="regulation-preview__stats">
          <span><strong>{{ regulationCount }}</strong> 条法规</span>
          <span><strong>{{ verifiedLinkCount }}</strong> 条原文直达</span>
        </div>
        <div class="regulation-preview__rows" aria-hidden="true">
          <div v-for="item in regulationPreviewItems" :key="item.id">
            <span>{{ item.authority }}</span>
            <p>{{ item.name }}</p>
            <time>{{ item.publishedAt }}</time>
          </div>
          <div v-if="regulationPreviewItems.length === 0" class="regulation-preview__placeholder">
            <span>证监会</span><p>上市公司信息披露管理办法</p><time>2025</time>
          </div>
        </div>
        <span class="module-card__link">进入法规库 <i aria-hidden="true">→</i></span>
      </a>

      <section class="home-intro" aria-labelledby="home-title">
        <p class="home-eyebrow"><span aria-hidden="true"></span> PERSONAL KNOWLEDGE BASE</p>
        <h1 id="home-title">知识导航，<br /><em>万事通达</em></h1>
        <p class="home-lead">
          记录真实项目中的方法、判断与复盘，把零散经验整理为可以长期积累、检索和应用的知识体系。
        </p>
        <div class="home-principles" aria-label="知识库原则">
          <span>实践驱动</span>
          <span>持续更新</span>
          <span>长期复用</span>
        </div>
      </section>

      <aside class="author-profile" aria-labelledby="author-name">
        <div class="author-profile__topline">
          <span>ABOUT THE AUTHOR</span>
          <span class="author-profile__status"><i aria-hidden="true"></i> 持续记录中</span>
        </div>
        <div class="author-profile__identity">
          <div class="author-profile__monogram" aria-hidden="true">陈</div>
          <div>
            <h2 id="author-name">陈梓墨</h2>
            <p>技术 × 财务 × 投资实践者</p>
          </div>
        </div>
        <p class="author-profile__bio">
          你好，我是陈梓墨。我关注技术、财务与投资的交叉领域，希望把专业知识、实践经验和每日思考整理为可以长期积累、检索和复用的知识体系。
        </p>

        <section class="author-profile__section" aria-labelledby="credentials-title">
          <h3 id="credentials-title">专业资质</h3>
          <div class="author-profile__credentials">
            <span>ACCA</span>
            <span>CIA</span>
            <span>CISA</span>
            <span>CMA</span>
            <span>税务师</span>
          </div>
        </section>

        <section class="author-profile__section" aria-labelledby="research-title">
          <h3 id="research-title">研究方向</h3>
          <p>研究 AI 如何改善日常办公流程、辅助投资与财务分析决策，以及由此带来的风险和长期影响。</p>
        </section>

        <section class="author-profile__section" aria-labelledby="purpose-title">
          <h3 id="purpose-title">关于这个知识库</h3>
          <p>记录和整合每日所思所想，把零散经验逐步沉淀为结构化内容。</p>
        </section>

        <blockquote>日拱一卒，功不唐捐。</blockquote>
      </aside>

      <section class="knowledge-modules" aria-labelledby="modules-title">
        <div class="section-heading">
          <div>
            <p>EXPLORE BY TOPIC</p>
            <h2 id="modules-title">四个持续生长的主题</h2>
          </div>
          <p>从实际问题出发，进入对应的知识模块。</p>
        </div>

        <div class="module-grid">
          <a
            v-for="item in modules"
            :key="item.link"
            :href="item.link"
            class="module-card"
            :aria-label="`进入${item.title}模块`"
          >
            <div class="module-card__meta">
              <span>{{ item.index }}</span>
              <span>{{ item.label }}</span>
            </div>
            <div class="module-card__icon" aria-hidden="true">
              <svg v-if="item.icon === 'automation'" viewBox="0 0 32 32">
                <rect x="5" y="7" width="22" height="18" rx="3" />
                <path d="M10 12h12M10 17h7M10 22h10" />
                <path d="m21 18 2 2 4-5" />
              </svg>
              <svg v-else-if="item.icon === 'investment'" viewBox="0 0 32 32">
                <path d="M6 25V14M13 25V9M20 25V17M27 25V5" />
                <path d="m5 12 8-5 7 7 7-9" />
              </svg>
              <svg v-else-if="item.icon === 'accounting'" viewBox="0 0 32 32">
                <path d="M16 5v22M8 9h16M5 25h22" />
                <path d="m8 9-4 8h8l-4-8Zm16 0-4 8h8l-4-8Z" />
              </svg>
              <svg v-else viewBox="0 0 32 32">
                <path d="m11 9-7 7 7 7M21 9l7 7-7 7M19 5l-6 22" />
              </svg>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="module-card__link">进入模块 <i aria-hidden="true">→</i></span>
          </a>
        </div>
      </section>
    </div>

    <footer class="site-footer" vp-footer>
      <SiteFooter />
    </footer>
  </main>
</template>
