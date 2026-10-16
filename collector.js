import './nav.js';
const $=selector=>document.querySelector(selector);
const form=$('#collector-form'),queryLabel=$('#query-label'),commandSection=$('#command-section'),commandOutput=$('#command-output'),message=$('#collector-message');
const platformLabels={xhs:'小红书',dy:'抖音',bili:'B 站',wb:'微博',zhihu:'知乎',tieba:'百度贴吧'};
const quotePowerShell=value=>'"'+String(value).replace(/\`/g,'\`\`').replace(/"/g,'\`"')+'"';
function notice(text,ok=false){message.textContent=text;message.className='collector-message'+(ok?' ok':'');setTimeout(()=>message.classList.add('collector-hidden'),6500);}
function modeChanged(){const detail=form.elements.mode.value==='detail';queryLabel.textContent=detail?'帖子链接 / ID':'关键词';form.elements.query.placeholder=detail?'粘贴一个公开帖子链接或 ID':'例如：Manner Coffee 体验 / 优衣库质量 / 小红书 搜索';}
form.elements.mode.addEventListener('change',modeChanged);
form.addEventListener('submit',event=>{
  event.preventDefault();
  const value=String(form.elements.query.value||'').trim();
  if(!value)return notice('请先填写关键词或帖子链接。');
  const platform=form.elements.platform.value,mode=form.elements.mode.value;
  const posts=Math.max(1,Math.min(20,Number(form.elements.posts.value)||8));
  const comments=Math.max(1,Math.min(30,Number(form.elements.comments.value)||15));
  const parts=['uv run main.py','--platform '+platform,'--lt qrcode','--type '+mode];
  parts.push(mode==='detail'?'--specified_id '+quotePowerShell(value):'--keywords '+quotePowerShell(value));
  parts.push('--get_comment true','--get_sub_comment '+(form.elements.subcomments.checked?'true':'false'),'--get_media false','--crawler_max_notes_count '+posts,'--max_comments_count_singlenotes '+comments,'--max_concurrency_num 1','--save_data_option csv');
  commandOutput.textContent=parts.join(' ');
  commandSection.classList.remove('collector-hidden');commandSection.scrollIntoView({behavior:'smooth',block:'start'});
});
$('#copy-command').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(commandOutput.textContent);notice('命令已复制。请在 MediaCrawler 文件夹中粘贴并运行。',true);}catch{notice('浏览器不允许复制，请手动选择命令复制。');}});
$('#collector-file').addEventListener('change',async event=>{
  const file=event.target.files?.[0];if(!file)return;
  if(file.size>4*1024*1024)return notice('导出文件超过 4 MB，请先缩小样本或拆分文件。');
  try{
    const raw=await file.text();
    if(raw.trim().length<80)return notice('文件内容太少，至少导入 80 个字符的评论或资料。');
    const normalized=raw.length>15000?raw.slice(0,15000)+'\n\n【InsightFlow 提示：原始导出超过 15,000 字符，已按顺序截取前段；请缩小样本或拆分文件后再次分析。】':raw;
    const platform=platformLabels[form.elements.platform.value]||'本地社媒';
    const header='【本地社媒采集导入】\n采集工具：MediaCrawler（用户本机运行）\n平台：'+platform+'\n文件：'+file.name+'\n分析边界：仅代表导出样本，不代表平台整体口碑；请以原帖语境核验。\n\n';
    sessionStorage.setItem('insightflow.collector.import',JSON.stringify({platformLabel:platform,fileName:file.name,text:header+normalized}));
    location.href='/ai';
  }catch{notice('读取文件失败，请确认它是 UTF-8 编码的 CSV、JSON、JSONL、TXT 或 Markdown。');}
});
modeChanged();
