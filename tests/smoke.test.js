import test from 'node:test';
import assert from 'node:assert/strict';
import { cases } from '../data.js';

const listeners = {};
const app = { innerHTML: '' };
globalThis.localStorage = { getItem: () => null, setItem: () => {} };
globalThis.location = { hash: '#/projects' };
globalThis.window = { scrollTo: () => {}, addEventListener: (name, handler) => { listeners[`window:${name}`] = handler; }, print: () => {} };
globalThis.document = {
  title: '',
  getElementById: id => id === 'app' ? app : null,
  addEventListener: (name, handler) => { listeners[`document:${name}`] = handler; }
};
await import('../app.js');
function visit(path) { location.hash = `#/${path}`; listeners['window:hashchange'](); return app.innerHTML; }

test('three authored cases retain consistent evidence and review references', () => {
  assert.equal(cases.length, 3);
  for (const c of cases) {
    assert.equal(c.modules.length, 6);
    assert.equal(c.reviews.length, 8);
    assert.ok(c.insights.length >= 3);
    for (const module of c.modules) assert.ok(c.evidence.some(x => x.id === module.evidence));
    for (const insight of c.insights) {
      for (const ref of insight.refs) assert.ok([...c.evidence, ...c.reviews].some(x => x.id === ref), `${c.name}: missing ${ref}`);
    }
    assert.ok(c.reviews.some(x => x.lang === '中文'));
    assert.ok(c.reviews.some(x => x.lang === '英文'));
  }
});

test('project library, case selection and all case pages render', () => {
  const library = visit('projects');
  for (const c of cases) assert.match(library, new RegExp(c.name));
  assert.match(visit('new'), /一键生成拆解/);
  for (const c of cases) {
    for (const page of ['overview','module','reviews','insights','report']) {
      const html = visit(`case/${c.id}/${page}`);
      assert.match(html, new RegExp(c.name));
      assert.match(html, /预置演示数据/);
      assert.ok(html.length > 3000);
    }
  }
});

test('all case source ledgers and template explanations render', () => {
  assert.match(visit('sources'), /素材台账/);
  assert.match(visit('templates'), /服饰零售/);
  assert.match(visit('case/manner/module/service'), /高峰时段的排队/);
});

test('review filter and evidence drawer are interactive', async () => {
  visit('case/uniqlo/reviews');
  await listeners['document:click']({ target: { closest: () => ({ dataset: { filterLang: '英文' } }) } });
  assert.match(app.innerHTML, /显示 3 \/ 8 条评论/);
  await listeners['document:click']({ target: { closest: () => ({ dataset: { evidence: 'uniqlo:E-04' } }) } });
  assert.match(app.innerHTML, /线上线下购物路径假设/);
  assert.match(app.innerHTML, /role="dialog"/);
});
