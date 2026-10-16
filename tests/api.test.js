import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const template=await readFile(new URL('../worker/index.js',import.meta.url),'utf8');
const source=template.replace('__INSIGHTFLOW_ASSETS__',JSON.stringify({'/ai.html':'<h1>Upload</h1>','/collector.html':'<h1>Collector</h1>','/history.html':'<h1>History</h1>'}));
const worker=(await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)).default;
function request({name='测试品牌',notes='这是一段用户提供的产品与评论材料。'.repeat(8),files=[],consent='yes'}={}){
  const form=new FormData();form.set('name',name);form.set('category','brand');form.set('notes',notes);form.set('consent',consent);
  for(const f of files)form.append('files',f);
  return new Request('https://site.test/api/analyze',{method:'POST',headers:{'oai-authenticated-user-id':'owner'},body:form});
}
const sample={productName:'测试品牌',category:'品牌',positioning:'定位',oneLine:'核心判断',decisiveVariable:'关键变量',causalChain:'机制',competingExplanation:'替代解释',evidence:[{id:'E1',sourceId:'S1',quote:'原文',locator:'段落 1',finding:'观察',nature:'事实'},{id:'E2',sourceId:'S99',quote:'无效',locator:'x',finding:'无效',nature:'事实'}],modules:[{title:'定位',fact:'事实',motive:'动机',effect:'未知',mechanism:'机制',alternative:'其它',implication:'行动',status:'待验证',evidenceIds:['E1','E2']}],reviews:[],insights:[{title:'策略',observation:'观察',rootCause:'原因',transfer:'迁移',action:'行动',condition:'条件',risk:'风险',validation:'实验',evidenceIds:['E1','E2'],confidence:'中'}],gaps:[{unknown:'未知',impact:'影响',verification:'补证'}],limitations:['样本有限']};

test('serves UI but blocks unauthenticated API requests',async()=>{
  const page=await worker.fetch(new Request('https://site.test/ai'),{});
  assert.match(await page.text(),/Upload/);
  const denied=await worker.fetch(new Request('https://site.test/api/analyze',{method:'POST'}),{GEMINI_API_KEY:'test'});
  assert.equal(denied.status,401);
  const collector=await worker.fetch(new Request('https://site.test/collector'),{});
  assert.match(await collector.text(),/Collector/);
  const home=await worker.fetch(new Request('https://site.test/'),{});
  assert.match(await home.text(),/Upload/);
  const history=await worker.fetch(new Request('https://site.test/history'),{});
  assert.match(await history.text(),/History/);
  assert.equal((await worker.fetch(new Request('https://site.test/data.js'),{})).status,404);
});

test('rejects missing key, missing consent, unsupported files and weak input',async()=>{
  assert.equal((await worker.fetch(request(),{})).status,503);
  assert.equal((await worker.fetch(request({consent:'no'}),{GEMINI_API_KEY:'test'})).status,400);
  assert.equal((await worker.fetch(request({notes:'tiny'}),{GEMINI_API_KEY:'test'})).status,400);
  const bad=new File(['abc'],'unsafe.exe',{type:'application/octet-stream'});
  assert.equal((await worker.fetch(request({files:[bad]}),{GEMINI_API_KEY:'test'})).status,400);
});

test('calls Gemini server side and strips invented source references',async()=>{
  const original=globalThis.fetch;let sent;
  globalThis.fetch=async(url,init)=>{sent={url,headers:init.headers,body:JSON.parse(init.body)};return new Response(JSON.stringify({steps:[{type:'model_output',content:[{type:'text',text:JSON.stringify(sample)}]}],usage:{total_tokens:100}}),{status:200});};
  try{
    const response=await worker.fetch(request(),{GEMINI_API_KEY:'server-secret',GEMINI_MODEL:'gemini-3.8-flash'});
    assert.equal(response.status,200);
    const body=await response.json();
    assert.equal(body.report.evidence.length,1);
    assert.deepEqual(body.report.insights[0].evidenceIds,['E1']);
    assert.equal(body.sources[0].name,'粘贴的资料');
    assert.equal(sent.headers['x-goog-api-key'],'server-secret');
    assert.equal(sent.body.response_format.mime_type,'application/json');
    assert.equal(sent.body.input[0].type,'text');
    assert.doesNotMatch(JSON.stringify(body),/server-secret/);
  }finally{globalThis.fetch=original;}
});

test('returns actionable error when the key is rejected',async()=>{
  const original=globalThis.fetch;
  globalThis.fetch=async()=>new Response(JSON.stringify({error:{message:'invalid'}}),{status:401});
  try{
    const response=await worker.fetch(request(),{GEMINI_API_KEY:'test'});
    assert.equal(response.status,502);
    assert.equal((await response.json()).code,'key_rejected');
  }finally{globalThis.fetch=original;}
});
