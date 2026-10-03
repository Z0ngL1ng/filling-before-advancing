'use strict';

const base = 'https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/examples/dataset_samples/';
let samples = [];
let language = 'en';
let activeSensor = 'rgb';
let activeCase = 0;
let showcaseUnavailable = false;
const languageButton = document.getElementById('language');
const tabs = Array.from(document.querySelectorAll('[data-sensor]'));
const caseSelect = document.getElementById('sample-select');
const gridToggle = document.getElementById('show-grid');
const gridCells = ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'];
const gridLabelsZh = ['左上', '上中', '右上', '左中', '中央', '右中', '左下', '下中', '右下'];

function drawGrid(sample) {
  const svg = document.getElementById('grid-overlay');
  svg.replaceChildren();
  svg.toggleAttribute('hidden', !gridToggle.checked);
  const answerCells = new Set(sample.grid_grounding[0].cells);
  const step = 512 / 3;
  const imageWidth = document.getElementById('sensor-image').getBoundingClientRect().width || 512;
  const fontSize = Math.max(13, 11 * 512 / imageWidth);
  gridCells.forEach((cell, index) => {
    const x = (index % 3) * step;
    const y = Math.floor(index / 3) * step;
    const selected = answerCells.has(cell);
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    Object.entries({x, y, width: step, height: step, fill: selected ? '#edaa86' : 'none', 'fill-opacity': 0.16, stroke: '#eceee5', 'stroke-opacity': 0.7, 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', 'data-cell': cell, 'data-answer': String(selected)}).forEach(([key, value]) => rect.setAttribute(key, value));
    svg.append(rect);
    const text = language === 'en' ? cell : gridLabelsZh[index];
    const labelWidth = Math.min(step - 8, text.length * fontSize * (language === 'en' ? 0.62 : 1) + 10);
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    Object.entries({x: x + 4, y: y + 4, width: labelWidth, height: fontSize + 8, fill: '#202b2c', 'fill-opacity': 0.85}).forEach(([key, value]) => background.setAttribute(key, value));
    svg.append(background);
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x + 9);
    label.setAttribute('y', y + fontSize + 5);
    label.setAttribute('fill', selected ? '#f4c4a3' : '#ecf1ec');
    label.setAttribute('font-size', fontSize);
    label.setAttribute('font-family', 'sans-serif');
    label.textContent = text;
    svg.append(label);
  });
}

function renderSample() {
  const cases = samples.filter(sample => sample.modality === activeSensor);
  if (!cases.length) return;
  const sample = cases[activeCase] || cases[0];
  const index = language === 'en' ? 0 : 1;
  const firstTurn = sample.turns[0];
  caseSelect.replaceChildren();
  cases.forEach((item, optionIndex) => {
    const option = document.createElement('option');
    option.value = optionIndex;
    option.textContent = `${optionIndex + 1}. ${item.title[index]}`;
    option.selected = optionIndex === activeCase;
    caseSelect.append(option);
  });
  const image = document.getElementById('sensor-image');
  image.src = `assets/${sample.image}`;
  image.alt = `${activeSensor.toUpperCase()} · ${sample.title[index]}`;
  document.getElementById('full-image').href = image.src;
  document.getElementById('sensor-badge').textContent = `${activeSensor.toUpperCase()} / CPRS · ${sample.id.split('_')[1]}`;
  document.getElementById('sensor-task').textContent = language === 'en' ? 'GRID GROUNDING / ILLUSTRATIVE DIALOGUE' : '网格定位 / 展示问答';
  document.getElementById('sensor-question').textContent = firstTurn.question[index];
  document.getElementById('sensor-answer').textContent = firstTurn.answer[index];
  document.getElementById('sample-why').textContent = sample.why[index];
  document.getElementById('sensor-source').href = base + sample.source;
  document.getElementById('sensor-panel').setAttribute('aria-labelledby', `tab-${activeSensor}`);
  const relations = document.getElementById('sample-relations');
  relations.replaceChildren();
  sample.relations.forEach(relation => {
    const item = document.createElement('span');
    item.textContent = `${relation.subject} → ${relation.predicate} → ${relation.object}`;
    relations.append(item);
  });
  document.getElementById('dialogue-summary').textContent = language === 'en' ? `View selected dialogue (${sample.turns.length} turns)` : `查看精选对话（${sample.turns.length} 轮）`;
  const dialogue = document.getElementById('dialogue-turns');
  dialogue.replaceChildren();
  sample.turns.forEach((turn, turnIndex) => {
    const article = document.createElement('article');
    const label = document.createElement('span');
    label.className = 'tiny';
    label.textContent = language === 'en' ? `TURN ${turnIndex + 1}` : `第 ${turnIndex + 1} 轮`;
    const question = document.createElement('p');
    question.className = 'dialogue-question';
    question.textContent = turn.question[index];
    const answer = document.createElement('p');
    answer.textContent = turn.answer[index];
    article.append(label, question, answer);
    dialogue.append(article);
  });
  drawGrid(sample);
  tabs.forEach(tab => {
    const selected = tab.dataset.sensor === activeSensor;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  document.querySelectorAll('[data-en][data-zh]').forEach(element => { element.textContent = language === 'en' ? element.dataset.en : element.dataset.zh; });
  document.querySelectorAll('[data-label-en]').forEach(element => { element.setAttribute('aria-label', language === 'en' ? element.dataset.labelEn : element.dataset.labelZh); });
  languageButton.textContent = language === 'en' ? '中文' : 'EN';
  languageButton.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
  document.getElementById('copy-status').textContent = '';
  document.getElementById('gallery-status').textContent = showcaseUnavailable ? (language === 'en' ? 'More cases could not load. The first example and source link remain available.' : '其他案例暂未加载，可先查看首个样例与源记录链接。') : '';
  renderSample();
  try { localStorage.setItem('fba-language', language); } catch (_) { /* The page also works when storage is unavailable. */ }
}

languageButton.addEventListener('click', () => {
  setLanguage(language === 'en' ? 'zh' : 'en');
  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  window.history.replaceState(null, '', url);
});
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => { activeSensor = tab.dataset.sensor; activeCase = 0; renderSample(); });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    activeSensor = tabs[next].dataset.sensor;
    activeCase = 0;
    renderSample();
    tabs[next].focus();
  });
});

caseSelect.addEventListener('change', () => {
  activeCase = Number(caseSelect.value);
  renderSample();
});
gridToggle.addEventListener('change', () => {
  document.getElementById('grid-overlay').toggleAttribute('hidden', !gridToggle.checked);
});

new ResizeObserver(() => {
  const cases = samples.filter(sample => sample.modality === activeSensor);
  const sample = cases[activeCase] || cases[0];
  if (sample) drawGrid(sample);
}).observe(document.getElementById('sensor-image'));

document.getElementById('copy-citation').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(document.getElementById('bibtex').textContent);
    status.textContent = language === 'en' ? 'BibTeX copied.' : '已复制 BibTeX。';
  } catch (_) {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('bibtex'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = language === 'en' ? 'Citation selected. Press Ctrl+C or ⌘C to copy.' : '已选中引用内容，请按 Ctrl+C 或 ⌘C 复制。';
  }
});

let initial = new URLSearchParams(window.location.search).get('lang');
if (initial !== 'en' && initial !== 'zh') {
  try { initial = localStorage.getItem('fba-language'); } catch (_) { initial = 'en'; }
}
setLanguage(initial === 'zh' ? 'zh' : 'en');

async function loadShowcase() {
  try {
    const response = await fetch('data/cprs-showcase.json');
    if (!response.ok) throw new Error('Showcase unavailable');
    samples = (await response.json()).samples;
    renderSample();
    caseSelect.disabled = false;
    gridToggle.disabled = false;
  } catch (_) {
    showcaseUnavailable = true;
    tabs.filter(tab => tab.dataset.sensor !== 'rgb').forEach(tab => { tab.disabled = true; });
    document.getElementById('gallery-status').textContent = language === 'en' ? 'More cases could not load. The first example and source link remain available.' : '其他案例暂未加载，可先查看首个样例与源记录链接。';
  }
}
loadShowcase();
