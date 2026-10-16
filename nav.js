const page=location.pathname==='/collector'?'collector':location.pathname==='/history'?'history':'ai';
const names={ai:'新建项目',collector:'本地数据采集',history:'历史记录'};
const items=[['ai','✦','/ai'],['collector','⌁','/collector'],['history','▤','/history']];
document.querySelector('#site-nav').innerHTML=`<a class="brand" href="/ai"><span class="brand-mark"><i></i><i></i><i></i><i></i></span><span><strong>InsightFlow</strong><small>AI 竞品拆解助手</small></span></a><div class="nav-label">工作台</div><nav aria-label="主导航">${items.map(([id,icon,url])=>`<a class="nav-item ${page===id?'active':''}" href="${url}" ${page===id?'aria-current="page"':''}><span aria-hidden="true">${icon}</span><span>${names[id]}</span></a>`).join('')}</nav><div class="side-bottom"><div class="side-bottom-line">✦　信息 → 分析 → 结论</div><small>让材料变成可用的判断</small></div>`;
document.querySelector('#site-topbar').innerHTML=`<button class="mobile-menu" type="button" aria-label="打开导航" aria-expanded="false">☰</button><div class="breadcrumbs"><a href="/ai">InsightFlow</a><span>›</span><b>${names[page]}</b></div><div class="top-actions"><span class="demo-pill ai-live-pill">● 真实 AI 分析</span><span class="avatar">IF</span></div>`;
const menu=document.querySelector('.mobile-menu');
menu.addEventListener('click',()=>{const open=document.querySelector('#site-nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
