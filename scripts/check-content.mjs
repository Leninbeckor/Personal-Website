import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const docsDir = path.resolve('docs')
const ignoredDirectories = new Set(['.vuepress'])
const requiredFields = ['title', 'description', 'date']
const filenamePattern = /^(README|[a-z0-9]+(?:-[a-z0-9]+)*)\.md$/
const errors = []

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue

    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      walk(absolutePath)
      continue
    }

    if (!entry.name.endsWith('.md')) continue

    const relativePath = path.relative(process.cwd(), absolutePath).replaceAll('\\', '/')
    if (!filenamePattern.test(entry.name)) {
      errors.push(`${relativePath}: 文件名只能使用小写英文、数字和连字符，或使用 README.md`)
    }

    const { data } = matter(fs.readFileSync(absolutePath, 'utf8'))
    for (const field of requiredFields) {
      if (!data[field]) errors.push(`${relativePath}: 缺少 frontmatter 字段 ${field}`)
    }

    if (data.date) {
      const normalizedDate =
        data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
        errors.push(`${relativePath}: date 必须使用 YYYY-MM-DD 格式`)
      }
    }

    if (data.tags && !Array.isArray(data.tags)) {
      errors.push(`${relativePath}: tags 必须是数组`)
    }
  }
}

walk(docsDir)

if (errors.length > 0) {
  console.error(`内容检查失败（${errors.length} 项）：`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('内容检查通过。')
