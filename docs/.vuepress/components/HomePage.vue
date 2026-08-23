<script setup lang="ts">
import SiteFooter from './SiteFooter.vue'

const modules = [
  {
    index: '01',
    title: '自动化办公',
    description: '沉淀可复用的工作方法、自动化流程与效率提升实践。',
    link: '/office-automation/',
    label: '效率与流程',
    icon: 'automation',
  },
  {
    index: '02',
    title: '投资实战分析',
    description: '记录投资研究、分析框架、决策依据与真实复盘。',
    link: '/investment-analysis/',
    label: '研究与决策',
    icon: 'investment',
  },
  {
    index: '03',
    title: '会计准则区分及影响',
    description: '比较主要会计准则的处理差异，以及对财务报表和决策的影响。',
    link: '/accounting-standards/',
    label: '准则与财务',
    icon: 'accounting',
  },
  {
    index: '04',
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
    <section class="home-intro" aria-labelledby="home-title">
      <div class="home-intro__copy">
        <p class="home-eyebrow"><span aria-hidden="true"></span> PERSONAL KNOWLEDGE BASE</p>
        <h1 id="home-title">在技术、财务与<br />投资之间，<br /><em>建立可复用的认知。</em></h1>
        <p class="home-lead">
          记录真实项目中的方法、判断与复盘，把零散经验整理为可以长期积累、检索和应用的知识体系。
        </p>
        <div class="home-principles" aria-label="知识库原则">
          <span>实践驱动</span>
          <span>持续更新</span>
          <span>长期复用</span>
        </div>
      </div>

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
          关注 AI 在日常办公、投资和财务领域的应用，研究它如何改善工作流程、辅助分析与决策。
        </p>
        <div class="author-profile__credentials" aria-label="专业资质">
          <span>ACCA</span>
          <span>CIA</span>
          <span>CISA</span>
          <span>CMA</span>
          <span>税务师</span>
        </div>
        <blockquote>日拱一卒，功不唐捐。</blockquote>
      </aside>
    </section>

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

    <footer class="site-footer" vp-footer>
      <SiteFooter />
    </footer>
  </main>
</template>
