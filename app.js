import { cases, byId } from './data.js';

const icons = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', file:'<path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14 3v6h5M8 13h8M8 17h8"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>', back:'<path d="m15 18-6-6 6-6"/>', download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m2 9v-2a6 6 0 0 0-3-5"/>',
  cart:'<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.5 12h12l2-9H5"/>',
  shield:'<path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/>',
  chat:'<path d="M20 16a3 3 0 0 1-3 3H8l-4 3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z"/><path d="M8 10h8M8 14h5"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  spark:'<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zM19 18l.6 1.4L21 20l-1.4.6L19 22l-.6-1.4L17 20l1.4-.6z"/>',
  tag:'<path d="M3 4h9l9 9-8 8-10-10z"/><circle cx="8" cy="8" r="1"/>',
  store:'<path d="M3 10h18l-2-6H5zM5 10v11h14V10M9 21v-7h6v7"/>',
  repeat:'<path d="M20 7V4h-3M4 17v3h3M20 4a8 8 0 0 0-14 3M4 20a8 8 0 0 0 14-3"/>',
  coffee:'<path d="M4 7h13v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 9h2a2 2 0 0 1 0 4h-2M2 21h17"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>', check:'<path d="m4 12 5 5L20 6"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  close:'<path d="M5 5l14 14M19 5 5 19"/>', layers:'<path d="m12 2 9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/>',
  filter:'<path d="M3 5h18M6 12h12M9 19h6"/>', copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  printer:'<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 15h12v7H6z"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'
};
const icon = (name,size=19) => `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.grid}</svg>`;
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const route = () => {
  const bits = (location.hash.replace(/^#\/?/,'') || 'projects').split('/').filter(Boolean);
  return {page:bits[0], caseId:bits[1], detail:bits[2]};
};
const go = path => { location.hash = `#/${path}`; };
const state = { lang:'全部', sentiment:'全部', query:'', theme:'全部', selected:'xiaohongshu', drawer:null, toast:'', menu:false, bookmarks:loadBookmarks() };
function loadBookmarks(){ try { return JSON.parse(localStorage.getItem('insightflow-bookmarks')||'[]'); } catch { return []; } }
function saveBookmarks(){ try { localStorage.setItem('insightflow-bookmarks',JSON.stringify(state.bookmarks)); } catch {} }
const activeCase = () => byId(route().caseId || state.selected);
const link = (path,label,cls='') => `<a class="${cls}" href="#/${path}">${label}</a>`;
const demoNotice = `<span class="demo-pill">${icon('info',14)} 预置演示数据 · 非真实用户调研</span>`;

function sidebar(r){
  const c=activeCase();
  return `<aside class="sidebar ${state.menu?'open':''}">
    <div class="brand" role="button" tabindex="0" data-go="projects"><span class="brand-mark"><i></i><i></i><i></i><i></i></span><span><strong>InsightFlow</strong><small>AI 竞品拆解助手</small></span></div>
    <a class="new-side" href="/ai">${icon('spark',18)} 真实 AI 拆解 <span>↗</span></a>
    <div class="nav-label">工作台</div>
    ${[['projects','项目中心','grid'],['new','新建分析','plus'],['templates','分析模板','layers'],['sources','资料说明','file']].map(([id,name,glyph])=>link(id,`${icon(glyph)}<span>${name}</span>`,`nav-item ${r.page===id?'active':''}`)).join('')}
    <div class="side-divider"></div><div class="nav-label">最近项目</div>
    ${cases.map(item=>link(`case/${item.id}/overview`, `<span class="case-mini ${item.tone}">${esc(item.initials)}</span><span class="recent-text"><b>${esc(item.name)}</b><small>${esc(item.kind)}</small></span>`,`recent-item ${r.caseId===item.id?'active':''}`)).join('')}
    <div class="side-bottom"><div class="side-bottom-line">${icon('spark',16)} 思路从信息走向结论</div><small>演示版 V1 · 无需登录与 API</small></div>
  </aside>`;
}
function topbar(r){
  const c=activeCase();
  const names={projects:'项目中心',new:'新建分析',templates:'分析模板',sources:'资料说明',overview:'分析总览',module:'模块拆解',reviews:'评论洞察',insights:'策略洞察',report:'分析报告'};
  return `<header class="topbar"><button class="mobile-menu" aria-label="打开菜单" data-action="menu">${icon('menu')}</button><div class="breadcrumbs">${link('projects','项目中心')}${r.caseId?`<span>›</span>${link(`case/${c.id}/overview`,esc(c.name))}<span>›</span><b>${names[r.detail]||'分析总览'}</b>`:`<span>›</span><b>${names[r.page]||'首页'}</b>`}</div><div class="top-actions">${demoNotice}<span class="avatar" title="本地演示版">IF</span></div></header>`;
}
function shell(body,r){ document.getElementById('app').innerHTML=`<div class="app-shell">${sidebar(r)}<div class="main-shell">${topbar(r)}<main class="content">${body}</main></div>${state.drawer?drawer(state.drawer):''}${state.toast?`<div class="toast" role="status">${icon('check',17)} ${esc(state.toast)}</div>`:''}</div>`; }
const caseIcon = c => `<span class="case-logo ${c.tone}">${esc(c.initials)}</span>`;
const pageHead = (eyebrow,title,desc,extra='')=>`<div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div>${extra}</div>`;

function projects(){
  return `${pageHead('PROJECT SPACE','把竞品信息，变成可用判断。','从三个预置案例出发，体验一键拆解、双语评论聚类和结论报告。',`<button class="btn primary" data-go="new">${icon('plus',17)} 新建分析</button>`)}
  <div class="hero-strip"><div><span class="hero-kicker">INSIGHTFLOW / LIVE AI</span><h2>不止看到“做了什么”<br>更要读懂“为什么有效”。</h2><p>上传你的材料，真正调用模型生成证据驱动的拆解；下方三个案例保留为可点的演示样本。</p><a class="btn light" href="/ai">上传材料，开始真实分析 ${icon('arrow',17)}</a></div><div class="hero-graphic" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="hero-core">IF</div><span class="orb o1">事实</span><span class="orb o2">洞察</span><span class="orb o3">行动</span></div></div>
  <div class="section-heading"><div><h2>案例项目 <span class="count">03</span></h2><p>选择一个案例进入完整分析工作台</p></div><span class="subtle">三种产品形态 · 同一条分析主线</span></div>
  <div class="project-grid">${cases.map((c,i)=>`<article class="project-card"><div class="project-card-top">${caseIcon(c)}<span class="chip">${esc(c.kind)}</span></div><h3>${esc(c.name)}</h3><p>${esc(c.subtitle)}</p><div class="project-tags">${c.tags.slice(0,3).map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="project-footer"><span>${icon('file',15)} ${c.modules.length} 个模块 · ${c.reviews.length} 条合成评论</span>${link(`case/${c.id}/overview`,`${icon('arrow',18)}`,'round-link')}</div></article>`).join('')}</div>
  <div class="principle-row"><div>${icon('target',20)}<b>问题不是必填项</b><span>V1 先给出标准拆解；自定义问题留待下一阶段。</span></div><div>${icon('shield',20)}<b>证据与推断分开</b><span>演示卡片、合成评论和待验证内容都明确标注。</span></div><div>${icon('download',20)}<b>结果可带走</b><span>浏览、复制与导出 Markdown 报告。</span></div></div>`;
}

function newAnalysis(){
  return `${pageHead('NEW ANALYSIS','选择一个产品，开始拆解','这里保留三个预置案例的演示流程。若要分析你自己的资料，请进入真实 AI 拆解。',`<a class="btn primary" href="/ai">${icon('spark',17)} 上传材料分析</a>`)}
  <div class="stepper"><span class="step active"><i>1</i> 选择产品</span><span class="step-line"></span><span class="step"><i>2</i> 查看拆解</span><span class="step-line"></span><span class="step"><i>3</i> 导出报告</span></div>
  <div class="new-layout"><section class="panel"><div class="panel-title"><h2>选择预置案例</h2><span class="chip blue">V1 DEMO</span></div><p class="panel-intro">三类案例对应不同模板。优衣库按“服饰零售品牌”适配品牌模板，不归类为快消品。</p><div class="select-list">${cases.map(c=>`<button class="select-case ${state.selected===c.id?'chosen':''}" data-select="${c.id}">${caseIcon(c)}<span><b>${esc(c.name)}</b><small>${esc(c.template)} · ${esc(c.subtitle)}</small></span><i class="radio"></i></button>`).join('')}</div><div class="new-divider"></div><div class="demo-input"><label>产品名称</label><input value="${esc(byId(state.selected).name)}" readonly aria-label="预置案例名称" /><span>演示版仅提供三个预置项目。自由输入和在线采集将在后续版本开放。</span></div><button class="btn primary wide" data-action="start">一键生成拆解 ${icon('arrow',18)}</button></section>
  <aside class="new-aside"><div class="aside-glow">${icon('spark',28)}</div><div class="eyebrow">WHAT YOU WILL GET</div><h2>从观察到行动的一份完整答案</h2><p>不是把资料堆成报告，而是用一致的逻辑拆开产品价值。</p><div class="result-list"><div><span>01</span> 定位与场景</div><div><span>02</span> 六个关键模块</div><div><span>03</span> 中英文评论洞察</div><div><span>04</span> 可迁移的策略卡片</div><div><span>05</span> 可导出的分析报告</div></div><div class="new-note">${icon('info',18)} 本版数据由我们编写，用于验证产品体验，不可当作真实市场结论。</div></aside></div>`;
}

function caseTabs(c,where){return `<nav class="case-tabs" aria-label="案例页面">${[['overview','分析总览'],['module','模块拆解'],['reviews','评论洞察'],['insights','策略洞察'],['report','分析报告']].map(([id,label])=>link(`case/${c.id}/${id}${id==='module'?'/'+c.modules[0].id:''}`,esc(label),where===id?'active':'')).join('')}</nav>`;}
function caseHeading(c,r){return `<div class="case-heading"><div class="case-heading-main">${caseIcon(c)}<div><div class="eyebrow">CASE STUDY / ${esc(c.template)}</div><h1>${esc(c.name)} <span class="heading-chip">${esc(c.kind)}</span></h1><p>${esc(c.subtitle)}</p></div></div><button class="btn outline" data-go="case/${c.id}/report">${icon('download',16)} 导出报告</button></div>${caseTabs(c,r.detail)}`;}
function overview(c,r){
  return `${caseHeading(c,r)}<div class="notice">${icon('info',18)} 这是基于预置素材编写的演示分析。所有评论为合成样本；推断与待验证项不代表品牌实际经营结果。</div>
  <section class="verdict"><div><div class="section-kicker">${icon('spark',19)} 一句话判断</div><h2>${esc(c.summary)}</h2><div class="tag-row">${c.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div><div class="verdict-stats"><div><b>${c.modules.length}</b><small>分析模块</small></div><div><b>${c.reviews.length}</b><small>合成评论</small></div><div><b>${c.insights.length}</b><small>策略结论</small></div></div></section>
  <div class="section-heading"><div><h2>核心洞察</h2><p>沿“事实 → 动因 → 可执行启发”阅读每条结论</p></div>${link(`case/${c.id}/insights`,`查看全部 ${icon('arrow',16)}`,'text-link')}</div>
  <div class="insight-grid">${c.insights.map((ins,i)=>`<article class="insight-teaser"><span class="teaser-icon t${i}">${icon(['spark','users','target'][i],22)}</span><span class="level ${ins.confidence==='低'?'muted':''}">${esc(ins.level)}</span><h3>${esc(ins.title)}</h3><p>${esc(ins.logic)}</p><div class="teaser-foot"><span>${icon('file',15)} ${ins.refs.length} 个素材关联</span>${link(`case/${c.id}/insights`,`${icon('arrow',17)}`,'tiny-arrow')}</div></article>`).join('')}</div>
  <div class="section-heading"><div><h2>关键模块概览</h2><p>点击任一模块，查看事实、推理与可迁移启发</p></div></div><div class="module-grid">${c.modules.map((m,i)=>link(`case/${c.id}/module/${m.id}`,`<span class="module-icon m${i%6}">${icon(m.icon,23)}</span><div><h3>${esc(m.title)}</h3><p>${esc(m.angle)}</p><small>${esc(m.status)} · ${esc(m.evidence)}</small></div>${icon('arrow',17)}`,'module-tile')).join('')}</div>`;
}

function modulePage(c,r){
  const m=c.modules.find(x=>x.id===r.detail2)||c.modules.find(x=>x.id===r.moduleId)||c.modules[0];
  const evidence=c.evidence.find(x=>x.id===m.evidence);
  return `${caseHeading(c,{detail:'module'})}<div class="workspace-layout"><div><div class="section-heading first"><div><h2>模块拆解 <span class="count">${c.modules.length.toString().padStart(2,'0')}</span></h2><p>选择左侧模块，沿事实、动因、启发逐层阅读</p></div></div><div class="module-work"><div class="module-list">${c.modules.map((it,i)=>`<button data-go="case/${c.id}/module/${it.id}" class="${it.id===m.id?'active':''}"><span class="module-icon m${i%6}">${icon(it.icon,19)}</span><span>${esc(it.title)}<small>${esc(it.angle)}</small></span>${icon('arrow',15)}</button>`).join('')}</div><article class="module-detail"><div class="detail-top"><span class="module-icon m${c.modules.indexOf(m)%6}">${icon(m.icon,23)}</span><span class="status ${m.status==='待验证'?'warn':''}">${esc(m.status)}</span></div><div class="eyebrow">ANALYSIS MODULE ${String(c.modules.indexOf(m)+1).padStart(2,'0')}</div><h2>${esc(m.title)}</h2><p class="lead">${esc(m.angle)}</p><div class="reason-block"><span>01 · 事实 / 观察</span><p>${esc(m.fact)}</p></div><div class="reason-block"><span>02 · 动因 / 为什么</span><p>${esc(m.why)}</p></div><div class="reason-block highlight"><span>03 · 可用启发 / 怎么做</span><p>${esc(m.implication)}</p></div><div class="detail-evidence"><div><small>关联素材 ${esc(m.evidence)}</small><b>${esc(evidence?.title||'演示素材')}</b><p>${esc(evidence?.note||'')}</p></div><button class="btn small outline" data-evidence="${c.id}:${m.evidence}">查看说明 ${icon('arrow',15)}</button></div></article></div></div><aside class="right-rail"><h3>分析不是资料堆砌</h3><p>每个模块回答三个问题：看到什么、为什么会这样、我们可以怎么用。</p><div class="rail-step"><i>1</i><span>信息要扣题</span></div><div class="rail-step"><i>2</i><span>分析要追问动因</span></div><div class="rail-step"><i>3</i><span>结论要能落地</span></div><div class="rail-divider"></div><h4>下一步</h4><p>阅读双语评论样本，看看用户语言如何转化为洞察。</p>${link(`case/${c.id}/reviews`,`进入评论洞察 ${icon('arrow',16)}`,'btn primary wide')}</aside></div>`;
}

function reviewsPage(c){
  const all=c.reviews;
  const themes=['全部',...new Set(all.map(x=>x.theme))];
  const filtered=all.filter(x=>(state.lang==='全部'||x.lang===state.lang)&&(state.sentiment==='全部'||x.sentiment===state.sentiment)&&(state.theme==='全部'||x.theme===state.theme)&&(`${x.text} ${x.translation} ${x.theme}`.toLowerCase().includes(state.query.toLowerCase())));
  const distribution=['正向','中性','负向'].map(s=>({name:s,n:all.filter(x=>x.sentiment===s).length}));
  return `${caseHeading(c,{detail:'reviews'})}<div class="notice">${icon('info',18)} 以下 ${all.length} 条中英文评论均为人工编写的合成样本。情绪标签和主题聚类只演示交互，不是对真实用户口碑的测量。</div>
  <div class="review-header"><div><div class="eyebrow">VOICE OF CUSTOMER / DEMO</div><h2>评论洞察</h2><p>保留原文、提供对照翻译，按情绪、语言与主题定位用户任务。</p></div><div class="review-counter"><b>${all.length}</b><span>条合成样本<br>中文 + English</span></div></div>
  <div class="review-layout"><section><div class="filter-panel"><div class="search-box">${icon('search',18)}<input id="review-search" placeholder="搜索评论、译文或主题" value="${esc(state.query)}" aria-label="搜索评论" /></div><div class="filter-row"><div class="filter-group">语言 ${['全部','中文','英文'].map(x=>`<button data-filter-lang="${x}" class="${state.lang===x?'selected':''}">${x}</button>`).join('')}</div><div class="filter-group">情绪 ${['全部','正向','中性','负向'].map(x=>`<button data-filter-sentiment="${x}" class="${state.sentiment===x?'selected':''}">${x}</button>`).join('')}</div></div><div class="theme-row"><span>${icon('filter',16)} 主题</span>${themes.map(x=>`<button class="theme-chip ${state.theme===x?'selected':''}" data-filter-theme="${esc(x)}">${esc(x)}</button>`).join('')}</div></div><div class="review-count">显示 ${filtered.length} / ${all.length} 条评论</div><div class="review-list">${filtered.length?filtered.map(x=>`<article class="review-card"><div class="review-meta"><span class="review-id">${x.id}</span><span class="sentiment ${x.sentiment==='正向'?'positive':x.sentiment==='负向'?'negative':'neutral'}">${x.sentiment}</span><span class="lang">${x.lang}</span><span class="topic">${esc(x.theme)}</span></div><blockquote>${esc(x.text)}</blockquote><div class="translation"><span>${x.lang==='英文'?'中文译文':'English translation'}</span><p>${esc(x.translation)}</p></div></article>`).join(''):`<div class="empty">没有符合条件的样本。试试清除筛选。<button class="text-button" data-action="reset-filters">清除筛选</button></div>`}</div></section>
  <aside class="review-side"><div class="rail-card"><h3>情绪分布 <small>仅当前案例样本</small></h3>${distribution.map(x=>`<div class="bar-label"><span>${x.name}</span><b>${x.n} 条</b></div><div class="bar-track"><i class="${x.name==='正向'?'bar-positive':x.name==='负向'?'bar-negative':'bar-neutral'}" style="width:${x.n/all.length*100}%"></i></div>`).join('')}<p class="footnote">样本量很小，不能推算真实品牌情绪比例。</p></div><div class="rail-card"><h3>高频讨论主题</h3>${themes.slice(1).map(t=>`<button class="topic-line" data-filter-theme="${esc(t)}"><span>${esc(t)}</span><b>${all.filter(x=>x.theme===t).length}</b></button>`).join('')}</div><div class="rail-card blue-card"><h3>${icon('spark',18)} 从评论到洞察</h3><p>不把一句反馈直接当成结论。先看用户在什么情境下表达，再区分共性、例外与需要验证的假设。</p>${link(`case/${c.id}/insights`,`查看策略洞察 ${icon('arrow',16)}`,'text-link')}</div></aside></div>`;
}

function insightsPage(c){
  return `${caseHeading(c,{detail:'insights'})}<div class="section-heading first"><div><div class="eyebrow">FROM ANALYSIS TO ACTION</div><h2>可用结论，而非表面总结</h2><p>每张卡片同时回答：借鉴什么、适用条件是什么、下一步如何验证。</p></div></div><div class="insights-layout"><div class="strategy-list">${c.insights.map((ins,i)=>`<article class="strategy-card"><div class="strategy-top"><div><span class="serial">0${i+1} / STRATEGY INSIGHT</span><span class="level ${ins.confidence==='低'?'muted':''}">${esc(ins.level)}</span><h2>${esc(ins.title)}</h2></div><button class="bookmark ${state.bookmarks.includes(ins.id)?'saved':''}" data-bookmark="${ins.id}" aria-label="${state.bookmarks.includes(ins.id)?'取消收藏':'收藏'}">${icon('bookmark',19)}</button></div><div class="strategy-columns"><div><small>信息 · 观察事实</small><p>${esc(ins.fact)}</p></div><div><small>分析 · 关键动因</small><p>${esc(ins.logic)}</p></div></div><div class="action-box"><span>${icon('target',17)} 结论 · 下一步可以做什么</span><p>${esc(ins.action)}</p></div><div class="strategy-bottom"><div><b>适用条件</b><span>${esc(ins.condition)}</span></div><div><b>风险与边界</b><span>${esc(ins.risk)}</span></div></div><div class="strategy-foot"><span>关联素材：${ins.refs.map(ref=>`<button data-evidence="${c.id}:${ref}">${esc(ref)}</button>`).join('')}</span><span>推断把握度：${esc(ins.confidence)}</span></div></article>`).join('')}</div><aside class="right-rail"><h3>这份分析怎么用？</h3><p>先选与你当前场景相关的结论，再核对条件与风险。演示版不会自动替你做商业决策。</p><div class="rail-divider"></div><div class="saved-count">${icon('bookmark',19)} 已收藏 <b>${c.insights.filter(x=>state.bookmarks.includes(x.id)).length}</b> 张</div><p>收藏仅保存在这个浏览器中。</p>${link(`case/${c.id}/report`,`查看完整报告 ${icon('arrow',16)}`,'btn primary wide')}</aside></div>`;
}

function reportText(c){
  return `# ${c.name} · 竞品拆解演示报告\n\n> InsightFlow V1 演示报告。本报告由预置素材与人工编写的合成评论构成，不代表真实市场研究或品牌经营结论。\n\n## 一句话判断\n${c.summary}\n\n## 产品定位\n${c.positioning}\n\n目标用户（演示画像）：${c.audience}\n\n值得进一步验证的机会：${c.opportunity}\n\n## 模块拆解\n${c.modules.map((m,i)=>`### ${i+1}. ${m.title}\n- 事实／观察：${m.fact}\n- 动因／解释：${m.why}\n- 可用启发：${m.implication}\n- 证据状态：${m.status}（${m.evidence}）`).join('\n\n')}\n\n## 评论洞察（合成样本）\n共 ${c.reviews.length} 条中英文合成评论。${[...new Set(c.reviews.map(x=>x.theme))].join('、')}等主题仅用于演示聚类。\n\n${c.reviews.map(x=>`- [${x.id} · ${x.lang} · ${x.sentiment} · ${x.theme}] ${x.text}\n  译文：${x.translation}`).join('\n')}\n\n## 策略洞察\n${c.insights.map((x,i)=>`### ${i+1}. ${x.title}\n- 事实：${x.fact}\n- 逻辑：${x.logic}\n- 建议行动：${x.action}\n- 适用条件：${x.condition}\n- 风险：${x.risk}\n- 关联素材：${x.refs.join('、')}；推断把握度：${x.confidence}`).join('\n\n')}\n\n## 证据与边界\n${c.evidence.map(x=>`- ${x.id}｜${x.type}｜${x.title}：${x.note}`).join('\n')}\n\n真实研究下一步：采集授权资料、确认时间与来源，核实用户评价和业务指标，再更新判断。\n`;
}
function reportPage(c){
  return `${caseHeading(c,{detail:'report'})}<div class="report-actions"><div><div class="eyebrow">EXPORT READY / DEMO</div><h2>把洞察带出工作台</h2><p>报告包含定位、六个模块、双语评论样本、策略卡及证据边界。</p></div><div class="button-row"><button class="btn outline" data-action="copy-report">${icon('copy',17)} 复制文本</button><button class="btn outline" data-action="print">${icon('printer',17)} 打印 / 存 PDF</button><button class="btn primary" data-action="download">${icon('download',17)} 下载 Markdown</button></div></div>
  <div class="report-page"><div class="report-cover"><span>INSIGHTFLOW · COMPETITOR DECONSTRUCTION</span><h1>${esc(c.name)}<br>竞品拆解报告</h1><p>${esc(c.subtitle)}</p><div class="cover-rule"></div><small>V1 演示版 / 预置案例 / 合成评论 · 不可作为真实市场结论引用</small></div><div class="report-body"><div class="report-section"><span class="report-num">01 / EXECUTIVE SUMMARY</span><h2>一句话判断</h2><p class="report-quote">${esc(c.summary)}</p><div class="report-facts"><div><b>定位</b><p>${esc(c.positioning)}</p></div><div><b>机会</b><p>${esc(c.opportunity)}</p></div></div></div><div class="report-section"><span class="report-num">02 / DECONSTRUCTION</span><h2>关键模块拆解</h2><div class="report-modules">${c.modules.map(m=>`<div><b>${esc(m.title)}</b><p>${esc(m.why)}</p><small>启发：${esc(m.implication)}</small></div>`).join('')}</div></div><div class="report-section"><span class="report-num">03 / CUSTOMER VOICE</span><h2>评论洞察</h2><p>共 ${c.reviews.length} 条人工编写的中英文合成样本，用于演示筛选、翻译与主题聚类。请勿用于真实情绪或声量判断。</p><div class="sample-quote">“${esc(c.reviews[0].text)}”<small>— ${c.reviews[0].id} · ${c.reviews[0].lang} · 合成评论</small></div></div><div class="report-section"><span class="report-num">04 / STRATEGY</span><h2>可用结论</h2>${c.insights.map((x,i)=>`<div class="report-insight"><b>${String(i+1).padStart(2,'0')}　${esc(x.title)}</b><p>${esc(x.action)}</p><small>前提：${esc(x.condition)}　·　把握度 ${esc(x.confidence)}</small></div>`).join('')}</div><div class="report-disclaimer">素材与评论全部为演示用途。真实项目需要补充可追溯资料、用户研究与运营数据，并重新验证结论。</div></div></div>`;
}

function templates(){return `${pageHead('FRAMEWORKS','三条路径，一套分析原则','模板不是填空题：从事实出发，追问动因，最后给出可执行、可验证的结论。')}<div class="template-principle"><span>信息要扣题</span>${icon('arrow',20)}<span>分析要本质</span>${icon('arrow',20)}<span>结论要落地</span></div><div class="template-grid">${cases.map(c=>`<article class="template-card">${caseIcon(c)}<span class="chip">${esc(c.template)}</span><h2>${esc(c.kind)}</h2><p>${esc(c.subtitle)}</p><div>${c.modules.map(m=>`<span>${esc(m.title)}</span>`).join('')}</div>${link(`case/${c.id}/overview`,`查看 ${esc(c.name)} 示例 ${icon('arrow',16)}`,'text-link')}</article>`).join('')}</div><div class="notice spacious">${icon('info',18)} 优衣库属于服饰零售，不是快消品。演示版利用品牌分析骨架对服饰零售做适配；未来可扩展独立零售模板。</div>`;}
function sources(){return `${pageHead('DATA & TRANSPARENCY','关于这些演示资料','看清哪些是素材、哪些是推断、哪些必须等真实数据验证。')}<div class="source-explain"><div><span class="source-badge">演示观察卡</span><h3>结构化示例素材</h3><p>为了展示拆解方法而编写的情境卡。不是官网截图、第三方研究或真实调研记录。</p></div><div><span class="source-badge purple">合成评论</span><h3>人工写的中英反馈</h3><p>所有评论都是虚构例句。可用于体验翻译、筛选与聚类，不可用于评估真实用户情绪。</p></div><div><span class="source-badge amber">待验证</span><h3>尚无证据的判断</h3><p>涉及转化率、流失、客流、门店运营等问题，需在真实项目中补充有来源的数据。</p></div></div><div class="section-heading"><div><h2>案例素材台账</h2><p>点击素材，查看每条演示资料的使用边界</p></div></div><div class="source-columns">${cases.map(c=>`<div class="source-column"><div class="source-column-head">${caseIcon(c)}<div><b>${esc(c.name)}</b><small>${c.evidence.length} 条素材说明</small></div></div>${c.evidence.map(e=>`<button data-evidence="${c.id}:${e.id}"><span>${esc(e.id)} · ${esc(e.type)}</span><b>${esc(e.title)}</b>${icon('arrow',15)}</button>`).join('')}</div>`).join('')}</div>`;}
function drawer(key){
  const [caseId,eid]=key.split(':'); const c=byId(caseId); const e=c.evidence.find(x=>x.id===eid); const rev=c.reviews.find(x=>x.id===eid);
  const title=e?.title||`合成评论 ${eid}`; const text=e?.note||rev?.text||'';
  return `<div class="drawer-overlay" data-action="close-drawer"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="素材说明"><div class="drawer-head"><span>素材说明 / ${esc(eid)}</span><button data-action="close-drawer" aria-label="关闭">${icon('close',20)}</button></div><div class="drawer-content"><span class="source-badge ${e?.type==='待验证'?'amber':''}">${esc(e?.type||'合成评论')}</span><h2>${esc(title)}</h2><p>${esc(text)}</p>${rev?`<div class="drawer-translation"><b>${rev.lang==='中文'?'English translation':'中文译文'}</b><p>${esc(rev.translation)}</p></div>`:''}<div class="drawer-warning">${icon('info',18)} 此条内容仅用于演示产品流程，并非经过采集、授权或核验的外部证据。</div><button class="btn primary wide" data-action="close-drawer">我知道了</button></div></aside>`;
}
function render(){
  const r=route(); const c=activeCase();
  let body;
  if(r.page==='projects')body=projects();
  else if(r.page==='new')body=newAnalysis();
  else if(r.page==='templates')body=templates();
  else if(r.page==='sources')body=sources();
  else if(r.page==='case'){
    const detail=r.detail||'overview';
    const full={...r,moduleId:(location.hash.split('/')[4]||'')};
    body=detail==='module'?modulePage(c,full):detail==='reviews'?reviewsPage(c):detail==='insights'?insightsPage(c):detail==='report'?reportPage(c):overview(c,full);
  } else body=projects();
  shell(body,r);
  document.title=`${r.page==='case'?c.name+' · ':''}InsightFlow 竞品拆解助手`;
}
function toast(message){state.toast=message;render();setTimeout(()=>{state.toast='';document.querySelector('.toast')?.remove();},2800);}
function download(c){const blob=new Blob([reportText(c)],{type:'text/markdown;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`InsightFlow_${c.english}_演示报告.md`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Markdown 报告已开始下载');}
document.addEventListener('click',async event=>{
  const node=event.target.closest('[data-go],[data-select],[data-filter-lang],[data-filter-sentiment],[data-filter-theme],[data-evidence],[data-bookmark],[data-action]');
  if(!node)return;
  if(node.dataset.go){state.menu=false;go(node.dataset.go);return;}
  if(node.dataset.select){state.selected=node.dataset.select;render();return;}
  if(node.dataset.filterLang){state.lang=node.dataset.filterLang;render();return;}
  if(node.dataset.filterSentiment){state.sentiment=node.dataset.filterSentiment;render();return;}
  if(node.dataset.filterTheme){state.theme=node.dataset.filterTheme;render();return;}
  if(node.dataset.evidence){state.drawer=node.dataset.evidence;render();return;}
  if(node.dataset.bookmark){const id=node.dataset.bookmark;state.bookmarks=state.bookmarks.includes(id)?state.bookmarks.filter(x=>x!==id):[...state.bookmarks,id];saveBookmarks();render();return;}
  const action=node.dataset.action;
  if(action==='start'){const c=byId(state.selected);go(`case/${c.id}/overview`);toast(`已载入 ${c.name} 预置分析`);}
  if(action==='menu'){state.menu=!state.menu;render();}
  if(action==='close-drawer'){state.drawer=null;render();}
  if(action==='reset-filters'){state.lang='全部';state.sentiment='全部';state.theme='全部';state.query='';render();}
  if(action==='download')download(activeCase());
  if(action==='print')window.print();
  if(action==='copy-report'){try{await navigator.clipboard.writeText(reportText(activeCase()));toast('报告文本已复制');}catch{toast('复制未获浏览器授权，请下载 Markdown');}}
});
document.addEventListener('input',event=>{if(event.target.id==='review-search'){const pos=event.target.selectionStart;state.query=event.target.value;render();const input=document.getElementById('review-search');input?.focus();input?.setSelectionRange(pos,pos);}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&state.drawer){state.drawer=null;render();}if((event.key==='Enter'||event.key===' ')&&event.target.classList.contains('brand')){go('projects');}});
window.addEventListener('hashchange',()=>{state.drawer=null;state.menu=false;render();window.scrollTo(0,0);});
render();
