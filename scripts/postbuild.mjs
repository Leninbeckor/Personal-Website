import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('docs/.vuepress/dist')
const redirectsFile = path.resolve('redirects.json')
const normalizeHost = (value) => value.replace(/\/+$/, '')
const siteHost = normalizeHost(process.env.SITE_HOST || 'https://www.example.com')

const escapeHtml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const validateRoute = (route, label) => {
  if (
    typeof route !== 'string' ||
    !route.startsWith('/') ||
    route.startsWith('//') ||
    route.includes('..') ||
    route.includes('?') ||
    route.includes('#')
  ) {
    throw new Error(`${label}必须是站内绝对路径，且不能包含查询参数、锚点或 ..：${route}`)
  }
}

const routeToOutput = (route) => {
  const relativeRoute = decodeURIComponent(route).replace(/^\/+/, '')
  if (!relativeRoute) return 'index.html'
  if (relativeRoute.endsWith('/')) return path.join(relativeRoute, 'index.html')
  if (relativeRoute.endsWith('.html')) return relativeRoute
  return path.join(relativeRoute, 'index.html')
}

const requiredFiles = ['index.html', '404.html', 'sitemap.xml']
for (const file of requiredFiles) {
  const target = path.join(distDir, file)
  if (!fs.existsSync(target)) {
    console.error(`构建产物缺少 ${file}`)
    process.exit(1)
  }
}

const robots = [`User-agent: *`, `Allow: /`, '', `Sitemap: ${siteHost}/sitemap.xml`, ''].join('\n')
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8')

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
if (!indexHtml.includes(siteHost)) {
  console.error(`首页中未找到正式站点地址 ${siteHost}，请检查 SEO 配置。`)
  process.exit(1)
}

const redirects = JSON.parse(fs.readFileSync(redirectsFile, 'utf8'))
for (const [source, target] of Object.entries(redirects)) {
  validateRoute(source, '重定向旧地址')
  validateRoute(target, '重定向新地址')
  if (source === target) throw new Error(`重定向地址不能相同：${source}`)

  const sourceFile = path.join(distDir, routeToOutput(source))
  const targetFile = path.join(distDir, routeToOutput(target))
  if (fs.existsSync(sourceFile)) throw new Error(`重定向旧地址会覆盖现有页面：${source}`)
  if (!fs.existsSync(targetFile)) throw new Error(`重定向目标页面不存在：${target}`)

  const canonicalUrl = new URL(target, `${siteHost}/`).toString()
  const redirectHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex">
    <meta http-equiv="refresh" content="0; url=${escapeHtml(target)}">
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
    <title>页面已移动</title>
    <script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
  </head>
  <body><p>页面已移动至 <a href="${escapeHtml(target)}">${escapeHtml(target)}</a>。</p></body>
</html>
`
  fs.mkdirSync(path.dirname(sourceFile), { recursive: true })
  fs.writeFileSync(sourceFile, redirectHtml, 'utf8')
}

console.log(`构建产物检查通过：${distDir}（${Object.keys(redirects).length} 条重定向）`)
