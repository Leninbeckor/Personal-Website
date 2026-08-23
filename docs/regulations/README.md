---
title: 上市公司法规库
description: 整理上市公司相关法律法规、监管规章与交易所业务规则，并提供已核验的官方原文入口
date: 2026-08-23
tags:
  - 上市公司法规
  - 证券监管
  - 规则检索
sidebar: false
---

<RegulationsLibrary />

<style>
.regulations-page { margin: -1rem -1.5rem 0; }
.regulations-hero { display:flex; justify-content:space-between; gap:2rem; align-items:end; padding:2rem 1.5rem 1.4rem; border-bottom:1px solid var(--vp-c-divider); }
.regulations-eyebrow { margin:0; color:var(--vp-c-accent); font-size:.72rem; font-weight:700; letter-spacing:.15em; }
.regulations-hero h1 { margin:.45rem 0 .65rem; font-size:2.2rem; letter-spacing:-.035em; }
.regulations-lede { max-width:46rem; margin:0; color:var(--vp-c-text-mute); }
.regulations-source { min-width:13rem; color:var(--vp-c-text-mute); font-size:.75rem; text-align:right; }
.regulations-source span, .regulations-source small { display:block; }
.regulations-source strong { display:block; margin:.2rem 0; color:var(--vp-c-text); font-size:.88rem; }
.regulations-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:.75rem; padding:1.25rem 1.5rem; }
.regulation-stat { padding:1rem; border:1px solid var(--vp-c-border); border-radius:12px; background:var(--vp-c-bg-elv); }
.regulation-stat span, .regulation-stat small { display:block; color:var(--vp-c-text-mute); font-size:.75rem; }
.regulation-stat strong { display:block; margin:.15rem 0; font-size:1.45rem; }
.regulations-layout { display:grid; grid-template-columns:210px minmax(0,1fr); gap:1rem; padding:0 1.5rem 2rem; }
.regulations-filters { padding:1rem; border:1px solid var(--vp-c-border); border-radius:12px; background:var(--vp-c-bg-elv); }
.regulations-filters h2 { margin:0 0 1rem; font-size:1rem; }
.regulations-filters label { display:block; margin:0 0 .8rem; color:var(--vp-c-text-mute); font-size:.75rem; }
.regulations-filters input, .regulations-filters select, .regulations-results-head select { width:100%; margin-top:.35rem; padding:.5rem .55rem; border:1px solid var(--vp-c-border); border-radius:7px; color:var(--vp-c-text); background:var(--vp-c-bg); }
.regulations-reset { width:100%; padding:.5rem; border:1px solid color-mix(in srgb,var(--vp-c-accent) 45%,var(--vp-c-border)); border-radius:7px; color:var(--vp-c-accent); background:var(--vp-c-accent-soft); cursor:pointer; }
.regulations-filter-note { margin:1rem 0 0; padding-top:.8rem; border-top:1px solid var(--vp-c-divider); color:var(--vp-c-text-mute); font-size:.7rem; line-height:1.7; }
.regulations-results { min-width:0; }
.regulations-results-head { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin:0 0 .7rem; }
.regulations-results-head p { margin:0; color:var(--vp-c-text-mute); font-size:.85rem; }
.regulations-results-head strong { color:var(--vp-c-accent); }
.regulations-results-head select { width:auto; margin:0; }
.regulations-table-wrap { overflow-x:auto; border:1px solid var(--vp-c-border); border-radius:12px; background:var(--vp-c-bg-elv); }
.regulations-table { width:100%; min-width:700px; border-collapse:collapse; font-size:.84rem; }
.regulations-table th { padding:.75rem .8rem; color:var(--vp-c-text-mute); background:var(--vp-c-bg-alt); font-size:.72rem; font-weight:600; text-align:left; white-space:nowrap; }
.regulations-table td { padding:.8rem; border-top:1px solid var(--vp-c-divider); vertical-align:top; }
.regulations-table tr:hover td { background:color-mix(in srgb,var(--vp-c-accent-soft) 35%,transparent); }
.regulations-date, .regulations-authority, .regulations-number { color:var(--vp-c-text-mute); font-size:.76rem; white-space:nowrap; }
.regulations-number { max-width:10rem; white-space:normal; font-family:var(--vp-font-mono); }
.regulation-name-row { line-height:1.55; }
.regulation-name-row a, .regulation-name { color:var(--vp-c-accent); font-weight:600; text-decoration:none; }
.regulation-name-row a:hover, .regulation-details:hover { color:var(--butterfly-cyan); }
.regulation-name { padding:0; border:0; background:transparent; cursor:pointer; text-align:left; }
.regulation-name.pending { color:var(--vp-c-text); }
.regulation-category { display:inline-block; margin-top:.35rem; padding:.1rem .4rem; border-radius:4px; color:var(--vp-c-accent); background:var(--vp-c-accent-soft); font-size:.68rem; }
.regulation-details { padding:0; border:0; color:var(--vp-c-accent); background:transparent; cursor:pointer; white-space:nowrap; font-size:.76rem; }
.regulations-loading, .regulations-empty, .regulations-error { padding:2rem; border:1px dashed var(--vp-c-border); border-radius:12px; color:var(--vp-c-text-mute); text-align:center; }
.regulations-error { color:var(--vp-c-danger); }
.regulation-modal-backdrop { position:fixed; inset:0; z-index:20; display:grid; place-items:center; padding:1rem; background:rgb(20 35 46 / 42%); }
.regulation-modal { width:min(600px,100%); padding:1.4rem; border:1px solid var(--vp-c-border); border-radius:14px; background:var(--vp-c-bg-elv); box-shadow:0 20px 60px rgb(0 0 0 / 22%); }
.regulation-modal header { display:flex; align-items:start; justify-content:space-between; gap:1rem; }
.regulation-modal h2 { margin:0; font-size:1.2rem; line-height:1.5; }
.regulation-modal header button { border:0; color:var(--vp-c-text-mute); background:transparent; font-size:1.5rem; cursor:pointer; }
.regulation-modal dl { display:grid; grid-template-columns:5rem 1fr; gap:.65rem 1rem; margin:1.2rem 0; padding:1rem 0; border-top:1px solid var(--vp-c-divider); border-bottom:1px solid var(--vp-c-divider); font-size:.85rem; }
.regulation-modal dt { color:var(--vp-c-text-mute); }
.regulation-modal dd { margin:0; }
.regulation-modal dd button, .regulation-modal-actions button { margin-left:.5rem; padding:.2rem .45rem; border:1px solid var(--vp-c-border); border-radius:5px; color:var(--vp-c-accent); background:transparent; cursor:pointer; font-size:.72rem; }
.regulation-modal-actions { display:flex; align-items:center; flex-wrap:wrap; gap:.5rem; }
.regulation-official-link { padding:.55rem .75rem; border-radius:7px; color:#fff !important; background:var(--vp-c-accent); text-decoration:none !important; }
.regulation-pending-link { padding:.55rem .75rem; border-radius:7px; color:var(--vp-c-text-mute); background:var(--vp-c-bg-alt); font-size:.8rem; }
.regulation-modal-note { margin:1rem 0 0; color:var(--vp-c-text-mute); font-size:.75rem; line-height:1.7; }
@media (max-width:800px) { .regulations-hero { display:block; } .regulations-source { margin-top:1rem; text-align:left; } .regulations-stats { grid-template-columns:repeat(2,minmax(0,1fr)); } .regulations-layout { grid-template-columns:1fr; } }
@media (max-width:600px) { .regulations-page { margin-inline:-.75rem; } .regulations-hero, .regulations-stats, .regulations-layout { padding-inline:.75rem; } .regulations-hero h1 { font-size:1.8rem; } .regulations-stats { gap:.5rem; } .regulation-stat { padding:.75rem; } .regulation-stat strong { font-size:1.15rem; } }
</style>
