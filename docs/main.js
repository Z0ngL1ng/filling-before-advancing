'use strict';

const base = 'https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/examples/dataset_samples/';
const samples = {
  rgb: { image: 'rgb.png', badge: 'RGB / Scenario-EG', source: 'stage3_harbor_reasoning/samples.json', task: ['PRESENCE VALIDATION', '存在性验证'], question: ['Is a water body visible in this image?', '这幅图像中是否能看到水体？'], answer: ['Yes.', '是。'] },
  sar: { image: 'sar.jpg', badge: 'SAR / Bridge-Conv', source: 'stage2_modality_adaptation/samples.json', task: ['SENSOR-AWARE UNCERTAINTY', '传感器感知边界与不确定性'], question: ['Can the exact operational status of a vessel-like return be confirmed from one SAR image?', '仅凭一幅 SAR 图像，能否确认类船舶回波的确切作业状态？'], answer: ['Cannot determine. A vessel-like return may be visible, but exact operational status is not established by a single SAR image.', '无法判断。可能存在类船舶回波，但单幅 SAR 图像无法确认其确切作业状态。'] },
  pan: { image: 'pan.png', badge: 'PAN / Bridge-Conv', source: 'stage2_modality_adaptation/samples.json', task: ['STRUCTURAL DESCRIPTION', '结构描述'], question: ['Describe the scene using grayscale tone, shape, texture, edges, and layout; do not infer natural color.', '依据灰度、形状、纹理、边缘与布局描述场景，不推断自然颜色。'], answer: ['A wide, smooth waterway stretches diagonally across the scene, separating two distinct land areas. On the right bank, a dense cluster of small, bright rectangular buildings forms a grid-like town adjacent to a linear road.', '宽阔而平滑的水道斜穿场景，将两片陆地区域分开。右岸密集的小型明亮矩形建筑构成网格状聚落，邻近一条线状道路。'], excerpt: true },
  nir: { image: 'nir.png', badge: 'NIR / Scenario-EG', source: 'stage3_harbor_reasoning/samples.json', task: ['GRID GROUNDING', '网格定位'], question: ['In a 3×3 grid, which cell contains the most visually clear water body?', '在 3×3 网格中，哪个网格包含视觉上最清晰的水体？'], answer: ['Top-left.', '左上。'] }
};
let language = 'en';
let activeSensor = 'rgb';
const languageButton = document.getElementById('language');
const tabs = Array.from(document.querySelectorAll('[data-sensor]'));

function renderSample() {
  const sample = samples[activeSensor];
  const index = language === 'en' ? 0 : 1;
  const image = document.getElementById('sensor-image');
  image.src = `assets/${sample.image}`;
  image.alt = language === 'en' ? `${activeSensor.toUpperCase()} image from the public training showcase` : `公开训练样张中的 ${activeSensor.toUpperCase()} 图像`;
  document.getElementById('sensor-badge').textContent = sample.badge;
  document.getElementById('sensor-task').textContent = sample.task[index] + (sample.excerpt ? (index === 0 ? ' / ANSWER EXCERPT' : ' / 回答节选') : '');
  document.getElementById('sensor-question').textContent = sample.question[index];
  document.getElementById('sensor-answer').textContent = sample.answer[index];
  document.getElementById('sensor-source').href = base + sample.source;
  document.getElementById('sensor-panel').setAttribute('aria-labelledby', `tab-${activeSensor}`);
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
  renderSample();
  try { localStorage.setItem('fba-language', language); } catch (_) { /* The page also works when storage is unavailable. */ }
}

languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => { activeSensor = tab.dataset.sensor; renderSample(); });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    activeSensor = tabs[next].dataset.sensor;
    renderSample();
    tabs[next].focus();
  });
});

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
