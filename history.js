import './nav.js';
import {getHistory,deleteReport} from './history-store.js';
const list=document.querySelector('#history-list');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
  const records=getHistory();
  list.innerHTML=records.length?records.map(item=>`<article class="history-card"><div><div class="eyebrow">${esc(item.category||'竞品分析')}</div><h2>${esc(item.productName)}</h2><p>${esc(new Date(item.createdAt).toLocaleString('zh-CN'))} · ${item.payload?.report?.modules?.length||0} 个模块 · ${item.payload?.report?.insights?.length||0} 条策略洞察</p></div><div class="history-actions"><a class="btn primary" href="/ai?history=${encodeURIComponent(item.id)}">打开报告</a><button class="btn outline" type="button" data-delete="${esc(item.id)}">删除</button></div></article>`).join(''):'<div class="history-empty"><h2>还没有分析记录</h2><p>完成第一次 AI 分析后，报告会出现在这里。</p><a class="btn primary" href="/ai">新建项目 →</a></div>';
}
list.addEventListener('click',e=>{const button=e.target.closest('[data-delete]');if(!button)return;if(confirm('确定删除这份本地报告？删除后无法恢复。')&&deleteReport(button.dataset.delete))render();});
render();
