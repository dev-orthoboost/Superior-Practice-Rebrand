import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
errors = []
for page in root.rglob('index.html'):
    if any(p in page.parts for p in ('.git', 'docs', 'node_modules')): continue
    html = page.read_text(encoding='utf-8', errors='ignore')
    for attr, target in re.findall(r'(href|src)="([^"#]+)"', html):
        if target.startswith(('http', 'tel:', 'mailto:', 'data:', '//')): continue
        t = target.split('?')[0].split('#')[0]
        if not t: continue
        resolved = (page.parent / t).resolve()
        if resolved.is_dir(): resolved = resolved / 'index.html'
        if not resolved.exists():
            errors.append(f'{page.relative_to(root)}: {attr}="{target}"')
# forbidden strings gate (Global Constraints)
FORBIDDEN = ['555-0123', '555-0987', '5865550123', '2485550987',
             '1234 Gratiot', '9876 Telegraph', '$0 down', '$0 Down',
             'Invisalign', 'placehold.co', 'lh3.googleusercontent']
for page in root.rglob('*.html'):
    if any(p in page.parts for p in ('.git', 'docs', 'node_modules')): continue
    html = page.read_text(encoding='utf-8', errors='ignore')
    for f in FORBIDDEN:
        if f in html: errors.append(f'{page.relative_to(root)}: FORBIDDEN "{f}"')
print('\n'.join(errors) or 'ALL LINKS + CONTENT GATES PASS')
sys.exit(1 if errors else 0)
