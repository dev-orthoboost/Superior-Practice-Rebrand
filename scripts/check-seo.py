import re, sys, pathlib, json
root = pathlib.Path(__file__).resolve().parents[1]
BASE = 'https://jules-orthoboost.github.io/Superior-Practice-Rebrand/'
pages = [p for p in root.rglob('index.html') if not any(x in p.parts for x in ('.git','docs','node_modules'))]
titles, descs, errors = {}, {}, []
for p in pages:
    h = p.read_text(encoding='utf-8', errors='ignore'); rel = str(p.relative_to(root))
    t = re.search(r'<title>(.*?)</title>', h, re.S); d = re.search(r'name="description" content="([^"]+)"', h)
    if not t: errors.append(f'{rel}: no <title>')
    elif t.group(1).strip() in titles: errors.append(f'{rel}: duplicate title of {titles[t.group(1).strip()]}')
    else: titles[t.group(1).strip()] = rel
    if not d: errors.append(f'{rel}: no meta description')
    elif d.group(1) in descs: errors.append(f'{rel}: duplicate description of {descs[d.group(1)]}')
    else: descs[d.group(1)] = rel
    if 'rel="canonical"' not in h: errors.append(f'{rel}: no canonical')
    if 'property="og:title"' not in h: errors.append(f'{rel}: no og:title')
    for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try: json.loads(m)
        except Exception as e: errors.append(f'{rel}: invalid JSON-LD ({e})')
    for img in re.findall(r'<img(?![^>]*alt=)[^>]*>', h): errors.append(f'{rel}: img missing alt')
if not (root/'sitemap.xml').exists(): errors.append('missing sitemap.xml')
if not (root/'robots.txt').exists(): errors.append('missing robots.txt')
print('\n'.join(errors) or 'SEO GATES PASS'); sys.exit(1 if errors else 0)
