---
title: 腾讯云上线操作手册
description: 将知识库从 GitHub 自动发布到腾讯云 COS 与 CDN 的完整清单
date: 2026-08-01
tags:
  - 腾讯云
  - COS
  - CDN
  - 部署
---

# 腾讯云上线操作手册

这份清单用于完成必须由网站所有者登录账号操作的部分。不要在 ICP 备案通过前开放中国大陆站点。

## 一、准备账号、域名和备案

1. 完成腾讯云个人实名认证。
2. 注册可备案的 `.com` 域名，确保域名持有人与备案主体一致。
3. 购买腾讯云 Serverless 备案资源包，并提交个人非经营性网站备案。当前官方标价为110元、有效期60个月、可用于2个网站备案，最终以下单页为准；它只作为备案凭证，不承载网站。
4. 备案通过前，仅使用本地预览或 GitHub 构建产物检查。
5. 备案通过后记录 ICP 备案号，稍后配置到 GitHub Variable。

按腾讯云初审1–2个工作日、管局审核最长20个工作日安排，整体为备案预留2–5周。个人网站名称应避免企业、经营、新闻等不符合个人备案性质的表述。

## 二、创建专用 COS Bucket

1. 在中国大陆地域创建标准存储 Bucket；建议选择距离主要访问者较近的地域。
2. Bucket 必须专门用于本网站，不能与备份、图床或其他项目混用。
3. 访问权限选择“私有读写”。
4. 开启静态网站，索引文档填写 `index.html`，错误文档填写 `404.html`。
5. 不要创建公有读对象，不要把 SecretId、SecretKey 放在 Bucket 或仓库中。

## 三、接入 CDN

1. 添加 `www.<你的域名>` 作为静态内容加速域名。
2. 源站类型选择 COS，选择专用 Bucket 的“静态网站”访问节点。
3. 授权 CDN 访问私有 Bucket，并开启私有存储桶回源。
4. 开启 HTTPS，上传或申请证书，并把 HTTP 重定向到 HTTPS。
5. 缓存建议：
   - `/assets/` 缓存一年；
   - `.html`、`sitemap.xml`、`robots.txt` 不缓存或设置短缓存；
   - 发布工作流会在成功上传后刷新站点根目录。
6. 设置每日 CDN 流量1GB告警、2GB关闭加速；确认短信、微信和邮件通知均可送达。
7. 在 DNSPod 将 `www` 的 CNAME 指向 CDN 提供的 CNAME；根域名配置301跳转至 `www`。

## 四、费用与盗刷防护

1. 首月设置10元预算告警，并同时开启 COS 盗刷风险检测、用量告警和短信/微信/邮件通知。
2. CDN 每日流量达到1GB告警、2GB自动下线加速域名；先用小阈值演练一次消息和封顶动作。
3. 用量封顶可能有约10分钟延迟，不能把它视为绝对零超支保证。
4. 新用户50GB/6个月权益主要覆盖标准存储；公网或 CDN 流量仍要以账单为准。
5. 域名注册/续费、COS 请求与回源流量、CDN 流量另行计费；运行30天后再按实际访问量判断是否购买流量包。

官方参考：[备案资源要求](https://cloud.tencent.com/document/product/243/18908)、[Serverless 资源包价格](https://cloud.tencent.com/document/product/583/61679)、[备案流程](https://cloud.tencent.com/document/product/243/39038)、[CDN 用量封顶](https://cloud.tencent.com/document/product/228/41733)、[COS 产品权益](https://intl.cloud.tencent.com/zh/products/cos)、[CDN 私有回源](https://cloud.tencent.com/document/practice/228/38087)。

## 五、创建最小权限 CAM 子用户

创建只供 GitHub Actions 使用的子用户，不授予控制台登录权限。下面策略中的地域、主账号 UIN、APPID、Bucket 和域名都必须替换为实际值，并在保存前通过腾讯云策略校验器检查。

COS 对象权限应只覆盖专用 Bucket：

```json
{
  "version": "2.0",
  "statement": [
    {
      "effect": "allow",
      "action": [
        "cos:HeadBucket",
        "cos:GetBucket",
        "cos:HeadObject",
        "cos:PutObject",
        "cos:DeleteObject",
        "cos:InitiateMultipartUpload",
        "cos:ListMultipartUploads",
        "cos:ListParts",
        "cos:UploadPart",
        "cos:CompleteMultipartUpload"
      ],
      "resource": [
        "qcs::cos:<地域>:uid/<主账号UIN>:<Bucket名称-APPID>/*",
        "qcs::cos:<地域>:uid/<主账号UIN>:<Bucket名称-APPID>/"
      ]
    }
  ]
}
```

另授予指定 CDN 域名的缓存刷新权限。腾讯云策略资源格式可能随控制台版本调整，以策略生成器显示结果为准；不要直接授予 `QcloudCDNFullAccess`。

## 六、配置 GitHub

在仓库的 **Settings → Secrets and variables → Actions** 中填写。

Repository Variables：

| 名称 | 示例 | 作用 |
| --- | --- | --- |
| `SITE_HOST` | `https://www.example.com` | Sitemap、canonical 与 robots.txt |
| `SITE_TITLE` | `我的知识库` | 站点标题 |
| `SITE_DESCRIPTION` | `持续整理的个人知识体系` | SEO 描述 |
| `SITE_AUTHOR` | `你的名字` | 页面作者 |
| `CDN_DOMAIN` | `www.example.com` | CDN 刷新目标，不含协议 |
| `COS_BUCKET` | `knowledge-base-1250000000` | 完整 Bucket 名称 |
| `COS_REGION` | `ap-guangzhou` | Bucket 地域 |
| `ICP_NUMBER` | `粤ICP备XXXXXXXX号` | ICP 页脚；通过后再填 |
| `PUBLIC_SECURITY_NUMBER` | `粤公网安备XXXXXXXX号` | 公安备案页脚；通过后再填 |
| `PUBLIC_SECURITY_URL` | 公安备案查询链接 | 公安备案跳转地址 |

Repository Secrets：

| 名称 | 作用 |
| --- | --- |
| `TENCENT_CLOUD_SECRET_ID` | CAM 子用户 SecretId |
| `TENCENT_CLOUD_SECRET_KEY` | CAM 子用户 SecretKey |

工作流只在 `main` 分支推送或手动触发时发布；Pull Request 只构建和检查。正式部署时如果 `SITE_HOST` 仍为示例域名，工作流会主动停止。

文章地址固定为 `/分类/文章名/`。重命名已发布文档时，在仓库根目录的 `redirects.json` 添加旧地址和新地址；构建会校验新地址并生成旧地址重定向页。

## 七、首次上线验收

1. 在 GitHub Actions 中手动运行 `Build and deploy knowledge base`。
2. 确认构建、上传和 CDN 刷新全部成功。
3. 用无痕窗口验证首页、深层文章、搜索、404、HTTPS 和移动端导航。
4. 直接访问 COS 默认域名应无法匿名读取对象。
5. 检查 `https://www.<域名>/sitemap.xml` 和 `/robots.txt`。
6. 检查页脚 ICP 备案号及跳转链接。
7. 用较小阈值临时测试 CDN 告警，确认收到消息后恢复正式阈值。

## 八、公安联网备案与维护

1. 网站正式开通后30日内提交公安联网备案。
2. 通过后填写 `PUBLIC_SECURITY_NUMBER` 和 `PUBLIC_SECURITY_URL`，重新发布网站。
3. 向百度、必应等站长平台提交 Sitemap；首版不接入评论、登录、广告或用户追踪。
4. 每月检查费用、流量、死链、证书有效期和构建通知。
5. 回滚时撤销问题 Git 提交，再重新运行部署；不要直接在 COS 控制台手改线上文件。

公安备案要求见[腾讯云公安联网备案说明](https://cloud.tencent.com/document/api/243/19142)。

::: warning 删除范围
发布工作流会使用同步删除功能，让 COS 与构建目录保持一致。因此 Bucket 必须专用于这个网站，否则其他文件会被删除。
:::
