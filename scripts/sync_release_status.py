"""Render the shared release checklist into public docs and HF card sources.

Edit docs/data/release-status.json, then run python scripts/sync_release_status.py.
This updates local content only; GitHub and HF publication are separate steps.
"""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'docs/data/release-status.json').read_text(encoding='utf-8'))
START = '<!-- release-status:start -->'
END = '<!-- release-status:end -->'
STATUS_URL = 'https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/RELEASE_STATUS.md'
LICENSE_URL = 'https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/LICENSE_SCOPE.md'


def table(lang):
    header = '| Artifact | File availability | Public version |' if lang == 'en' else '| 资源 | 文件发布状态 | 公开版本 |'
    lines = [header, '| --- | --- | --- |']
    lines += [f"| {row['name'][lang]} | {row['status'][lang]} | {row['public_version'] or '—'} |" for row in DATA['items']]
    return '\n'.join(lines)


def markdown(lang):
    if lang == 'en':
        lead = f"**Updated {DATA['updated']}.** {DATA['page_note']['en']}"
        tail = f"**— means no public resource version yet.** Base-model names are not FBA release versions. Releases are planned progressively after paper acceptance. Public examples remain illustrative; HarborEval reference answers and scoring notes are currently private.\n\n[Shared checklist]({STATUS_URL}) · [License scope]({LICENSE_URL})"
    else:
        lead = f"**更新于 {DATA['updated']}。** {DATA['page_note']['zh']}"
        tail = f"**— 表示尚无公开资源版本。** 基座型号不等于 FBA 发布版本。资源计划在论文录用后陆续发布。已公开样例仅用于展示，HarborEval 参考答案与评分说明目前保持私有。\n\n[统一状态清单]({STATUS_URL}) · [许可适用范围]({LICENSE_URL})"
    return lead + '\n\n' + table(lang) + '\n\n' + tail


def update(path, content):
    text = path.read_text(encoding='utf-8')
    text, count = re.subn(re.escape(START) + r'.*?' + re.escape(END), lambda _: START + '\n' + content + '\n' + END, text, flags=re.S)
    if count != 1:
        raise ValueError(f'Expected one release-status block in {path}')
    path.write_text(text, encoding='utf-8')


def main():
    canonical = '# Release status / 发布状态\n\n'
    canonical += 'This checklist describes actual downloadable research artifacts, separately from online project pages and sample showcases.\n\n'
    canonical += '这份清单记录研究资源文件的实际公开状态，区别于项目介绍页上线及样例展示。\n\n'
    canonical += '## English\n\n' + markdown('en') + '\n\n## 简体中文\n\n' + markdown('zh')
    canonical += '\n\n## Availability wording / 可用性表述\n\n' + DATA['availability']['en'].format(updated=DATA['updated']) + '\n\n' + DATA['availability']['zh'].format(updated=DATA['updated'])
    canonical += '\n\nUpdate `docs/data/release-status.json` and run `python scripts/sync_release_status.py` to refresh this file, both READMEs, and the HF card sources. Publish the updated card sources as the corresponding HF `README.md` files.\n'
    (ROOT / 'RELEASE_STATUS.md').write_text(canonical, encoding='utf-8')
    update(ROOT / 'README.md', markdown('en'))
    update(ROOT / 'README_zh-CN.md', markdown('zh'))
    for name in ['FBA.md', 'CPRS.md']:
        update(ROOT / 'docs/huggingface' / name, markdown('en'))
    print('Updated shared status: checklist, EN/ZH READMEs, and both HF card sources.')


if __name__ == '__main__':
    main()
