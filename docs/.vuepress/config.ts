import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { loadEnvFile } from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)
const projectRoot = path.resolve(__dirname, '../..')

for (const filename of ['.env.local', '.env']) {
  const envFile = path.join(projectRoot, filename)
  if (existsSync(envFile)) loadEnvFile(envFile)
}

const normalizeHost = (value: string): string => value.replace(/\/+$/, '')

const siteHost = normalizeHost(process.env.SITE_HOST || 'https://www.example.com')
const siteTitle = process.env.SITE_TITLE || '陈梓墨的技术知识库'
const siteDescription =
  process.env.SITE_DESCRIPTION || '聚焦自动化办公、投资分析、会计准则与 DSH 开发实践的个人知识库'
const siteAuthor = process.env.SITE_AUTHOR || '陈梓墨'
const repositoryUrl =
  process.env.GITHUB_REPOSITORY_URL || 'https://github.com/Leninbeckor/Personal-Website'
const hasGitHistory = (() => {
  try {
    execFileSync('git', ['rev-parse', '--verify', 'HEAD'], {
      cwd: projectRoot,
      stdio: 'ignore',
    })
    return true
  } catch {
    return false
  }
})()

const cleanUrlsPlugin = {
  name: 'knowledge-base-clean-urls',
  extendsPageOptions: (options, app) => {
    if (!options.filePath || options.path) return

    const relativePath = path.relative(app.dir.source(), options.filePath).replaceAll('\\', '/')
    if (!relativePath.endsWith('.md')) return

    if (relativePath === 'README.md') {
      options.path = '/'
    } else if (relativePath.endsWith('/README.md')) {
      options.path = `/${relativePath.slice(0, -'/README.md'.length)}/`
    } else {
      options.path = `/${relativePath.slice(0, -'.md'.length)}/`
    }
  },
}

export default defineUserConfig({
  lang: 'zh-CN',
  title: siteTitle,
  description: siteDescription,
  base: '/',
  head: [
    ['meta', { name: 'theme-color', content: '#49b1f5' }],
    ['meta', { name: 'author', content: siteAuthor }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
  ],
  bundler: viteBundler(),
  alias: {
    '@theme/VPHomeFooter.vue': path.resolve(__dirname, './components/SiteFooter.vue'),
  },
  theme: defaultTheme({
    hostname: siteHost,
    repo: repositoryUrl,
    docsRepo: repositoryUrl,
    docsBranch: 'main',
    docsDir: 'docs',
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: hasGitHistory,
    contributors: false,
    colorMode: 'auto',
    colorModeSwitch: true,
    navbar: [
      { text: '首页', link: '/' },
      { text: '办公自动化', link: '/office-automation/' },
      { text: '投资分析', link: '/investment-analysis/' },
      { text: '会计准则', link: '/accounting-standards/' },
      { text: 'DSH 开发实践', link: '/ai-finance/' },
      { text: '关于', link: '/about/' },
    ],
    sidebar: {
      '/office-automation/': [
        {
          text: '自动化办公实践',
          prefix: '/office-automation/',
          children: ['', 'audit-process-automation'],
        },
      ],
      '/investment-analysis/': [
        {
          text: '投资实战分析',
          prefix: '/investment-analysis/',
          children: [''],
        },
      ],
      '/accounting-standards/': [
        {
          text: '会计准则区分及影响',
          prefix: '/accounting-standards/',
          children: [''],
        },
      ],
      '/ai-finance/': [
        {
          text: 'DSH 开发实践',
          prefix: '/ai-finance/',
          children: [''],
        },
      ],
      '/guide/': [
        {
          text: '系统教程',
          prefix: '/guide/',
          children: ['', 'getting-started', 'cloud-deployment'],
        },
      ],
      '/notes/': [
        {
          text: '日常笔记',
          prefix: '/notes/',
          children: ['', 'first-note'],
        },
      ],
      '/resources/': [
        {
          text: '资源清单',
          prefix: '/resources/',
          children: [''],
        },
      ],
    },
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        lastUpdatedText: '最后更新',
        contributorsText: '贡献者',
        editLinkText: '在 GitHub 上编辑此页',
        tip: '提示',
        warning: '注意',
        danger: '警告',
        notFound: ['这里暂时没有内容', '页面可能已经移动或被整理'],
        backToHome: '返回知识库首页',
        toggleColorMode: '切换深色模式',
        toggleSidebar: '切换侧边栏',
        prev: '上一篇',
        next: '下一篇',
      },
    },
    themePlugins: {
      linksCheck: {
        dev: true,
        build: 'error',
      },
      git: hasGitHistory,
      mediumZoom: true,
      seo: {
        hostname: siteHost,
        author: siteAuthor,
        canonical: `${siteHost}/`,
        autoDescription: true,
      },
      sitemap: {
        hostname: siteHost,
        changefreq: 'weekly',
      },
    },
  }),
  plugins: [
    cleanUrlsPlugin,
    slimsearchPlugin({
      indexContent: true,
      suggestion: true,
      locales: {
        '/': {
          placeholder: '搜索知识库',
        },
      },
    }),
  ],
})
