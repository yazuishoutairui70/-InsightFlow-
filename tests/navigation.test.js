import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const read=name=>readFile(new URL(name,root),'utf8');
test('all three views use the same shared navigation and omit demos',async()=>{
  for(const name of ['ai.html','collector.html','history.html']){
    const page=await read(name);
    assert.match(page,/id="site-nav"/);
    assert.match(page,/id="site-topbar"/);
    assert.doesNotMatch(page,/预置案例演示|#\/projects/);
  }
  const nav=await read('nav.js');
  for(const label of ['新建项目','本地数据采集','历史记录'])assert.match(nav,new RegExp(label));
  const build=await read('scripts/build.mjs');
  assert.doesNotMatch(build,/data\.js|app\.js|index\.html/);
});

test('completed reports are saved locally and can be removed',async()=>{
  const data=new Map();
  globalThis.localStorage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value)};
  const {saveReport,getReport,deleteReport,getHistory}=await import('../history-store.js');
  const payload={meta:{generatedAt:'2026-10-16T00:00:00Z'},report:{productName:'测试项目',category:'线下',modules:[],insights:[]}};
  assert.equal(saveReport(payload),true);
  const id=getHistory()[0].id;
  assert.equal(getReport(id).productName,'测试项目');
  assert.equal(deleteReport(id),true);
  assert.equal(getReport(id),null);
});
